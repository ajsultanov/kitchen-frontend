import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import SearchBar from '../SearchBar.js';
import RecipeTable from '../RecipeTable.js'

export default class SearchTable extends Component {
    constructor () {
        super()
        this.state = {
            results: [
                {
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    name: 'Marinara Sauce',
                    time: '30',
                    servings: '4',
                }
            ],
            searchTerm: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({searchTerm: e.target.value})
    }

    handleSubmit(e) {
        console.log('Search term: ' + this.state.searchTerm);
        e.preventDefault()

        // this submit can come from the search bar, or adding a recipe


        fetch(`http://localhost:3030/api/v1/search/${this.state.searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => (
            this.setState({results: data})
        ))
    }

    render() {
        return (
            <Grid centered columns={16} className='search-table'>
                
                    <SearchBar searchTerm={this.state.searchTerm} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                    <RecipeTable results={this.state.results}/>
                
            </Grid>
        )
    }





}