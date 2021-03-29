import React from 'react';
import RecipeRow from './RecipeRow.js';
import { Grid, Table } from 'semantic-ui-react';

export default function RecipeTable(props) {
    
    return (
        <Grid.Row>
            <Grid.Column width={14}>
            <Table >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Servings</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.results.length > 0 ?
                        props.results.map((result, idx) => (
                        <RecipeRow  key={idx} result={result}/>
                    )) :
                    <Table.Row><Table.Cell>No results for this search</Table.Cell></Table.Row>
                    }
                </Table.Body>
            </Table>
            </Grid.Column>
        </Grid.Row>
    )
}