import React from 'react';
import UserCard from './UserCard';

const UserList = (props) => {
    return (
        props.users.map((user, index) => {
            return <UserCard Role={props.Role} {...user} key={"p" + index}></UserCard>
        })
    )
}
export default UserList;