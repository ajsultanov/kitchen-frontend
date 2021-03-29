import React, { Component } from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
  } from 'semantic-ui-react';

export default class Login extends Component {

    onSubmit = () => {console.log("ok");}

    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        Login
                    </Header>
                    <Segment>
                        <Form 
                            size="large"
                            action="post"
                            onSubmit={this.onSubmit}
                        >
                            <Form.Input
                                icon="user"
                                iconPosition="left"
                                name="username"
                                placeholder="Enter user name"
                                label="User name"
                            />
                            <Form.Input
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Enter password"
                                label="Password"
                                type="password"
                            />
                            <Button 
                                fluid
                                circular
                                color="yellow" 
                                size="large"
                                type="submit"
                            >
                                Login
                                <Icon name="arrow alternate circle right"/>
                            </Button>
                        </Form>
                    </Segment>
                    <Message info>
                        Not registered? <a href="/login">Sign up here</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}