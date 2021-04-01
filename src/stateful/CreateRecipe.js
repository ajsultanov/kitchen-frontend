import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';

export default class CreateRecipe extends Component {

    state = {

    }

    render() {

        return (
            <Container>
                <Form>
                    <Form.Field>
                        <Form.Input
                            icon="tag"
                            iconPosition="left"
                            name="name"
                            placeholder="Enter recipe name"
                            label="Recipe Name"
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon="content"
                            iconPosition="left"
                            placeholder="Enter recipe description"
                            label="Recipe Description"
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon="clock outline"
                            iconPosition="left"
                            placeholder="Enter cooking time in minutes"
                            label="Cooking Time"
                            type="text"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon="food"
                            iconPosition="left"
                            placeholder="Enter number of servings"
                            label="Servings"
                            type="text"
                        />
                    </Form.Field>
                </Form>
            </Container>
        )
    }
}