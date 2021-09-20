import React, { Component } from 'react'
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";


export default class RMSamplingLog extends Component {

    render() {
        var today = new Date();
        let date =
            today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear();

        return (
            <div
                style={{
                   
                    marginTop: "50px",
                   
                }}
            >
                <GridContainer md={12}>
                    <Card>
                        <CardHeader
                            color="primary"
                            
                        >
                            <h2><center>Raw Material- Sampling Log</center> </h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField id="date" fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" label="Date" value={date}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="GRN No:"
                                                    select
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Material:"
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Code:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Mfg Date:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Exp Date:"
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Batch/Lot:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Supplier:"
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Quantity:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Unit:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="No. of Containers:"
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="QC No:"
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Delivered by:"
                                                    select
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    label="Received by:"
                                                    select
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <Button
                                                    className=""
                                                    color="primary"
                                                    fullWidth="true"
                                                >
                                                    Receive Sample
                                                </Button>
                                            </GridItem>

                                        </GridContainer>

                                    </CardContent>
                                </Card>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }
}
