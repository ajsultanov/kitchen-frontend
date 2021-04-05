import React from 'react';
import ListList from '../ListList.js'
import RecipeList from '../RecipeList.js'

function Profile(props) {

    const user = props.currentUser
    console.log(user);

    return (
        <div>
            <p>User ID: {user.id}, Username: {user.name}</p>
            
            <ListList user={user}/>
            <RecipeList/>
        </div>
    )
    
}

export default Profile;