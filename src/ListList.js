import React, { useState } from 'react';
import { Container, Grid, Header, List } from 'semantic-ui-react';

function ListList(props) {

    // a list of lists (inside profile)

    const lists = props.user.lists
    console.log(lists);

    const [recipes] = useState(
        lists.map(l =>
            fetch(`http://localhost:3030/api/v1/lists/${l.id}/recipes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(data => data)

        )
    )

    

    return (
        <Container>
            <Header as='h2'>Lists:</Header>
            {/* <Grid >
                {lists.map(l => (
                    <Grid.Row key={l.id}>
                        <Grid.Column>
                            {console.log(l)}
                        <Header>
                            {l.name}
                        </Header>
                        <Container>
                            {l.description}
                        </Container>
                        <List>
                            {recipes.map(r => (
                                <List.Item key={r.id}>{r.name}</List.Item>
                            ))}
                            <List.Item>
                                - Ask API for ListRecipes, 
                            </List.Item>
                            <List.Item>
                                - Put first 3 recipes here
                            </List.Item>
                            <List.Item>
                                - Then a '+# more' if there are any more
                            </List.Item>
                            <List.Item>
                                +2 more
                            </List.Item>
                        </List>
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Grid> */}
        </Container>
    )
}

export default ListList;