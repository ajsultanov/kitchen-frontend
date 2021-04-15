import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import ListList from './ListList.js';
import CreateList from './CreateList.js';

function Profile(props) {
    return (
        <Container>
            <Header as='h2'>My Lists:</Header>         
            <ListList currentUser={props.currentUser} setCurrentList={props.setCurrentList}/>
            <Divider/>
            <CreateList userId={props.currentUser.id}/>
        </Container>
    )
}

export default Profile;