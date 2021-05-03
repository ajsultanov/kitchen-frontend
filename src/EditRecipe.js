import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    Button, 
    Container, 
    Dropdown, 
    Form, 
    Grid, 
    Icon 
} from 'semantic-ui-react';

function EditRecipe(props) {
    const user = props.currentUser

    const history = useHistory()
    const location = useLocation()
    const recipe = location.state?.recipe
    const prevPage = location.state?.fromLocation
    const idOfList = location.state?.listId

    const [name, setName] = useState(recipe.name)
    const [description, setDescription] = useState(recipe.description)
    const [cookTime, setCookTime] = useState(recipe.cook_time)
    const [servings, setServings] = useState(recipe.servings)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [steps, setSteps] = useState(recipe.steps)
    const [listId] = useState(idOfList)
    const [newListId, setNewListId] = useState(idOfList)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    if (props.currentUser === null) {
        return <div/>
    }
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

        fetch(`http://localhost:3030/api/v1/recipes/${recipe.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                recipe: {
                    name,
                    description,
                    author: '',
                    cook_time: cookTime,
                    servings,
                    ingredients: ingredients,
                    steps: steps,
                    url: ''
                },
                list_id: listId,
                new_list_id: newListId
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

        history.push({
            pathname: `/recipes/${recipe.id}`,
            state: {
                listId: newListId,
                listName: user.lists.find(l => l.id === newListId).name
            }
        })

        // history.go(0)
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
                            value={newListId}
                            onChange={(e, list) => setNewListId(list.value)}
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
                                value={i}
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
                    {steps.map((s, idx) => (
                        <Form.Input 
                            key={idx}
                            value={s}
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
                            onClick={() => history.push(prevPage)}
                        >
                            Cancel
                        </Button>
                        <Button size='large' type='submit' color='yellow'>
                            Submit edits
                        </Button>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    )
}

export default EditRecipe;