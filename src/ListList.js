import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Divider, Icon } from 'semantic-ui-react';
import CreateList from './CreateList.js'

function ListList(props) {
    // a list of lists (inside profile)

    const history = useHistory()
    const lists = props.user.lists
    const setCurrentList = props.setCurrentList
    
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

    const handleOnClick = (e, listId) => {
        setCurrentList(listId)
        history.push(`lists/${listId}`)
    }

    return (
        <Container>
            <Card.Group>
                {lists.map(l => (
                    <Card key={l.id} onClick={e => handleOnClick(e, l.id)}>
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
                            - why is this blue lol?
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