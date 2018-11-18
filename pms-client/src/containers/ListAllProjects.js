import React, {Component, Fragment } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { API } from "aws-amplify";
import ProjectList from "./ProjectList";


export default class ListAllProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            projects: [],
            initialProjects: []
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount() {
        try {
            const projects = await this.projects();
            //console.log(projects);
            this.setState({
                projects: projects,
                initialProjects: projects
            });
        } catch (e) {
            alert(e);
        }
        this.setState({ isLoading: false });
    }

    projects() {
        return API.get("projects", "/projects/all");
    }

    //按状态过滤项目
    handleSelect(event) {
            this.setState({
                projects: [].concat(this.state.initialProjects.filter(p => p.ProjectStatus === event))
            })
    }


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

                {this.state.projects.length > 0
                        ?
                        <div className="projects">
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
            <div className="ListAllProjects">
                {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
            </div>
        );
    }
}