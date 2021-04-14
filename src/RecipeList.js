import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Card, Container, Divider, Grid, Header, Modal } from 'semantic-ui-react';
import RecipeCard from './RecipeCard.js';

export default function RecipeList(props) {
    // a list of recipes (inside a list)

    const url = process.env.REACT_APP_URL

    const [list, setList] = useState(null)
    const [open, setOpen] = useState(false)
    const params = useParams()
    const id = params.id
    const user = props.currentUser
    
    useEffect(() => {
        if (user && list === null) {
            fetch(`${url}users/${user.id}/lists/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                    setList(data)
                }
            })
        }
    })

    const handleOnClickEdit = () => {}
    const deleteList = () => {}

    if (!list) {
        return <div/>
    } else if (list.recipes.length === 0) {
        return (
            <Container>
                <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>
                    {list.name}
                </Breadcrumb.Section>
            </Breadcrumb>
                <Header>{list.name}</Header>
                No recipes yet! Why don't you&nbsp;
                <Link to={{
                    pathname: '/create-recipe',
                    state: {
                        listId: id
                    }
                }}>
                    create a new one...
                </Link>
            </Container>
        )
    }

    list.recipes.sort((a, b) => b.id - a.id)

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Section as={Link} to='/'>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>
                    {list.name}
                </Breadcrumb.Section>
            </Breadcrumb>
            <Divider/>
            <Header as='h2'>
                {list.name}
            </Header>
            <Container>
                {list.description}
            </Container>
            <Divider/>
            <Card.Group>
                {list.recipes.map(recipe => (
                    <RecipeCard key={recipe.id} list={list} recipe={recipe}/>
                ))}
                <Card 
                    as={Link}
                    color='purple'
                    to={{
                        pathname: '/create-recipe',
                        state: {
                            listId: id
                        }
                    }}
                >
                    <Card.Content>
                        <Card.Header>Create a new recipe in this list</Card.Header>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Divider/>
            <Grid textAlign='center'>
                <Grid.Row>
                    <Button content='Edit List' name='edit' onClick={handleOnClickEdit}/>

                    <Modal
                        closeIcon
                        size='small'
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button>Delete</Button>}
                    >
                        <Modal.Header>Are you sure you want to delete this recipe?</Modal.Header>
                        <Modal.Actions>
                            <Button onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                content="Yes, delete it"
                                onClick={() => {
                                    setOpen(false)
                                    deleteList()
                                }}
                                negative
                            />
                        </Modal.Actions>
                    </Modal>
                </Grid.Row>
            </Grid>
        </Container>
    )
}



