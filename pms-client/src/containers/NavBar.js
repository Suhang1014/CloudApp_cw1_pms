import {Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Fragment} from "react";
import React from "react";


const NavBar = (props) => {
    return (
        !props.isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Project Management App</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/projects/all">
                            <NavItem>
                                <span className="glyphicon glyphicon-th-list"></span> Check all Projects
                            </NavItem>
                        </LinkContainer>
                        {props.isAdmin
                            ?
                            <LinkContainer to="/users/all">
                                <NavItem><span className="glyphicon glyphicon-user"></span>Manage User</NavItem>
                            </LinkContainer>
                            :
                            null
                        }
                    </Nav>
                    <Nav pullRight>
                        {props.isAuthenticated
                            ? <NavItem onClick={() => props.handleLogOut()}>Logout</NavItem>
                            : <Fragment>
                                <LinkContainer to="/signup">
                                    <NavItem>Signup</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.isManager || props.isAdmin
                ?
                <Navbar>
                    <Nav pullLeft>
                        <LinkContainer to="/projects/new">
                            <NavItem>Create a New Project</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/projects/home">
                            <NavItem>Manage My Projects</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                :
                null

            }
        </div>
    );
}
export default NavBar;