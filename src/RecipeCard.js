import { Link, useLocation } from 'react-router-dom';
import { Card, Icon, Image, Rating, Segment} from 'semantic-ui-react';
import { timeConvert, shortener, createDescription } from './helpers';

function RecipeCard(props) {

    const location = useLocation()
    const recipe = props.recipe

    return (
        <Card as={Link}
            to={{
                pathname: `/recipes/${recipe.id}`,
                state: { 
                    fromLocation: location,
                    listName: props.list.name,
                    listId: props.list.id
                }
            }}
        >
            <Image 
                size='tiny' 
                src='https://images.unsplash.com/photo-1572441713132-c542fc4fe282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80'
            />
            <Card.Content>
                <Card.Header>
                    {recipe.name}
                    &nbsp;
                    <Rating icon='star' defaultRating={3} maxRating={5}/>
                </Card.Header>
                <Card.Meta>
                    <p 
                        dangerouslySetInnerHTML={
                            createDescription(
                                shortener(recipe.description, 118)
                            )
                        }
                    />
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Segment.Group horizontal>
                    <Segment>
                        <Icon name='clock outline'/>{timeConvert(recipe.cook_time)}
                    </Segment>
                    <Segment>
                        <Icon name='food'/>{recipe.servings} servings
                    </Segment>
                </Segment.Group>
            </Card.Content>
        </Card>
    )
}

export default RecipeCard;