import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Container, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react';

function Recipe(props) {

    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const recipeId = params.id
    const history = useHistory()
    const location = useLocation()
    const prevPage = location.state.fromLocation.pathname

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
        return <p>loadin</p>
    }

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Section link to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link to={prevPage}>
                    y
                </Breadcrumb.Section>
            </Breadcrumb>
            <Image size='small' src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'/>
            <Header>{recipe.name}</Header>
            <Button>Something</Button>
            <Container>
                {recipe.description}
            </Container>
            <Segment.Group horizontal>
                <Segment><Icon name='clock outline'/>Time:</Segment>
                <Segment><Icon name='food'/>Servings:</Segment>
            </Segment.Group>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        Ingredients
                        <List>
                            <List.Item></List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        Directions
                        <List>
                            <List.Item></List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
    
}

export default Recipe;