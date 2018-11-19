import React from 'react';
import { Button } from 'react-bootstrap'
import './UserCard.css';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
    let isAdmin = null;
    if (props.Role === "Admin") { isAdmin = true; }
    return (
        <div className={"col-xs-12 col-sm-6 col-md-4 col-lg-3"}>
            <div className="card user-wrapper" style={{ width: "20rem" }}>
                <div className="card-body user-card">
                    <h3 className="card-title"><span className="glyphicon glyphicon-user"></span>{props.Email}</h3>
                    <hr/>
                        <div className="card-text-content">
                            <p className="card-text email">{"Email: " + props.Email}</p>
                            <p className="card-text role">{"Role: " + props.Role}</p>
                        </div>
                    { !isAdmin
                        ?
                        <Link key={props.UserId} to={`/users/profile/${props.UserId}`}>
                            <Button bsStyle="primary" id="modify-role" bsSize="sm">Modify Role</Button>
                        </Link>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}
export default UserCard;