import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NotFound from "./containers/NotFound";
import WelcomePage from "./containers/WelcomePage";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ListAllProjects from "./containers/ListAllProjects";
import ListAllUsers from "./containers/ListAllUsers";
import HomeProjects from "./containers/Home";
import NewProject from "./containers/NewProject";
import OneProject from "./containers/OneProject";
import UserProfile from "./containers/UserProfile";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={WelcomePage} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps}/>

        <AppliedRoute path="/projects/all" exact component={ListAllProjects} props={childProps} />
        <AppliedRoute path="/projects/home" exact component={HomeProjects} props={childProps}/>
        <AppliedRoute path="/projects/new" exact component={NewProject} props={childProps} />
        <AppliedRoute path="/projects/:id" exact component={OneProject} props={childProps} />

        <AppliedRoute path="/users/all" exact component={ListAllUsers} props={childProps}/>
        <AuthenticatedRoute path="/users/profile/:id" exact component={UserProfile} props={childProps}/>
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;