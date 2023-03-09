import React, { useEffect } from "react";
import { useState } from "react";
import { DateRangePicker } from "react-dates";
import { Container, Dropdown, Grid, Segment, Input, Form } from "semantic-ui-react";
import moment from "moment";
import RestaurantData from './RestaurantData.json';

async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache"
    });
    return response.json();
}

async function postData(url="", data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return response.json();
    } else {
        throw response.json();
    }
}

function InputParameters() {
    const restaurantData = RestaurantData.map( d =>{
    return ({
        key: d.Id,
        value: d.Name,
        text: d.Name
    })
}
)
//console.log('data', RestaurantData)
    const timeOptions = [
        {key: 1, text: '5 a.m.', value: 5},
        {key: 2, text: '6 a.m.', value: 6},
        {key: 3, text: '7 a.m.', value: 7},
        {key: 4, text: '8 a.m.', value: 8},
        {key: 5, text: '9 a.m.', value: 9},
        {key: 6, text: '10 a.m.', value: 10},
        {key: 7, text: '11 a.m.', value: 11},
        {key: 8, text: '12 p.m.', value: 12},
        {key: 9, text: '1 p.m.', value: 13},
        {key: 10, text: '2 p.m.', value: 14},
        {key: 11, text: '3 p.m.', value: 15},
        {key: 12, text: '4 p.m.', value: 16},
        {key: 13, text: '5 p.m.', value: 17},
        {key: 14, text: '6 p.m.', value: 18},
        {key: 15, text: '7 p.m.', value: 19},
        {key: 16, text: '8 p.m.', value: 20},
        {key: 17, text: '9 p.m.', value: 21},
        {key: 18, text: '10 p.m.', value: 22},
        {key: 19, text: '11 p.m.', value: 23},
        {key: 20, text: '12 a.m.', value: 24},
        {key: 21, text: '1 a.m.', value: 25},
        {key: 22, text: '2 a.m.', value: 26},
        {key: 23, text: '3 a.m.', value: 27},
        {key: 24, text: '4 a.m.', value: 28},
        {key: 25, text: '5 a.m. next day', value: 29},
        {key: 26, text: '6 a.m. next day', value: 30},
        {key: 27, text: '7 a.m. next day', value: 31},
    ]

    const compareOptions = [
    { 
    key: 1,
    text: '=',
    value: 'Equal' 
    },
    { 
    key: 2,
    text: '<=',
    value: 'LessThanOrEqual' 
    },
    { 
    key: 3,
    text: '<',
    value: 'LessThan' 
    },
    { 
    key: 4,
    text: '>',
    value: 'GreaterThan' 
    },
    { 
    key: 5,
    text: '>=',
    value: 'GreaterThanOrEqual' 
    },
    ]

    const [fromTime, setFromTime] = useState(5);
    const [toTime, setToTime] = useState(29)

    const [metric, setMetric] = useState(null)
    const [compare, setCompare] = useState(null)

    const [restaurantIds, setRestaurantIds] = useState([]);
    const [startDate, setStartDate] = useState(moment("3-1-2023"));
    const [endDate, setEndDate] = useState(moment("3-21-2023"));
    const [focusedInput, setFocusedInput] = useState(null);
    const [metricDefinitions, setMetricDefinitions] = useState([]);


    useEffect(() => {
        getData("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
        .then(data => {
            setMetricDefinitions(data)
        })
    }, []);


    const metricOptions = metricDefinitions.map( m => {
        return ({
            key: m.metricCode,
            value: m.metricCode,
            text: m.alias
        })
    });

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
                                    <Form>

                                        <Form.Field>
                                            <h3>Restaurant</h3>
                                            <Dropdown
                                                placeholder='Select restaurant...'
                                                fluid
                                                multiple
                                                selection
                                                options={restaurantData}
                                                value={restaurantIds}
                                                onChange={(e, data) => setRestaurantIds(data.value)}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <h1>Metrics</h1>
                                            <Dropdown
                                                placeholder='Select metric...'
                                                fluid
                                                selection
                                                options={metricOptions}
                                                value={metric}
                                                onChange={(e, data) => setMetric(data.value)}
                                            />

                                            <Dropdown
                                                placeholder='...'
                                                fluid
                                                selection
                                                options={compareOptions}
                                                value={compare}
                                                onChange={(e, data) => setCompare(data.value)}
                                            />

                                            <Input
                                                placeholder="Quantity"
                                            />

                                            <Input
                                                placeholder="Result"
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <h3>From</h3>
                                            <Dropdown
                                                placeholder='Start time...'
                                                fluid
                                                multiple
                                                selection
                                                options={timeOptions}
                                                //options={restaurantData}
                                                value={fromTime}
                                                onChange={(e, data) => setFromTime(data.value)}
                                            />
                                            <h3>To</h3>
                                            <Dropdown
                                                placeholder='End time...'
                                                fluid
                                                multiple
                                                selection
                                                options={timeOptions}
                                                //options={restaurantData}
                                                value={toTime}
                                                onChange={(e, data) => setToTime(data.value)}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <h3>Date range</h3>
                                            <DateRangePicker
                                                startDate={startDate}
                                                startDateId="your_unique_start_date_id"
                                                endDate={endDate}
                                                endDateId="your_unique_end_date_id"
                                                onDatesChange={({ startDate, endDate }) => {
                                                    setStartDate(startDate);
                                                    setEndDate(endDate)
                                                    }
                                                }
                                                focusedInput={focusedInput}
                                                onFocusChange={ focusedInput => setFocusedInput(focusedInput)}
                                            />
                                        </Form.Field>

                                    </Form>
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