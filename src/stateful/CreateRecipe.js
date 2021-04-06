import React, { useState } from 'react';
import { Button, Container, Divider, Form } from 'semantic-ui-react';

function CreateRecipe() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [servings, setServings] = useState('')
    const [ingredients, setIngredients] = useState([''])
    const [steps, setSteps] = useState([''])

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Field>
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
                <Form.Field widths='equal'>
                    <label>
                        Ingredients
                    </label>
                    <Form.Input/>
                    {ingredients.map((i, idx) => (
                        <Form.Input 
                            key={idx + 1}
                        />
                    ))}

                </Form.Field>
                <Button
                    onClick={() => setIngredients(...ingredients, '')}
                >
                    +
                </Button>
            </Form>
            <Divider/>
            <Button
                onClick={() => { console.log(ingredients) }}
            >log</Button>
        </Container>
    )
}


export default CreateRecipe;