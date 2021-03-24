import React from 'react';

export default function SearchBar(props) {

    return (
        <form id="search-bar" onSubmit={props.onSubmit}>
            <input type="text" placeholder="Search..." value={props.searchTerm} onChange={props.onChange}/>   
            <input type="submit" value="Submit"/>
        </form>
    )
}