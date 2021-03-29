import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recipe from './Recipe.js'

export default class Profile extends Component {

    componentDidMount() {
        let id = 1

        fetch(`http://localhost:3030/api/v1/users/${id}`, {
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
            <div>
                <p>Profil go her</p>
                <Link to="/">Link</Link>
                <Recipe/>
            </div>
        )
    }
}