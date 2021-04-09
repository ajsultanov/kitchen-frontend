import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Divider, Icon } from 'semantic-ui-react';
import CreateList from './CreateList.js'

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
                    <Card 
                        key={list.id}
                        onClick={e => handleOnClick(e, list)}
                    >
                        <Card.Content>
                            <Card.Header>
                                {list.name}
                            </Card.Header>
                            <Card.Meta>
                                <Icon name='content'/> options button -&#62; edit -&#62; delete?
                            </Card.Meta>
                            <Card.Description>
                                {list.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            number of recipes
                            - why is this blue lol?
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider/>
            <CreateList userId={props.currentUser.id}/>
        </Container>
    )
}

export default ListList;