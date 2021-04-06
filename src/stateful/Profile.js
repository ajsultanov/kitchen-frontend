import React from 'react';
import ListList from '../ListList.js'

function Profile(props) {

    const user = props.currentUser
    console.log(user);

    return (
        <div>
            <p>User ID: {user.id}, Username: {user.name}</p>
            
            <ListList user={user}/>
        </div>
    )
    
}

export default Profile;