import React, { Component } from "react";
import {Jumbotron } from "react-bootstrap";
import "./WelcomePage.css"

export default class WelcomePage extends Component {
    render() {
        return (
            <Jumbotron>
                <div className="lander">
                    <h1>Welcome!</h1>
                    <p>A simple Project Management System</p>
                </div>
            </Jumbotron>
        );
    };
}