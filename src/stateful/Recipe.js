import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react';
import { timeConvert } from '../helpers.js';

function Recipe(props) {

    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const recipeId = params.id
    const location = useLocation()
    const prevPage = location.state.fromLocation.pathname
    const list = location.state.name

    const fetchRecipe = () => {
        fetch(`http://localhost:3030/api/v1/recipes/${recipeId}`)
        .then(response => response.json())
        .then(data => {
            setRecipe({
                author: data.author,
                cook_time: data.cook_time,
                description: data.description,
                id: data.id,
                ingredients: data.ingredients,
                name: data.name,
                servings: data.servings,
                steps: data.steps,
                url: data.url,
            })
        })
    }

    useEffect(() => {
        fetchRecipe()
    }, [])

    if (recipe === null) {
        return <div/>
    }

    console.log(recipe);

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section as={Link} to={prevPage}>
                    {list}
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>
                    {recipe.name}
                </Breadcrumb.Section>
            </Breadcrumb>
            <Divider/>
            <Image 
                size='small' 
                src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'
            />
            <Header>{recipe.name}</Header>
            <Button>Something</Button>
            <Container>
                {recipe.description}
                <Link to='/'></Link>
            </Container>
            <Segment.Group horizontal>
                <Segment textAlign='center'>
                    <Icon name='clock outline'/>Time: {timeConvert(recipe.cook_time)}
                </Segment>
                <Segment textAlign='center'>
                    <Icon name='food'/>Servings: {recipe.servings}
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header>
                            Ingredients
                        </Header>
                        <List>
                            {
                                recipe.ingredients
                            ?
                                recipe.ingredients.map((i, idx) => (
                                    <List.Item key={idx}>{i}</List.Item>
                                ))
                            :
                                <div/>
                            }
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <Header>
                            Directions
                        </Header>
                        <List>
                        {
                                recipe.steps
                            ?
                                recipe.steps.map((s, idx) => (
                                    <List.Item key={idx}>{idx + 1}. {s}</List.Item>
                                ))
                            :
                                <div/>
                            }
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
    
}

export default Recipe;