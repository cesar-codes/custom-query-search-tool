import React from "react";
import { useState } from "react";
import { Container, Dropdown, Grid, Segment } from "semantic-ui-react";


function InputParameters() {
    const options = [
          { key: 1, text: 'Restaurant 1', value: 1 },
          { key: 2, text: 'Restaurant 2', value: 2 }
    ];

    const [restaurantIds, setRestaurantIds] = useState([]);

    return (
        <Grid>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Container className="Container">
                        <Segment className="Segment">
                            <Grid centered>
                                <Grid.Row columns="1">
                                    <Grid.Column textAlign="center">
                                        <h2>Custom Search Query Tool</h2>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Dropdown
                                        placeholder='Select restaurant...'
                                        fluid
                                        multiple
                                        selection
                                        options={options}
                                        value={restaurantIds}
                                        onChange={(e, data) => setRestaurantIds(data.value)}
                                    />
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default InputParameters;
