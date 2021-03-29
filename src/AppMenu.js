import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image, Header } from 'semantic-ui-react';

export default class AppMenu extends Component {
    state = {
        activeItem: null,
    }

    handleClick = (e, { name }) => this.setState({activeItem: name})

    render() {
        const { activeItem } = this.state

        return (
            <Menu borderless>
                <Menu.Item>
                    <Image rounded size='mini' src='https://images.unsplash.com/photo-1453060590797-2d5f419b54cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'/>
                </Menu.Item>
                <Menu.Item header>
                    <Header>
                        Kitchenette
                    </Header>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        as={NavLink}
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleClick}
                        to='/'
                        exact
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        name='login'
                        active={activeItem === 'login'}
                        onClick={this.handleClick}
                        to='/login'
                        exact
                    >
                        Log In
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        name='search'
                        active={activeItem === 'search'}
                        onClick={this.handleClick}
                        to='/search'
                        exact
                    >
                        Search for Recipes
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        name='create-recipe'
                        active={activeItem === 'create-recipe'}
                        onClick={this.handleClick}
                        to='/create-recipe'
                        exact
                    >
                        Create Recipe
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}