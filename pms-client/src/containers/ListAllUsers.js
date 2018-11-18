import React, { Component, Fragment } from "react";
import { ListGroup, Glyphicon} from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { API } from "aws-amplify";
import UserList from './UserList';

export default class ListAllUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            currentSearchPhrase: "",
            initialUsers: [],
            users: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    async componentDidMount() {
        try {
            const users = await this.users();
            //console.log(users);
            this.setState({
                initialUsers: users,
                users: users,
                loaded: true
            })
        } catch (e) {
            alert(e);
        }
    }

    users() {
        return API.get("projects", "/users/all");
    }

    //处理用户搜索
    clearFilters() {
        this.search.value = "";
        this.setState({
            users: [].concat(this.state.initialUsers),
            currentSearchPhrase: ""
        })
    }
    async handleSearch(event) {
        let value = event.target.value;
        this.setState({
            currentSearchPhrase: value
        });

        await this.setState({
            loaded: false
        });
        if (event) {
            let newUsers = this.state.initialUsers.filter(p => p.UserName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            this.setState({
                users: [].concat(newUsers),
                loaded: true
            })
        }
    }



    //渲染项目列表
    renderUsersList() {
        return (
            <Fragment>
                <Fragment>
                    <div style={{ marginBottom: "5%" }}>
                        <label htmlFor="searchUsers">Search users</label>
                        <div style={{ display: "flex" }}>
                            <input type="text" ref={input => this.search = input} onChange={this.handleSearch} className="form-control" id="searchUsers" aria-describedby="searchUsers"></input>
                            <Button onClick={this.clearFilters} bsSize="small" bsStyle="primary">
                                Clear
                            </Button>
                        </div>
                    </div>
                </Fragment>
                <hr />
                {this.state.loaded ?
                    this.state.users.length > 0
                        ?
                        <UserList users={this.state.users}></UserList>
                        :
                        <h3>No users found</h3>
                    :
                    <Fragment>
                        <Glyphicon glyph="refresh" className="spinning" />
                    </Fragment>
                }
            </Fragment>
        );
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Welcome!</h1>
                <p>A simple Project Management System</p>
            </div>
        );
    }

    renderUsers() {
        return (
            <div className="users">
                <ListGroup>
                    {this.state.loaded && this.renderUsersList(this.state.users)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="ListAllProjects">
                {this.props.isAuthenticated ? this.renderUsers() : this.renderLander()}
            </div>
        );
    }
}