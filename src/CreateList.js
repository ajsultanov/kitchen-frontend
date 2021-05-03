import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Header, TextArea } from 'semantic-ui-react';

function CreateList(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const history = useHistory()

    const handleOnSubmit = () => {
        // some validation

        fetch(`http://localhost:3030/api/v1/users/${props.userId}/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                list: {
                    name,
                    description,
                    user_id: props.userId
                }
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        history.go(0)
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <Header as='h4'>Create a new list</Header>
            <Form.Field>
                <Form.Input
                    label='Name'
                    placeholder="List name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            </Form.Field>
            <Form.Field>
                <TextArea
                    label='Description'
                    placeholder='List description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
            </Form.Field>
            <Button size='tiny' color='blue'>
                Create
            </Button>
        </Form>
           
    )
}

export default CreateList;