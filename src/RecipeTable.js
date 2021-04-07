import React from 'react';
import RecipeRow from './RecipeRow.js';
import { Grid, Table } from 'semantic-ui-react';

export default function RecipeTable(props) {
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