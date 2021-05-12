import React, { useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import SearchBar from './SearchBar.js';
import RecipeTable from './RecipeTable.js'


function SearchTable(props) {
    const [results, setResults] = useState([])
    const [total, setTotal] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    const handleSubmitSearch = e => {
        e.preventDefault()
        if (searchTerm === '') {
            window.alert("Please fill out search term")
            return
        }

        fetch(`http://localhost:3030/api/v1/search/${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setResults(data.results)
            setTotal(data.total)
            setSubmitted(true)
        })
    }

    return (
        <Grid centered columns={16} className='search-table'>
            <SearchBar 
                searchTerm={searchTerm} 
                onChange={handleChange} 
                onSubmit={handleSubmitSearch}
            />
            {
                submitted
            ?
                <RecipeTable results={results} user={props.currentUser}/>
            :
                <div/>    
            }
            {
                total
            ?
                <Segment>
                    total results: {total}
                </Segment>
            :
                <div/>
            } 
        </Grid>
    )
}

export default SearchTable;