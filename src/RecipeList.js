import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { 
    Breadcrumb, 
    Button, 
    Card, 
    Container, 
    Divider, 
    Form, 
    Grid, 
    Header, 
    Input, 
    Modal 
} from 'semantic-ui-react';
import RecipeCard from './RecipeCard.js';

export default function RecipeList(props) {
    // a list of recipes (inside a list)

    const url = process.env.REACT_APP_URL

    const [list, setList] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const params = useParams()
    const history = useHistory()
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
   
    const deleteList = () => {
        fetch(`http://localhost:3030/api/v1/users/${user.id}/lists/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        history.push('/')
    }

    if (!list) {
        return <div/>
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
            {list.recipes.length === 0 
            ?
                <Container>
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
            :
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
            }
            <Divider/>
            <Grid textAlign='center'>
                <Grid.Row>
                    <Modal
                        closeIcon
                        size='small'
                        onClose={() => setOpenEdit(false)}
                        onOpen={() => setOpenEdit(true)}
                        open={openEdit}
                        trigger={<Button>Edit List</Button>}
                    >
                        <Modal.Header>Edit list</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field label='list name'>
                                    <Input/>
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setOpenEdit(false)}>
                                Cancel
                            </Button>
                           <Button onCluck={handleOnClickEdit} content='ok'/>
                        </Modal.Actions>
                    </Modal>

                    <Modal
                        closeIcon
                        size='small'
                        onClose={() => setOpenDelete(false)}
                        onOpen={() => setOpenDelete(true)}
                        open={openDelete}
                        trigger={<Button>Delete</Button>}
                    >
                        <Modal.Header>Are you sure you want to delete this recipe?</Modal.Header>
                        <Modal.Actions>
                            <Button onClick={() => setOpenDelete(false)}>
                                Cancel
                            </Button>
                            <Button
                                content="Yes, delete it"
                                onClick={() => {
                                    setOpenDelete(false)
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



