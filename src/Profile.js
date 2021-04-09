import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ListList from './ListList.js';

function Profile(props) {
    const user = props.currentUser
    const setCurrentList = props.setCurrentList

    return (
        <Container>
            <Header as='h2'>My Lists:</Header>         
            <ListList user={user} setCurrentList={setCurrentList}/>
        </Container>
    )
}

export default Profile;