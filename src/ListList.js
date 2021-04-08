import React from 'react';
import { Card, Container, Divider, Icon } from 'semantic-ui-react';
import CreateList from './stateful/CreateList.js'

function ListList(props) {
    // a list of lists (inside profile)

    const lists = props.user.lists
    
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

    return (
        <Container>
            <Card.Group>
                {lists.map(l => (
                    <Card 
                        key={l.id}
                        href={`lists/${l.id}`}
                    >
                        <Card.Content>
                            <Card.Header>
                                {l.name}
                            </Card.Header>
                            <Card.Meta>
                                <Icon name='content'/> options button -&#62; edit -&#62; delete?
                            </Card.Meta>
                            <Card.Description>
                                {l.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            number of recipes
                            - why is this blue?
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
            <Divider/>
            <CreateList userId={props.user.id}/>
        </Container>
    )
}

export default ListList;