import {Component, Fragment} from "react";
import {Glyphicon} from "react-bootstrap";
import NavBar from "./NavBar";
import Routes from "../Routes";
import {withRouter} from "react-router-dom";
import React from "react";

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
            console.log(userFullInfo);
            const currentUserRole = userFullInfo.Role;
            console.log(currentUserRole);
            if (currentUserRole === "Admin") {
                this.setState({
                    isAdmin: true
                })
            } else if (currentUserRole === "Manager") {
                this.setState({
                    isManager: true
                })
            }
            this.userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = async event => {
        await Auth.signOut();
        sessionStorage.clear();
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
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