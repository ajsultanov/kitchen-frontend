import React from 'react';
import { Card, Container, Divider, Header, Segment } from 'semantic-ui-react';
import CreateList from './stateful/CreateList.js'

function ListList(props) {
    // a list of lists (inside profile)

    const lists = props.user.lists
    lists.sort((a, b) => b.id - a.id)

    if (lists === undefined) {
        return <div/>
    } else if (lists.length === 0) {
        return (
            <Card.Group>
                <CreateList/>
            </Card.Group>
        )
    }

    return (
        <Container>
            <Header as='h2'>Lists:</Header>
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
                                Some meta data
                            </Card.Meta>
                            <Card.Description>
                                {l.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>
                            number of recipes
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