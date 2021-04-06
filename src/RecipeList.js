import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Card, Container, Header, Icon, Image, Segment} from 'semantic-ui-react';
import { timeConvert, shortener } from './helpers';

export default function RecipeList(props) {
    // a list of recipes (inside a list)

    const url = process.env.REACT_APP_URL

    const [list, setList] = useState(null)
    const params = useParams()
    const id = params.id

    const user = props.currentUser
    
    const location = useLocation()
    const history = useHistory()


    useEffect(() => {
        if (user && list === null) {

            fetch(`${url}users/${user.id}/lists/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
            })
            // .then(res => res.text())
            // .then(res => console.log(res))
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                    setList(data)
                }
            })
        }
    })

    if (list === null) {
        return <p>loadin</p>
    } else if (list.recipes.length === 0) {
        return (
            <Container>
                <Link to='/'>Back to Lists</Link>
                <Header>{list.name}</Header>
                create a new recipe...
            </Container>
        )
    }

    console.log(list);

    return (
        <Container>
            <Link to='/'>Back to Lists</Link>
            <Header>{list.name}</Header>
            <Card.Group>
                {list.recipes.map(r => (
                    <Card as={Link}
                        key={r.id}
                        to={{
                            pathname: `/recipes/${r.id}`,
                            state: { fromLocation: location}
                        }}
                    >
                        <Image/>
                        <Card.Content>
                            <Card.Header>{r.name}</Card.Header>
                            <Card.Meta>{shortener(r.description, 118)}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Segment.Group horizontal>
                                <Segment>
                                    <Icon name='clock outline'/>{timeConvert(r.cook_time)}
                                </Segment>
                                <Segment>
                                    <Icon name='food'/>{r.servings} servings
                                </Segment>
                            </Segment.Group>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    )
}



