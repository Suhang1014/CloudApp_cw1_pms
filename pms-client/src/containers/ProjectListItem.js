import React from 'react';
import { ListGroupItem, Label} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import './ProjectListItems.css';

const ProjectListItem = (props) => {
    const cardClasses = [];
    const currentUserRole = sessionStorage.getItem("currentUserRole");
    const currentUserId = sessionStorage.getItem("currentUserId");
    if (currentUserRole === "Developer" || currentUserId !== props.UserId) {
        cardClasses.push("disabled-card");
    } else if (currentUserRole === "Manager" && currentUserId !== props.UserId) {
        cardClasses.push("disabled-card");
    }
    return (
        <div className={cardClasses.join(" ")} style={{ textDecoration: "none" }}>
            <LinkContainer
                key={props.ProjectId}
                to={`/projects/${props.ProjectId}`}
            >
                <ListGroupItem header={props.Content.trim().split("\n")[0]}>
                    <Label>{"Status: " + props.ProjectStatus.toLocaleString()}</Label>
                    <hr/>
                    <p>{"Published time: " + new Date(props.CreatedAt).toLocaleString()}</p>
                </ListGroupItem>
            </LinkContainer>
        </div>
    )
}
export default ProjectListItem;