import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    Button, 
    Container, 
    Dropdown, 
    Form, 
    Grid, 
    Icon 
} from 'semantic-ui-react';

function CreateRecipe(props) {
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [servings, setServings] = useState('')
    const [ingredients, setIngredients] = useState([''])
    const [steps, setSteps] = useState([''])
    const [listId, setListId] = useState(null)

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if (location.state?.listId && !listId) {
            setListId(location.state.listId)
        }
    }, [listId])

    if (props.currentUser === null) {
        return <div/>
    }
    const user = props.currentUser
    const droptions = user.lists.map(l => (
        {
            key: l.id,
            text: l.name,
            value: l.id
        }
    ))

    const handleOnIngredientChange = (e, idx) => {
        let newIngredients = [...ingredients]
        newIngredients[idx] = e.target.value
        setIngredients(newIngredients)
    }

    const handleOnIngredientRemove = (e, idx) => {
        let newIngredients = ingredients.slice(0, idx)
        setIngredients(newIngredients)
    }

    const handleOnStepChange = (e, idx) => {
        let newSteps = [...steps]
        newSteps[idx] = e.target.value
        setSteps(newSteps)
    }

    const handleOnStepRemove = (e, idx) => {
        let newSteps = steps.slice(0, idx)
        setSteps(newSteps)
    }

    const handleOnSubmit = event => {
        // some validations

        fetch('http://localhost:3030/api/v1/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                recipe: {
                    name,
                    description: description,
                    author: '',
                    cook_time: cookTime,
                    servings,
                    ingredients: ingredients,
                    steps: steps,
                    url: ''
                },
                list_id: listId
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        setName('')
        setDescription('')
        setCookTime('')
        setServings('')
        setIngredients([''])
        setSteps([''])

        history.push('/lists/' + listId)
    }

    return (
        <Container>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input
                            icon="tag"
                            iconPosition="left"
                            name="name"
                            placeholder="Enter recipe name"
                            label="Recipe Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>List</label>
                        <Dropdown
                            selection
                            fluid
                            name="list"
                            placeholder="Select list"
                            options={droptions}
                            value={listId}
                            onChange={(e, list) => setListId(list.value)}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <Form.TextArea
                        placeholder="Enter recipe description"
                        label="Recipe Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Input
                        icon="clock outline"
                        iconPosition="left"
                        placeholder="Enter cooking time in minutes"
                        label="Cooking Time"
                        type="number"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                    />
                    <Form.Input
                        icon="food"
                        iconPosition="left"
                        placeholder="Enter number of servings"
                        label="Servings"
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                    />                    
                </Form.Group>
                <Form.Field>
                    <label>
                        Ingredients
                    </label>
                    {ingredients.map((i, idx) => (
                        
                            <Form.Input 
                                key={idx}
                                icon={
                                    idx === ingredients.length - 1 && idx !== 0
                                ?
                                    <Icon 
                                        name="delete" 
                                        link
                                        onClick={event => handleOnIngredientRemove(event, idx)}
                                    />
                                :
                                    null
                                }
                                onChange={event => handleOnIngredientChange(event, idx)}
                            />
                    ))}
                <Button
                    type="button"
                    onClick={() => setIngredients([...ingredients, ''])}
                >
                    <Icon name='plus'/>
                    add another ingredient
                </Button>
                </Form.Field>
                <Form.Field>
                    <label>
                        Directions
                    </label>
                    {steps.map((i, idx) => (
                        <Form.Input 
                            key={idx}
                            icon={
                                idx === steps.length - 1 && idx !== 0
                            ?
                                <Icon 
                                    name="delete" 
                                    link
                                    onClick={event => handleOnStepRemove(event, idx)}
                                />
                            :
                                null
                            }
                            onChange={event => handleOnStepChange(event, idx)}
                        />
                    ))}
                <Button
                    type="button"
                    onClick={() => setSteps([...steps, ''])}
                >
                    <Icon name='plus'/>
                    add another step
                </Button>
                </Form.Field>
                
                {/* 
                    Button as={Link}?
                    to then set pathname and state, 
                    in order to reload recipelist page
                    when its fromLocation is createrecipe?
                */}

                <Grid textAlign='center'>
                    <Grid.Row>
                        <Button 
                            size='large' 
                            type='button' 
                            onClick={() => history.push('/')}
                        >
                            Cancel
                        </Button>
                        <Button size='large' type='submit' color='teal'>
                            Create
                        </Button>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    )
}


export default CreateRecipe;