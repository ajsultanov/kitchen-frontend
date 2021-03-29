import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default class Recipe extends Component {
    
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
        .then(data => console.log(data))
    }

    render() {
        return (
            <Card>
                <Image/>
                <Card.Content>
                    <Card.Header></Card.Header>
                    <Card.Meta></Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='clock outline'/>minutes
                    <Icon name='food'/>servings
                </Card.Content>
            </Card>
        )
    }
}