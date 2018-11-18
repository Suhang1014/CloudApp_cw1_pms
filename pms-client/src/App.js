import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Glyphicon } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes.js";
import { Auth, API } from "aws-amplify";
import NavBar from "./containers/NavBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            isAdmin: false,
            isManager: false
        };
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    async componentDidMount() {
        try {
            let session = await Auth.currentSession();
            let currentUserInfo = await Auth.currentUserInfo();
            let userFullInfo = await API.get("projects", `/users/${currentUserInfo.id}`);
            if (userFullInfo.Role === "Admin") {
                this.setState({
                    isAdmin: true
                });
            } else if (userFullInfo.Role === "Manager") {
                this.setState({
                    isManager: true
                });
            }
            this.userHasAuthenticated(true);
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({
            isAuthenticating: false,

        });
    }

    handleLogOut = async event => {
        await Auth.signOut();
        sessionStorage.clear();
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    }
    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            isAdmin: this.state.isAdmin,
            isManager: this.state.isManager,
            userHasAuthenticated: this.userHasAuthenticated
        };
        return (
            <div className="App">
                {this.state.isAuthenticating ?
                    <Fragment>
                        <Glyphicon glyph="refresh" className="spinning" />
                    </Fragment>
                    :
                    <Fragment>
                        <NavBar
                            handleLogOut={this.handleLogOut}
                            isAuthenticated={this.state.isAuthenticated}
                            isAdmin={this.state.isAdmin}
                            isManager={this.state.isManager}
                            isAuthenticating={this.state.isAuthenticating}
                        />
                        <Routes childProps={childProps} />
                    </Fragment>
                }
            </div>
        );
    }
}

export default withRouter(App);
