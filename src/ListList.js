import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import ListCard from './ListCard.js';

// want to rerender when list deleted

function ListList(props) {
    // a list of lists (inside profile)

    const history = useHistory()
    const location = useLocation()
    const lists = props.currentUser.lists
    
    if (lists === undefined) {
        return <div/>
    } 
    lists.sort((a, b) => b.id - a.id)

    const url = process.env.REACT_APP_URL
    lists.forEach(l => {
        fetch(`${url}users/${props.currentUser.id}/lists/${l.id}`)
        .then(res => res.json())
        .then(data => {
            l.length = data.recipes.length
        })
    })

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
        </Container>
    )
}

export default ListList;