import React from 'react';
import { Button, Image, Table } from 'semantic-ui-react';

export default function RecipeRow(props) {

    function timeConvert() {
        const minutes = props.result.time
        const hours = minutes / 60 > 2 ? " hours " : " hour "
        const mins = minutes % 60 !== 0 ? minutes % 60 + " minutes" : ""
        if (minutes > 59) {
            return Math.floor(minutes / 60) + hours + mins
        } else {
            return minutes + " minutes"
        }
    }

    function nameShortener() {
        const name = props.result.name
        return name.length > 52 ? name.slice(0, 49) + "..." : name
    }

    function addDefaultSrc(e) {
        e.target.src = "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
    }

    return (
        <Table.Row>
            <Table.Cell><Image rounded className="row-image" src={'https://spoonacular.com/recipeImages/' + props.result.image} alt={props.result.name} onError={addDefaultSrc}/></Table.Cell>
            <Table.Cell>
                <a href={props.result.url} target="_blank" rel="noreferrer">{nameShortener()}</a>
            </Table.Cell>
            <Table.Cell>{timeConvert()}</Table.Cell>
            <Table.Cell>{props.result.servings}</Table.Cell>
            <Table.Cell>
                <Button>Add</Button>
            </Table.Cell>
        </Table.Row>
    )
}