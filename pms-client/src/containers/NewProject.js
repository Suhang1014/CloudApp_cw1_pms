import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewProject.css";
import { s3Upload } from "../libs/awsLib";

export default class NewNote extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            project: {},
            Content: "",
            ProjectStatus: "Pending"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validateForm() {
        return this.state.Content.length > 0;
    }

    handleChange = event => {
        this.setState({
                [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });

        try {
            const Attachment = this.file
                ? await s3Upload(this.file)
                : null;

            await this.createProject({
                Attachment,
                Content: this.state.Content,
                ProjectStatus: this.state.ProjectStatus
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    createProject(project) {
        return API.post("projects", "/projects", {
            body: project
        });
    }

    render() {
        return (
            <div className="NewProject">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="Content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.Content}
                            componentClass="textarea"
                        />
                    </FormGroup>

                    <FormGroup controlId={"ProjectStatus"}>
                        <ControlLabel>Status</ControlLabel>
                        <FormControl selected={false} defaultValue={this.state.project.ProjectStatus} componentClass="select" placeholder="choose project status" onChange={this.handleChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="file">
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl onChange={this.handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}