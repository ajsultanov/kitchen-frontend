import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import RecipeTable from './RecipeTable.js'

export default class SearchTable extends Component {
    constructor () {
        super()
        this.state = {
            results: [],
            searchTerm: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({searchTerm: e.target.value})
        console.log(this.state.searchTerm)
    }

    handleSubmit(e) {
        alert('You submitted: ' + this.state.searchTerm)
        e.preventDefault()
    }

    render() {
        return (
            <div className="search-table">
                <SearchBar searchTerm={this.state.searchTerm} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
                <RecipeTable results={this.state.results}/>
            </div>
        )
    }





}