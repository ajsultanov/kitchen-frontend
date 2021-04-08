import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ListList from '../ListList.js';

function Profile(props) {
    const user = props.currentUser

    return (
        <Container>
            <Header as='h2'>My Lists:</Header>         
            <ListList user={user}/>
        </Container>
    )
    
}

export default Profile;