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

    state = {
        username: '',
        password: '',
        page: 'login',
        otherPage: 'signup',
    }

    handleOnChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleOnSubmit = event => {
        event.preventDefault()
        if (this.state.username && this.state.password) {
            this.props.history.push('/')
            if (this.state.page === 'login') {
                this.setUser(this.state)
            } else if (this.state.page === 'signup') {
                this.createUser(this.state)
            }
        } else {
            window.alert("Please fill out all fields")
        }
    }

    handleOnClick = event => {
        event.preventDefault()
        this.setState({
            username: '',
            password: '',
            otherPage: this.state.page,
            page: event.target.name
        })
    }

    createUser(state) {
        fetch('http://localhost:3030/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: state.username,
                    password: state.password
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                window.alert(data.message)
            } else {
                document.cookie = `kitchen_token=${data.jwt}`
                this.props.setCurrentUser(data.user)
            }
        })
    }

    setUser(state) {
        fetch('http://localhost:3030/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: state.username,
                    password: state.password
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                window.alert(data.message)
            } else {
                document.cookie = `kitchen_token=${data.jwt}`
                this.props.setCurrentUser(data.user)
            }
        })
    }


    render() {
        const formattedPageName = page => (
            page.slice(0, 1).toUpperCase() + 
            page.slice(1, -2) +
            " " + 
            page.slice(-2, -1).toUpperCase() +
            page.slice(-1)
        )
        
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        {formattedPageName(this.state.page)}
                    </Header>
                    <Segment>
                        <Form 
                            size="large"
                            action="post"
                            onSubmit={this.handleOnSubmit}
                        >
                            <Form.Input
                                icon="user"
                                iconPosition="left"
                                name="username"
                                placeholder="Enter user name"
                                label="User name"
                                onChange={this.handleOnChange}
                                value={this.state.username}
                            />
                            <Form.Input
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Enter password"
                                label="Password"
                                type="password"
                                onChange={this.handleOnChange}
                                value={this.state.password}
                            />
                            <Button 
                                fluid
                                circular
                                color="yellow" 
                                size="large"
                                type="submit"
                            >
                                {formattedPageName(this.state.page)}
                                <Icon name="arrow alternate circle right"/>
                            </Button>
                        </Form>
                    </Segment>
                    <Message info>
                        { this.state.page === 'login' ? 'Not' : 'Already'} registered? &nbsp;
                        <a href={'/' + this.state.otherPage} name={this.state.otherPage} onClick={this.handleOnClick}>
                            {formattedPageName(this.state.otherPage)} here
                        </a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}