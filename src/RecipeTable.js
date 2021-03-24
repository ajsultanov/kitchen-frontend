import React from 'react';
import RecipeRow from './RecipeRow.js'

export default function RecipeTable(props) {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Servings</th>
                </tr>
            </thead>
            <tbody>
                {props.results.length > 0 ?
                    props.results.map((result, idx) => (
                    <RecipeRow  key={idx} result={result}/>
                )) :
                <tr><td>No results for this search</td></tr>
                }
            </tbody>
        </table>
    )
}