import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react';
import { timeConvert, createDescription } from '../helpers.js';

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
            <Container textAlign='center'>
                <Image 
                    // fluid
                    centered
                    size='medium' 
                    src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'
                    />
                <Header>{recipe.name}</Header>
                {/* <Button>Something</Button> */}
            </Container>
            <Divider/>
            <Container text>
                <p 
                    dangerouslySetInnerHTML={
                        createDescription(recipe.description)
                    }
                />
            </Container>
            <Segment.Group horizontal>
                <Segment textAlign='center' size='large'>
                    <Icon name='clock outline'/>Time: {timeConvert(recipe.cook_time)}
                </Segment>
                <Segment textAlign='center' size='large'>
                    <Icon name='food'/>Servings: {recipe.servings}
                </Segment>
            </Segment.Group>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    <Segment>
                        <Header>
                            Ingredients
                        </Header>
                        <Grid>
                            {
                                recipe.ingredients
                            ?
                                recipe.ingredients.map((i, idx) => (
                                    <Grid.Row key={idx} >
                                        <Grid.Column width={1}>
                                            <Icon name='caret right'/>
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            {i}
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            :
                                <div/>
                            }
                        </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                        <Header>
                            Directions
                        </Header>
                        <Grid>
                        {
                                recipe.steps
                            ?
                                recipe.steps.map((s, idx) => (
                                    <Grid.Row key={idx}>
                                        <Grid.Column width={1}>
                                            <strong>{idx + 1}</strong>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            {s}
                                        </Grid.Column>
                                    </Grid.Row>
                                ))
                            :
                                <div/>
                            }
                        </Grid>
                    </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
    
}

export default Recipe;