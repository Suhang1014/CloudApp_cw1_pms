import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./OneProject.css";

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            isDeleting: null,
            project: {},
            ProjectStatus: "Pending",
            Content: "",
            AttachmentURL: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            let AttachmentURL;
            const project = await this.getProject();
            console.log(project);
            const {  Content,  Attachment, ProjectStatus } = project;

            if (Attachment) {
                AttachmentURL = await Storage.vault.get(Attachment);
            }

            this.setState({
                project,
                Content,
                ProjectStatus,
                AttachmentURL
            });
        } catch (e) {
            alert(e);
        }
    }

    //连接API，获得项目数据
    getProject() {
        return API.get("projects", `/projects/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.Content.length > 0 &&
                this.state.ProjectStatus.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    //？？？？？
    handleChange = event => {
        this.setState({
                [event.target.id]: event.target.value
        });
    }


    //修改文件
    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    //保存项目内容修改
    saveProject(project) {
        return API.put("projects", `/projects/${this.props.match.params.id}`, {
            body: project
        });
    }

    handleSubmit = async event => {
        let Attachment;

        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });

        try {
            if (this.file) {
                Attachment = await s3Upload(this.file);
            }

            await this.saveProject({
                Content: this.state.Content,
                ProjectStatus: this.state.ProjectStatus || this.state.project.ProjectStatus,
                Attachment: Attachment || this.state.project.Attachment
            });
            this.props.history.push("/projects/home");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    //删除项目功能
    deleteProject() {
        return API.del("projects", `/projects/${this.props.match.params.id}`);
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteProject();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    //渲染页面
    render() {
        return (
            <div className="Projects">
                {this.state.project &&
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

                    {this.state.project.Attachment &&
                    <FormGroup>
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl.Static>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.state.AttachmentURL}
                            >
                                {this.formatFilename(this.state.project.Attachment)}
                            </a>
                        </FormControl.Static>
                    </FormGroup>}

                    <FormGroup controlId="file">
                        {!this.state.project.Attachment &&
                        <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={this.handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Save"
                        loadingText="Saving…"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDeleting}
                        onClick={this.handleDelete}
                        text="Delete"
                        loadingText="Deleting…"
                    />
                </form>}
            </div>
        );
    }
}