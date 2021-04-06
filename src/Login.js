import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
  } from 'semantic-ui-react';

function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [page, setPage] = useState('login')
    const [otherPage, setOtherPage] = useState('signup')

    const history = useHistory()

    const handleOnSubmit = event => {
        event.preventDefault()
        if (username && password) {
            history.push('/')
            if (page === 'login') {
                setUser(username, password)
            } else if (page === 'signup') {
                createUser(username, password)
            }
        } else {
            window.alert("Please fill out all fields")
        }
    }

    const handleOnClick = event => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        setOtherPage(page)
        setPage(event.target.name)
    }

    const createUser = (username, password) => {
        fetch('http://localhost:3030/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: username,
                    password: password
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                window.alert(data.message)
            } else {
                console.log(data);
                localStorage.setItem("user_token", data.jwt)
                props.setCurrentUser(data.user)
            }
        })
    }

    const setUser = (username, password) => {
        fetch('http://localhost:3030/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: username,
                    password: password
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message) {
                window.alert(data.message)
            } else {
                localStorage.setItem("user_token", data.jwt)
                props.setCurrentUser(data.user)
            }
        })
    }

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
                    {formattedPageName(page)}
                </Header>
                <Segment>
                    <Form 
                        size="large"
                        action="post"
                        onSubmit={handleOnSubmit}
                    >
                        <Form.Input
                            icon="user"
                            iconPosition="left"
                            name="username"
                            placeholder="Enter user name"
                            label="User name"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                        <Form.Input
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="Enter password"
                            label="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button 
                            fluid
                            circular
                            color="yellow" 
                            size="large"
                            type="submit"
                        >
                            {formattedPageName(page)}
                            <Icon name="arrow alternate circle right"/>
                        </Button>
                    </Form>
                </Segment>
                <Message info>
                    { page === 'login' ? 'Not' : 'Already'} registered? &nbsp;
                    <a href={'/' + otherPage} name={otherPage} onClick={handleOnClick}>
                        {formattedPageName(otherPage)} here
                    </a>
                </Message>
            </Grid.Column>
        </Grid>
    )   
}

export default Login;