import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import ListList from './ListList.js';

function Profile(props) {
    console.log(props);
    return (
        <Container>
            <Header as='h2'>My Lists:</Header>         
            <ListList currentUser={props.currentUser} setCurrentList={props.setCurrentList}/>
        </Container>
    )
}

export default Profile;