import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Card, Container, Divider, Header } from 'semantic-ui-react';
import RecipeCard from './RecipeCard.js';

export default function RecipeList(props) {
    // a list of recipes (inside a list)

    const url = process.env.REACT_APP_URL

    const [list, setList] = useState(null)
    const params = useParams()
    const id = params.id
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
            <Header as='h2'>
                {list.name}
            </Header>
            <Container>
                {list.description}
            </Container>
            <Divider/>
            <Card.Group>
                {list.recipes.map(recipe => (
                    <RecipeCard key={recipe.id} list={list} recipe={recipe}/>
                ))}
            </Card.Group>
        </Container>
    )
}



