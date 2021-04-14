import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Divider, Icon } from 'semantic-ui-react';
import CreateList from './CreateList.js'
import ListCard from './ListCard.js';

function ListList(props) {
    // a list of lists (inside profile)


    const history = useHistory()
    const lists = props.currentUser.lists
    
    if (lists === undefined) {
        return <div/>
    } else if (lists.length === 0) {
        return (
            <Card.Group>
                <CreateList/>
            </Card.Group>
        )
    }
    lists.sort((a, b) => b.id - a.id)

    const handleOnClick = (e, list) => {
        history.push(`lists/${list.id}`)
    }

    return (
        <Container>
            <Card.Group>
                {lists.map(list => (
                    <ListCard 
                        key={list.id}
                        handleOnClick={handleOnClick}
                        list={list}
                    />
                ))}
            </Card.Group>
            <Divider/>
            <CreateList userId={props.currentUser.id}/>
        </Container>
    )
}

export default ListList;