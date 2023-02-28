import React from "react";
import { useState, useEffect } from "react";
import { Container, Dropdown, Grid, Segment } from "semantic-ui-react";
import data from './RestaurantData.json'
// const getData = () => {
//     fetch('RestaurantData.json'
//     ,{
//         headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }
//     }
//     )
//     .then(function(response){
//         console.log(response)
//         return response.json();
//       })
//       .then(function(myJson) {
//         console.log(myJson);
//       });
//   }
//   useEffect(()=>{
//     getData()
//   },[])





function InputParameters() {
    const resaurantData = data.map( (data) =>{
    console.log(data)
}
)
    const options = [resaurantData
        //   { key: 1, text: 'Restaurant 1', value: 1 },
        //   { key: 2, text: 'Restaurant 2', value: 2 }
    ];

    const [restaurantIds, setRestaurantIds] = useState([]);
    console.log(data)
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
                                    <Grid.Column textAlign="center">
                                        <h3>Restaurant</h3>
                                    </Grid.Column>
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

                                <Grid.Row>
                                    <Grid.Column textAlign="center">
                                        <h3>Time</h3>
                                    </Grid.Column>
                                    <Dropdown
                                        placeholder='Select time range...'
                                        fluid
                                        multiple
                                        selection
                                        options={options}
                                        value={restaurantIds}
                                        onChange={(e, data) => setRestaurantIds(data.value)}
                                    />
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column textAlign="center">
                                        <h3>Metrics</h3>
                                    </Grid.Column>
                                    <Dropdown
                                        placeholder='Select metrics...'
                                        fluid
                                        multiple
                                        selection
                                        options={options}
                                        value={restaurantIds}
                                        onChange={(e, data) => setRestaurantIds(data.value)}
                                    />
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column textAlign="center">
                                        <h3>Dates</h3>
                                    </Grid.Column>
                                    <Dropdown
                                        placeholder='Select date range...'
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
