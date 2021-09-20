import React, { Component } from 'react'
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BackupIcon from '@material-ui/icons/Backup';
import PrintIcon from '@material-ui/icons/Print';
import Autocomplete from '@material-ui/lab/Autocomplete';


const para = [
    { title: 'Current & approved BPR is used in Mfg.?' },
    { title: 'Correct, Released raw materials were used in manufacturing?' },
    { title: 'Batch Manufacturing & Packing control Records are properly completed?' },
    { title: 'Additional issue (if any) record is attached with BPR?' },
    { title: 'Copy of Dispensation request form (DRF) is attached (if any)?' },
    { title: 'Material return note is attached (if any)?' },
    { title: 'Material destruction note attached (if any)?' },
    { title: 'Product transfer note is attached?' },
    { title: 'Correct product was packaged?' },
    { title: 'Correct packaging components were used?' },
    { title: 'Labeling bears the correct Batch No. Manufacturing date and Expiry date?' },
    { title: 'Leaflet & stamped Label Samples are attached with the BPR?' },
    { title: 'Samples of finished pack saved as retaining samples?' },
    { title: 'Yields and wastages are within accepted levels otherwise with justification?' },
    { title: 'All results of in process & finished goods are complying the specifications?' },
    { title: 'Certificate of Analysis of finished product is attached?' },
];

const comp = [
    { title: 'Complies' },
    { title: 'Not Applicable' },
];

export default class batchReview extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //API
            show: false,

            choice: ["Yes", "No"],
            ch: ["Complete", "Partial"],

            selected: {

                choice: "",
                ch: "",
            },
        };
    }

    toggle = () =>
        this.setState((currentState) => ({ show: !currentState.show }));


    render() {
        var today = new Date()
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();



        const products_array = [
            // { id:1, sr: 1, verfparameter: 'Current & approved BPR is used in Mfg.?' },
        ];
        const columns = [
            {
                field: "sr",
                headerName: "Sr.",
                width: 105,
                editable: true,
            },
            {
                field: "verfparameter",
                headerName: "Verification Parameters",
                width: 555,
                editable: true,
            },
            {
                field: "compliance",
                headerName: "Compliance",
                width: 200,
                editable: true,
            },
        ];

        return (
            <div
                style={{
                    padding: "5px",
                    marginTop: "10px",
                    paddingLeft: "20px",
                }}
            >
                <GridContainer md={12}>
                    <Card>
                        <CardHeader
                            color="primary"
                            style={{
                                padding: "5px",
                                marginTop: "10px",
                                paddingLeft: "20px",
                            }}
                        >
                            <h2 style={{ textAlign: "center" }}>Batch Review</h2>
                        </CardHeader>
                        <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
                            <GridContainer>

                                <Card>
                                    <CardContent>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField id="date" fullWidth="true" defaultValue={date} variant="outlined" label={"Date: "}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={9}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Product:"
                                                    fullWidth="true"
                                                    select
                                                />
                                            </GridItem>
                                        </GridContainer>


                                        <GridContainer>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Batch No:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    select

                                                >
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Batch Size:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="MFG Date:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="EXP Date:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>

                                        </GridContainer>


                                        <GridContainer>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Packed:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Inprocess:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Percentage Yield:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    label="Batch Status:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true, }}

                                                >
                                                </TextField>
                                            </GridItem>

                                        </GridContainer>



                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Dispatch Permission"
                                                    fullWidth="true"
                                                    value={this.state.selected.choice}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                choice: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.choice.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={6}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Permitted Dispatch"
                                                    fullWidth="true"
                                                    value={this.state.selected.ch}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                ch: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.ch.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                        </GridContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={9}>
                                                <Autocomplete
                                                    id=""
                                                    options={para}
                                                    getOptionLabel={(option) => option.title}
                                                    renderInput={(params) => <TextField {...params} fullWidth="true" label="Parameter" variant="outlined" />}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <Autocomplete
                                                    id=""
                                                    options={comp}
                                                    getOptionLabel={(option) => option.title}
                                                    renderInput={(params) => <TextField {...params} fullWidth="true" label="Compliance" variant="outlined" />}
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                <div style={{ height: 450, width: "100%" }}>
                                                    <DataGrid
                                                        rows={products_array}
                                                        columns={columns}
                                                        checkboxSelection
                                                        disableSelectionOnClick
                                                    />

                                                    {/* <DataGrid
                                                        columns={[{ field: 'name' }]}
                                                        rows={[
                                                            { id: 1, name: 'React' },
                                                            { id: 2, name: 'Material-UI' },
                                                        ]}
                                                    /> */}
                                                </div>
                                            </GridContainer>
                                        </GridItem>
                                    </CardContent>
                                </Card>




                            </GridContainer>



                            <GridContainer>
                                <GridItem xs={12} sm={12} md={9}>
                                    <TextField
                                        id=""
                                        label="Remarks (if any):"
                                        fullWidth="true"
                                        multiline
                                        variant="outlined"

                                    >
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth="true"
                                        startIcon={<CloudUploadIcon />}


                                        onClick={this.toggle}

                                    >
                                        Post
                                    </Button>
                                </GridItem>

                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>


                {this.state.show && (
                    <div id="hide">
                        <div style={{ textAlign: "center", }}>
                            <span>Dated: {date}</span>
                            <h3 >Batch Review Certificate</h3>

                            <div>
                                <table style={{ textAlign: "left" }}>
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Product: </td>
                                        <u>
                                            <td>---</td>
                                        </u>
                                    </tr>

                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Batch No: </td>
                                        <u>
                                            <td>---</td>
                                        </u>
                                    </tr>

                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Batch Size: </td>
                                        <u>
                                            <td>---</td>
                                        </u>
                                    </tr>

                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Mfg Date: </td>
                                        <u>
                                            <td>---</td>
                                        </u>
                                    </tr>

                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Exp Date: </td>
                                        <u>
                                            <td>---</td>
                                        </u>
                                    </tr>

                                </table>
                            </div>


                            <p style={{ textAlign: "left" }}>Checklist of review points:</p>
                            <table style={{ borderCollapse: "collapse" }} >
                                <tr style={{ border: "1px solid black", color: "#234564" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >Sr. </td>
                                    <th style={{ border: "1px solid black", width: "700px" }} >Verification Parameters</th>
                                    <th style={{ border: "1px solid black", width: "200px" }} >Compliance</th>

                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >1. </td>
                                    <th style={{ border: "1px solid black", width: "700px" }} >...</th>
                                    <th style={{ border: "1px solid black", width: "200px" }} >...</th>

                                </tr>

                            </table>

                            <br />

                            <div>
                                <table>
                                    <tr style={{ backgroundColor: "#ADA9A8" }}>
                                        <td style={{ fontWeight: "bold", border: "1px solid black" }}>Batch Status: </td>
                                        <td style={{ fontWeight: "bold", textAlign: "center", width: "900px" }}> ... </td>
                                    </tr>
                                </table>
                            </div>

                            <p style={{ textAlign: "left" }}>Batch processing record has been reviewed for the parameters given above.:</p>

                            <div>
                                <table>
                                    <tr style={{ backgroundColor: "#ADA9A8" }}>
                                        <td style={{ fontWeight: "bold", border: "1px solid black", textAlign: "left" }}>Dispatch Permission: </td>
                                        <td style={{ fontWeight: "bold", textAlign: "center", width: "845px" }}> ... </td>
                                    </tr>
                                </table>
                            </div>
                            
                            
                            <br />
                            <div>
                                <table>
                                    <tr>
                                        <td style={{ fontWeight: "bold", }}>Remarks: </td>
                                        <td style={{ textAlign: "left", width: "900px" }}> ... </td>
                                    </tr>
                                </table>
                            </div>

                            <br />

                            <table style={{ borderCollapse: "collapse" }} >
                                <tr style={{ border: "1px solid black", color: "#234564" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >Sr. </td>
                                    <th style={{ border: "1px solid black", width: "900px" }} >Closed NCRs</th>

                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >1. </td>
                                    <th style={{ border: "1px solid black", width: "900px" }} >...</th>

                                </tr>
                            </table>
                            
                            <br />

                            
                            <table style={{ borderCollapse: "collapse" }} >
                                <tr style={{ border: "1px solid black", color: "#234564" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >Sr. </td>
                                    <th style={{ border: "1px solid black", width: "900px" }} >Closed Batch Deviation</th>

                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                    <td style={{ border: "1px solid black", width: "100px" }} >1. </td>
                                    <th style={{ border: "1px solid black", width: "900px" }} >...</th>

                                </tr>
                            </table>

                            <br />
                            <br />


                            <div style={{ display: "flex" }}>
                                <div style={{ textAlign: "left", marginRight: "800px" }}>
                                    <p><span><strong>QA Officer:</strong></span></p>__________________
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p><span><strong>QA Manager:</strong></span></p>___________________
                                </div>
                            </div>
                        </div>

                    </div>
                )}



            </div>
        );
    }
}
