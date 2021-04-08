import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Image, Menu, Modal, Table } from 'semantic-ui-react';
import { timeConvert, shortener } from './helpers.js'

export default function RecipeRow(props) {

    const [open, setOpen] = useState(false)
    const [activeList, setActiveList] = useState(null)

    const history = useHistory()

    function addDefaultSrc(e) {
        e.target.src = "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
    }

    const handleItemClick = (id) => {
        setActiveList(id)
    }

    // console.log(props.result)

    return (
        <Table.Row>
            <Table.Cell>
                <Image 
                    rounded
                    className="row-image" 
                    src={'https://spoonacular.com/recipeImages/' + props.result.image} 
                    alt={props.result.name} 
                    onError={addDefaultSrc}
                />
            </Table.Cell>
            <Table.Cell>
                <a 
                    href={props.result.url} 
                    target="_blank" 
                    rel="noreferrer"
                >
                    {shortener(props.result.name, 52)}
                </a>
            </Table.Cell>
            <Table.Cell>{timeConvert(props.result.time)}</Table.Cell>
            <Table.Cell>{props.result.servings}</Table.Cell>
            <Table.Cell>
                <Modal
                    closeIcon
                    size='small'
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button>Add</Button>}
                >
                    <Modal.Header>Select a list</Modal.Header>
                    <Modal.Content>
                        <Menu fluid vertical>
                            {props.user.lists.map(l => (
                                <Menu.Item
                                    key={l.id}
                                    onClick={() => handleItemClick(l.id)}
                                    active={activeList === l.id}
                                >
                                    {l.name}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            content="Add"
                            onClick={() => {
                                setOpen(false)
                                props.saveRecipe(props.result, activeList)
                                // history.push(`/lists/${activeList}`)
                            }}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
            </Table.Cell>
        </Table.Row>
    )
}