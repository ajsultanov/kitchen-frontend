import React from 'react';
import { Button, Image, Table } from 'semantic-ui-react';
import { timeConvert, shortener } from './helpers.js'

export default function RecipeRow(props) {

    

    function addDefaultSrc(e) {
        e.target.src = "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
    }

    return (
        <Table.Row>
            <Table.Cell><Image rounded className="row-image" src={'https://spoonacular.com/recipeImages/' + props.result.image} alt={props.result.name} onError={addDefaultSrc}/></Table.Cell>
            <Table.Cell>
                <a href={props.result.url} target="_blank" rel="noreferrer">{shortener(props.result.name, 52)}</a>
            </Table.Cell>
            <Table.Cell>{timeConvert(props.result.time)}</Table.Cell>
            <Table.Cell>{props.result.servings}</Table.Cell>
            <Table.Cell>
                <Button>Add</Button>
            </Table.Cell>
        </Table.Row>
    )
}