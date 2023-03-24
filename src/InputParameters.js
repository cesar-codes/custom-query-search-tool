/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { DateRangePicker } from "react-dates";
import { Container, Dropdown, Grid, Segment, Input, Form, Button, Table, Tab, Pagination } from "semantic-ui-react";
import moment from "moment";
import RestaurantData from './RestaurantData.json';

async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET",
        cache: "no-cache"
    });
    return response.json();
}

// API url=("https://customsearchquerytoolapi.azurewebsites.net/Search/Query")
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
        value: d.Id,
        text: d.Name
    })
}
)

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

    const compareDefinitions = [
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


    //State variables
    const [fromTime, setFromTime] = useState(5);
    const [toTime, setToTime] = useState(10)

    const [compare, setCompare] = useState('GreaterThan')

    const [transactionData, setTransactionData] = useState([]);

    const [restaurantIds, setRestaurantIds] = useState([1]);
    const [startDate, setStartDate] = useState(moment("10-1-2021"));
    const [endDate, setEndDate] = useState(moment("10-31-2021"));
    const [focusedInput, setFocusedInput] = useState(null);
    const [metricDefinitions, setMetricDefinitions] = useState([]);
    const [metric, setMetric] = useState('netAmount')
    const [metricCriteria, setMetricCriteria] = useState([
        {
            metricCode: "",
            compareType: "",
            value: ""
        }

    ])

    const [activePage, setActivePage] = useState(1)
    
    const [rows, setRows] = useState(
        [<Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>]
            )
    console.log('transactionData', transactionData)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        //console.log(findRestaurantName(3));
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

    const compareOptions = compareDefinitions.map( c => {
        return  ({
            key: c.key,
            text: c.text,
            value: c.value
        })
    })
    
     console.log('metricOptions', metricOptions)
    // console.log('compareOptions', compareOptions)
    const submitForm = () => {

            const inputParameters = {
                restaurantIds: restaurantIds,
                 fromDate: startDate,
                 toDate: endDate,
                 fromHour: fromTime,
                 toHour: toTime,
                 metricCriteria: metricCriteria.map(m => {
                    return(
                        {
                        metricCode: m.metric,
                        compareType: m.compare,
                        value: Number(m.value)
                     }
                    )
                 })
                 
            }
            //console.log('restaurantIds', inputParameters.restaurantIds)
                postData("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", inputParameters)
                .then(data => {
                    setTransactionData(data)
                })
            

            //console.log('inputParameters', inputParameters)
          }

          function setMetricCriteriaHelper(index, propertyName, propertyValue) {

            const metricCriteriaOrig = [...metricCriteria];

            metricCriteriaOrig[index][propertyName] = propertyValue;

            setMetricCriteria(metricCriteriaOrig)
            console.log('metricCriteriaOrig', metricCriteriaOrig)
          }

        
          function addMetricCriteria () {

            const metricCriteriaOld = [...metricCriteria];

            metricCriteriaOld.push({
                metricCode: "",
                compareType: "",
                value: ""
            })
            setMetricCriteria(metricCriteriaOld)
            console.log('metricCriteriaOld', metricCriteriaOld)
        }


          function FixFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
            }

            const slicedDate = transactionData
            const slicedData = transactionData.slice((activePage - 1) * 20, activePage * 20 - 1) 

    // metricCode helper function
    console.log('metricDefinitions', metricDefinitions)
    function findRestaurantName(restaurantId) {
        const restaurant = RestaurantData.find(r => r.Id === restaurantId);

        return restaurant.Name;
    }

    console.log('metricCriteria', metricCriteria);
    //console.log('data', RestaurantData[0].Name)

    // transactionData helper function(s)
    function formatDollars (transactionData) {
        const amount = transactionData.map (a => {

            a.totalAmount = '$' + a.totalAmount 
        })
    }

    function formatMetrics (value, dataType, decimals) {
        if (dataType === 'Money') {
            return '$' + value.toFixed(decimals)
        }
        else if (dataType === "Percent") {
            return value.toFixed(decimals) * 100 + '%'
        }
        else if (dataType === 'Number') {
            return value.toFixed(decimals)
        }
    }
    
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
                                    <Form onSubmit={() => submitForm()}>

                                        <Form.Field>
                                            <h4>Restaurant</h4>
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
                                            <h4>Metrics</h4>
                                            {metricCriteria.map((m, index) => {
                                                return(
                                                    <Form.Field>
                                                    <Dropdown
                                                        placeholder='Select metric...'
                                                        fluid
                                                        selection
                                                        options={metricOptions}
                                                        value={m.metric}
                                                        onChange={(e, data) => setMetricCriteriaHelper(index, 'metric', data.value)}
                                                    />

                                                    <Dropdown
                                                        placeholder='...'
                                                        fluid
                                                        selection
                                                        options={compareOptions}
                                                        value={m.compare}
                                                        onChange={(e, data) => setMetricCriteriaHelper(index, 'compare', data.value)}
                                                    />

                                                    <Input
                                                        placeholder="value"
                                                        value={m.inputValue}
                                                        onChange={(e, data) => setMetricCriteriaHelper(index, 'inputValue', data.value)}
                                                    />
                                            </Form.Field>
                                                )
                                            })}
                                            
                                        </Form.Field>

                                        <Form.Field>
                                            <h4>Time Range</h4>
                                            <Dropdown
                                                placeholder='Start time...'
                                                fluid
                                                selection
                                                options={timeOptions}
                                                //options={restaurantData}
                                                value={fromTime}
                                                onChange={(e, data) => setFromTime(data.value)}
                                            />
                                           
                                            <Dropdown
                                                placeholder='End time...'
                                                fluid
                                                selection
                                                options={timeOptions}
                                                //options={restaurantData}
                                                value={toTime}
                                                onChange={(e, data) => setToTime(data.value)}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <h4>Date range</h4>
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
                                                isOutsideRange={(day) => {
                                                            if (day >= moment("2021-10-01") && day <= moment("2021-10-26")) {
                                                                return false;
                                                            } else {
                                                                return true;
                                                            }
                                                        }}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <Button color="green" type="submit" >
                                                Submit
                                            </Button>
                                        </Form.Field>

                                    </Form>
                                </Grid.Row>
                                <Grid.Row>
                                    {/* <h4>
                                    Results
                                    </h4> */}
                                    <Button onClick={() => addMetricCriteria()}  color="red">
                                        Add additional criteria
                                    </Button>
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    Restaurant Name
                                                </Table.HeaderCell>
                                                <Table.HeaderCell>
                                                    Order Date
                                                </Table.HeaderCell>
                                                {metricDefinitions.map(m => {
                                                    return <Table.HeaderCell>
                                                        {m.alias}
                                                    </Table.HeaderCell>
                                                })}

                                            </Table.Row>
                                        </Table.Header>
                                        
                                        <Table.Body>
                                            
                                            {slicedData.map( t => {
                                                return <Table.Row>
                                                <Table.Cell>
                                                    {findRestaurantName(t.restaurantId).slice(15)}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {moment(t.busDt).format('YYYY-MM-DD')}
                                                </Table.Cell>
                                                {metricDefinitions.map(m => {
                                                    return <Table.Cell>
                                                        {formatMetrics(t[FixFirstLetter(m.metricCode)], m.dataType, m.decimalPlaces )}
                                                    </Table.Cell>
                                                })}
                                                    </Table.Row>
                                            })}
                                        </Table.Body>
                                        
                                    </Table>
                                    {/* Todo Link Pagination to results */}
                                    {/* 1. Total pages, 2. State variable ..[0-19...] using slice*/}
                                    <Pagination 
                                    activePage={activePage}
                                    onPageChange={(e, data) => setActivePage(data.activePage)}
                                    totalPages={ Math.ceil(transactionData.length / 20) } />
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