import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Card, Container, Divider, Header, Icon, Image, Segment} from 'semantic-ui-react';
import { timeConvert, shortener, createDescription } from './helpers';

export default function RecipeList(props) {
    // a list of recipes (inside a list)

    const url = process.env.REACT_APP_URL

    const [list, setList] = useState(null)
    const params = useParams()
    const id = params.id
    const location = useLocation()
    // const prevPage = location
    // console.log(prevPage)

    const user = props.currentUser    
    
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
        return <div/>
    } else if (list.recipes.length === 0) {
        return (
            <Container>
                <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>
                    {list.name}
                </Breadcrumb.Section>
            </Breadcrumb>
                <Header>{list.name}</Header>
                No recipes yet! Why don't you&nbsp;
                <Link to='/create-recipe'>
                    create a new one...
                </Link>
            </Container>
        )
    }

    list.recipes.sort((a, b) => b.id - a.id)

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>
                    {list.name}
                </Breadcrumb.Section>
            </Breadcrumb>
            <Divider/>
            <Header>{list.name}</Header>
            <Card.Group>
                {list.recipes.map(r => (
                    <Card as={Link}
                        key={r.id}
                        to={{
                            pathname: `/recipes/${r.id}`,
                            state: { 
                                fromLocation: location,
                                name: list.name
                             }
                        }}
                    >
                        <Image 
                            size='tiny' 
                            src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'
                        />
                        <Card.Content>
                            <Card.Header>{r.name}</Card.Header>
                            <Card.Meta>
                                <p 
                                    dangerouslySetInnerHTML={
                                        createDescription(
                                            shortener(r.description, 118)
                                        )
                                    }
                                />
                            </Card.Meta>
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



