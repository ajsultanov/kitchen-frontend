import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Image, Header } from 'semantic-ui-react';

function AppMenu(props) {

    const [activeItem, setActiveItem] = useState(null)

    const handleClick = (e, { name }) => setActiveItem({name})

    const handleLogout = () => { 
        document.cookie='kitchen_token='
        props.setCurrentUser(null)
        setActiveItem('login')
    }

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
                {props.currentUser ? 
                <>
                    <Menu.Item
                    as={NavLink}
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleClick}
                    to='/'
                    exact
                    >
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        name='search'
                        active={activeItem === 'search'}
                        onClick={handleClick}
                        to='/search'
                        exact
                    >
                        Search for Recipes
                    </Menu.Item>
                    <Menu.Item
                        as={NavLink}
                        name='create-recipe'
                        active={activeItem === 'create-recipe'}
                        onClick={handleClick}
                        to='/create-recipe'
                        exact
                    >
                        Create Recipe
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to='/login'
                        onClick={handleLogout}
                    >
                        Log Out
                    </Menu.Item>
                </>
                :
                    <Menu.Item
                        as={NavLink}
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleClick}
                        to='/login'
                        exact
                    >
                        Log In
                    </Menu.Item>
                }
                


            </Menu.Menu>
        </Menu>
    )
    
}

export default AppMenu;