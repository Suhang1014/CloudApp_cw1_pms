import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, isAdmin: Admin, ...rest }) =>
    <Route
        {...rest}
        render={
            props =>
                cProps.isAuthenticated
                    ?
                    Admin ?
                        cProps.isAdmin ?
                            <C {...props} {...cProps} />
                            :
                            (() => {
                                return (
                                    <Redirect
                                        to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                                    />
                                )
                            })()
                        :
                        <C {...props} {...cProps} />
                    :
                    (() => {
                        return <Redirect
                            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                        />
                    })()
        }
    />;