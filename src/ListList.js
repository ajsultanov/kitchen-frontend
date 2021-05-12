import { useHistory, useLocation } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import ListCard from './ListCard.js';

function ListList(props) {
    // a list of lists (inside profile)

    const history = useHistory()
    const location = useLocation()
    const lists = props.currentUser.lists
    
    if (location?.state?.deleted) {
        history.go(0)
    }
    if (lists === undefined) {
        return <div/>
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
        </Container>
    )
}

export default ListList;