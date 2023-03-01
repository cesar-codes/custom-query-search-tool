import React, { useEffect } from "react";
import { useState } from "react";
import { DateRangePicker } from "react-dates";
import { Container, Dropdown, Grid, Segment } from "semantic-ui-react";
import moment from "moment";
import data from './RestaurantData.json';

async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache"
    });
    return response.json();
}

function InputParameters() {
    const resaurantData = data.map( (data) =>{
    //console.log(data)
}
)
    const options = [resaurantData
        //   { key: 1, text: 'Restaurant 1', value: 1 },
        //   { key: 2, text: 'Restaurant 2', value: 2 }
    ];
    
    const [restaurantIds, setRestaurantIds] = useState([]);
    const [startDate, setStartDate] = useState(moment("3-1-2023"));
    const [endDate, setEndDate] = useState(moment("3-21-20203"));
    const [focusedInput, setFocusedInput] = useState(null);
    const [metricDefinitions, setMetricDefinitions] = useState([]);

    console.log("Start Date", startDate)
    console.log("End Date", endDate)

    useEffect(() => {
        getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
        .then(data => {
            setMetricDefinitions(data)
        })
    }, []);

    console.log("metricDefinitions:", metricDefinitions)

    const metricOptions = metricDefinitions.map( m => {
        return ({
            key: m.metricCode,
            value: m.metricCode,
            text: m.alias
        })
    });



    //const [restaurantIds, setRestaurantIds] = useState([]);
    //console.log(data)
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
