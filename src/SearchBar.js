import React from 'react';
import { Button, Form, Grid, Input } from 'semantic-ui-react';

export default function SearchBar(props) {

    return (
        <Grid.Column width={8}>
            <Form onSubmit={props.onSubmit} id='search-bar'>
                <Form.Field>
                    <label>Search</label>
                    <Input 
                        icon='search'
                        type='text' 
                        size='big' 
                        value={props.searchTerm} 
                        onChange={props.onChange} 
                        placeholder='Search by keyword or ingredient...'
                    />
                </Form.Field>
                <Form.Field type='submit' fluid control={Button}>Search for Recipes</Form.Field>
            </Form>
        </Grid.Column>
    )
}