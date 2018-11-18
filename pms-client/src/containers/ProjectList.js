import React from 'react';
import ProjectListItem from './ProjectListItem'

const ProjectList = (props) => {
    return (
        props.projects.map((project, index) => {
            return <ProjectListItem {...project}  key={"p" + index}></ProjectListItem>
        })
    )
}
export default ProjectList;