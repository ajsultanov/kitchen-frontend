import React from 'react';
import { Card, Container, Header } from 'semantic-ui-react';

function ListList(props) {
    // a list of lists (inside profile)

    const lists = props.user.lists

    if (lists === undefined) {
        return <div/>
    } else if (lists.length === 0) {
        return (
            <Card.Group>
                <Card
                    href='/create-list'
                >
                    create a new list...
                </Card>
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
                <Card
                    href='/create-list'
                >
                    Create a new list
                </Card>
            </Card.Group>
        </Container>
    )
}

export default ListList;