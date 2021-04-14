import React, { useState } from 'react';
import { Button, Form, Grid, Input } from 'semantic-ui-react';

function SearchBar(props) {

    const [ready, setReady] = useState(false)

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
                        onChange={e => {
                            if (e.target.value) {
                                setReady(true)
                            } else {
                                setReady(false)
                            }
                            props.onChange(e)
                        }}
                        placeholder='Search by keyword or ingredient...'
                    />
                </Form.Field>
                <Form.Field type='submit' fluid positive={ready} control={Button}>Search for Recipes</Form.Field>
            </Form>
        </Grid.Column>
    )
}

export default SearchBar;