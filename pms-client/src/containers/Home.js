import React, {Component, Fragment} from "react";
import {PageHeader, DropdownButton, MenuItem } from "react-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";
import ProjectList from "./ProjectList";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            projects: [],
            initialProjects: [],
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const projects = await this.projects();
            this.setState({
                projects: projects,
                initialProjects: projects,
            });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    //获得该用户创建的项目
    projects() {
        return API.get("projects", "/projects");
    }

    //按状态过滤项目
    handleSelect(event) {
        this.setState({
            projects: [].concat(this.state.initialProjects.filter(p => p.ProjectStatus === event))
        })
    }

    // 未登录时
    renderLander() {
        return (
            <div className="lander">
                <h1>Welcome!</h1>
                <p>A simple Project Management System</p>
            </div>
        );
    }

    renderProjects() {
        return (
            <Fragment>
                <Fragment>
                    <div style={{ marginBottom: "5%" }}>
                        <label htmlFor="projectsFilter">Filter Projects by Status</label>
                        <div className="project-search-wrapper">
                            <DropdownButton bsStyle="success" id="statusdropdown" title="Status" onSelect={this.handleSelect} >
                                <MenuItem eventKey="Active" key="1">Active</MenuItem>
                                <MenuItem eventKey="Pending" key="2">Pending</MenuItem>
                                <MenuItem eventKey="Completed" key="3">Completed</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </Fragment>
                <hr/>

                {this.state.projects.length > 0
                        ?
                        <div className="projects">
                            <PageHeader>My Projects</PageHeader>
                                <ProjectList projects={this.state.projects}></ProjectList>
                        </div>
                        :
                        <h3>No Project Found</h3>
                }
            </Fragment>

        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
            </div>
        );
    }
}