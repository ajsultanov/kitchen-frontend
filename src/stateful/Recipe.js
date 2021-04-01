import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react';

export default class Recipe extends Component {

    state = {}
    
    componentDidMount() {
        let id = 1

        fetch(`http://localhost:3030/api/v1/recipes/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
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



    render() {
        
        return (
            <Container>
                <Image size='small' src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'/>
                <Header>{this.state.name}</Header>
                <Button>Something</Button>
                <Container>
                    {this.state.description}
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
}