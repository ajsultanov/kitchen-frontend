import { Card } from 'semantic-ui-react';

function ListCard(props) {

    const list = props.list

    return (
        <Card
            onClick={e => props.handleOnClick(e, list)}
        >
            <Card.Content>
                <Card.Header>
                    {list.name}
                </Card.Header>
                <Card.Description>
                    {list.description}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                {list.length} recipes
            </Card.Content>
        </Card>
    )
}

export default ListCard;