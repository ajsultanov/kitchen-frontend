import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import ListCard from './ListCard.js';

function ListList(props) {
    // a list of lists (inside profile)

    const history = useHistory()
    const lists = props.currentUser.lists
    
    const url = process.env.REACT_APP_URL
    
    useEffect(() => {
        lists.forEach(l => {
            fetch(`${url}users/${props.currentUser.id}/lists/${l.id}`)
            .then(res => res.json())
            .then(data => {
                l.length = data.recipes.length
            })
        })
    }, [lists, url, props.currentUser.id])
    
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