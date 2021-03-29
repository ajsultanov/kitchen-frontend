import React, { Component } from 'react';

export default class Recipe extends Component {
    
    componentDidMount() {
        let id = 1

        fetch(`http://localhost:3030/api/v1/recipe/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(console.log())
    }

    render() {
        return (
            <p>Recip go her</p>
        )
    }
}