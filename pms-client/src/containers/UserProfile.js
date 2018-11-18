import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, Form, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./OneProject.css";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            isDeleting: null,
            user: {},
            UserId: null,
            UserName: "",
            Email: "",
            Role: "Developer"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const user = await this.getUser();
            //console.log(user)
            const {  UserId, UserName, Email, Role } = user;

            this.setState({
                user,
                UserId,
                UserName,
                Email,
                Role
            });
        } catch (e) {
            alert(e);
        }
    }

    //连接API，获得当前用户信息
    getUser() {
        return API.get("projects", `/users/${this.props.match.params.id}`);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //保存用户信息修改
    saveUserProfile(role) {
        return API.put("projects", `/users/${this.props.match.params.id}`, {
            body: role
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            await this.saveUserProfile({Role: this.state.Role || this.state.user.Role});
            this.props.history.push("/users/all");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }


    //渲染页面
    render() {
        return (
            <div className="UserProfile">
                {this.state.user &&
                <form onSubmit={this.handleSubmit}>
                    <Form horizontal>
                        <FormGroup controlId="Username">
                            <Col componentClass={ControlLabel} sm={2}>
                                UserName
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static>
                                    <span>{this.state.UserName}</span>
                                </FormControl.Static>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="Email" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl.Static>
                                    <span>{this.state.Email}</span>
                                </FormControl.Static>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="Role" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Role
                            </Col>
                            <Col sm={10}>
                                <FormControl selected={false} defaultValue={this.state.Role} componentClass="select"  placeholder="edit user role" onChange={this.handleChange}>
                                    <option value="Manager">Manager</option>
                                    <option value="Developer">Developer</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Form>

                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Save"
                        loadingText="Saving…"
                    />
                </form>}
            </div>
        );
    }
}