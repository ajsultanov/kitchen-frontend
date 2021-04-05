import React from 'react';
import { Card, Icon, Image, Segment} from 'semantic-ui-react';

export default function RecipeList(props) {

    // a list of recipes (inside a list)

    // props.recipes.map(r => (
    return (
        <Card>
            <Image/>
            <Card.Content>
                <Card.Header>Recipe Name</Card.Header>
                <Card.Meta>Recipe Description</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Segment.Group horizontal>
                    <Segment>
                        <Icon name='clock outline'/>15 minutes
                    </Segment>
                    <Segment>
                        <Icon name='food'/>2 servings
                    </Segment>
                </Segment.Group>
            </Card.Content>
        </Card>
    )
    // ))
}



