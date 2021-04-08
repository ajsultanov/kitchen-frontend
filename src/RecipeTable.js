import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Table } from 'semantic-ui-react';
import RecipeRow from './RecipeRow.js';

export default function RecipeTable(props) {

    // const [listId, setListId] = useState(null)
    const history = useHistory()

    const saveRecipe = (recipe, listId) => {

        fetch(`http://localhost:3030/api/v1/get_info/${recipe.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            fetch('http://localhost:3030/api/v1/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    recipe: {
                        name: data.name,
                        description: data.description,
                        author: '',
                        cook_time: data.cook_time,
                        servings: data.servings,
                        ingredients: data.ingredients,
                        steps: data.steps,
                        url: data.url
                    },
                    list_id: listId
                })
            })
        })

        history.push('/lists/' + listId)
    }

    return (
        <Grid.Row>
            <Grid.Column width={14}>
            <Table unstackable singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Image</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Time</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Servings</Table.HeaderCell>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.results.length > 0 ?
                        props.results.map((result, idx) => (
                        <RecipeRow key={idx} result={result} saveRecipe={saveRecipe} user={props.user}/>
                    )) :
                    <Table.Row><Table.Cell>No results for this search</Table.Cell></Table.Row>
                    }
                </Table.Body>
            </Table>
            </Grid.Column>
        </Grid.Row>
    )
}