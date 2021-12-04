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
import RM_New_Formulation from "../../Services/QA/RM_New_Formulation"
import PrintIcon from '@material-ui/icons/Print';
import { ControlCameraOutlined } from '@material-ui/icons';

import {
	NCRNoList,
	ProductCode,
	CategoriesList,
	HighestNCR,
	AllUsers,
	SubCategories,
	BatchNo,
	NCR,
} from "../../Services/QA/NCR";
export default class NonConformance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            //API
            depttList: ["Capsule", "Dry Syrup", "Oral Liquid", "QC", "QA", "Stores", "Workshop", "General", "Packing", "Tablet-G", "Tablet-H"],
            identityList: ["Self-Inspection", "Internal Audit", "Customer Complaint", "Test Result", "External Audit", "Regulatory Inspection", "In-process Inspection", "Others"],
            ncList: ["Known", "Potential"],
            gncList: ["Critical", "Non-Critical", "Observation"],
            solList: ["Correct Problem", "Reject/Destroy", "Accept with Concession"],
            actList: ["Yes", "No"],
            dept: "",
            identity: "",
            nc: "",
            sol: "",
            act: "",
            gnc: "",
            ncrNo: '',
            auditorList: [],
            auditor: '',
            refNo: '',
            catList: [],
            cat: '',
            subCatList: [],
            subCat: '',
            desc: '',
            action: '',
            openDate: '',
            date: '',
            varifiedList: [],
            varified: '',
            rootCause: '',
            proposedAction: '',
            actionTaken: '',
            productList: [],
            product: '',
            batchList: [],
            batch: '',
            ncrForPrint: '',
            ncrForPrintList: [],
        };
    }
    async componentDidMount() {
        const ncrFPL = (await NCRNoList()).data;
        this.setState({ncrForPrintList: ncrFPL})
        const pc = (await ProductCode()).data;
        this.setState({productList: pc})
        const catL = (await CategoriesList()).data;
        this.setState({catList: catL})
        const highNC = (await HighestNCR()).data;
        this.setState({ncrNo: highNC})
        const allU = (await AllUsers()).data;
        this.setState({varifiedList: allU})
        this.setState({auditorList: allU})
        const today = new Date();
        const date =
            today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear();
        this.setState({openDate: date})
    }
    async handleCat(cat) {
        const sub = (await SubCategories(cat)).data;
        this.setState({subCatList: sub}, console.log("sub: ", sub))
    }
    async handleProd(pro) {
        const batch = (await BatchNo(pro)).data;        
        this.setState({batchList: batch}, console.log("batch: ", batch))
    }
    async handlePost(props) {
       if(this.state.auditor==="" ||
            this.state.deptt==="" ||
            this.state.identity==="" ||
            this.state.refNo==="" ||
            this.state.natureOfNC==="" ||
            this.state.gradeOfNC==="" ||
            this.state.cat==="" ||
            this.state.subCat==="" ||
            this.state.desc==="" ||
            this.state.sol==="" ||
            this.state.act==="" ||
            this.state.action==="" ||
            this.state.opneDate==="" ||
            this.state.date==="" ||
            this.state.varified==="" ||
            this.state.rootCause===""
            ) {
                alert("Please fill the form first!")
                return;
            }
            
        let chek = this.state.show===true ? false : true;
            
        const req = {
            "status": "OPEN",              // send "OPEN" everytime
            "originator": this.state.auditor,          
            "section": this.state.deptt,             
            "sourceOfIdentification": this.state.identity,
            "refNo": this.state.refNo,
            "natureOfNC": this.state.natureOfNC,
            "gradeOfNC": this.state.gradeOfNC,
            "category": this.state.cat,
            "subCategory": this.state.subCat,
            "descriptionOFNonConformance": this.state.desc,
            "solutionOfCurrentProblem": this.state.sol,
            "immediateAction": this.state.act,         // text field next to "solutionOfCurrentProblem" 
            "isActionTaken": true,               // True for checked and vice versa
            "actionDate": "2021-09-03",          
            "closingDate": "2021-09-06",         // send Todays Date everytime
            "verifiedBy": this.state.varified,
            "isLimitAction": chek,
            "rootCause": this.state.rootCause,
            "proposedCorrectiveAction": this.state.proposedAction,
            "actionTaken": this.state.actionTaken,
            "batchNo": this.state.batchNo,
        }
        await (NCR.methods.NCR(req));
    }

    toggle = () =>
        this.setState((currentState) => ({ show: !currentState.show }));


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
                            <h2 style={{ textAlign: "center" }}>Non Conformance</h2>
                        </CardHeader>
                        <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
                            <GridContainer>

                                <Card>
                                    <CardHeader color="info">
                                        <h4 >Basic Information</h4>
                                    </CardHeader>
                                    <CardContent>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField id="date" fullWidth="true" InputProps={{ readOnly: true, }} defaultValue={date} variant="outlined" label={"Date: "}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="NCR No:"
                                                    fullWidth="true"
                                                    InputProps={{readOnly: true}}
                                                    value={this.state.ncrNo.NCRNo}                                                    
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Originator/Auditor:"
                                                    fullWidth="true"
                                                    select
                                                    value={this.state.auditor}
                                                    onChange={(event) => {
                                                        this.setState({auditor: event.target.value});
                                                    }}
                                                >
                                                    {this.state.auditorList.map((pri) => (
                                                        <MenuItem key={pri.username} value={pri.username}>
                                                            {pri.username}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Section/Deptt"
                                                    fullWidth="true"
                                                    value={this.state.deptt}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({deptt: event.target.value});
                                                    }}
                                                >
                                                    {this.state.depttList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Source of Identification:"
                                                    fullWidth="true"
                                                    value={this.state.identity}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({identity: event.target.value})
                                                    }}
                                                >
                                                    {this.state.identityList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Reference No:"
                                                    fullWidth="true"
                                                    value={this.state.refNo}
                                                    onChange={(event)=>{
                                                        this.setState({refNo: event.target.value});
                                                    }}
                                                />
                                            </GridItem>

                                        </GridContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader color="danger">
                                        <h4>Nature of NonConformance</h4>
                                    </CardHeader>
                                    <CardContent>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Nature of NC:"
                                                    fullWidth="true"
                                                    value={this.state.nc}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({nc: event.target.value})
                                                    }}
                                                >
                                                    {this.state.ncList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Grade of NC:"
                                                    fullWidth="true"
                                                    value={this.state.gnc}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({gnc: event.target.value});
                                                    }}
                                                >
                                                    {this.state.gncList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Category:"
                                                    fullWidth="true"
                                                    select
                                                    value={this.state.cat}
                                                    onChange={(event) => {
                                                        this.setState({cat: event.target.value});
                                                        this.handleCat(event.target.value)
                                                    }}
                                                >
                                                    {this.state.catList.map((pri) => (
                                                        <MenuItem key={pri.category} value={pri.category}>
                                                            {pri.category}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>                                                
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Sub-Category"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    value={this.state.subCat}
                                                    onChange={(event) => {
                                                        this.setState({subCat: event.target.value});
                                                    }}
                                                >
                                                    {this.state.subCatList.map((pri) => (
                                                        <MenuItem key={pri.subCategory} value={pri.subCategory}>
                                                            {pri.subCategory}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Product:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    value={this.state.product}
                                                    onChange={(event) => {
                                                        this.setState({product: event.target.value});
                                                        this.handleProd(event.target.value);
                                                    }}
                                                >
                                                    {this.state.productList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Batch No:"
                                                    select
                                                    fullWidth="true"
                                                    selectvalue={this.state.batch}
                                                    onChange={(event) => {
                                                        this.setState({batch: event.target.value});
                                                    }}
                                                >
                                                    {this.state.batchList.map((pri) => (
                                                        <MenuItem key={pri.batchNo} value={pri.batchNo}>
                                                            {pri.batchNo}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                        </GridContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader color="warning">
                                        <h4>A- Details of Non-Conformance</h4>
                                    </CardHeader>
                                    <CardContent>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    style={{ width: "100%" }}
                                                    label="Description of Non-Conformance"
                                                    multiline
                                                    variant="outlined"
                                                    value= {this.state.desc}
                                                    onChange={(event)=>{
                                                        this.setState({desc: event.target.value})
                                                    }}
                                                />

                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Sol. of Current Problem:"
                                                    fullWidth="true"
                                                    value={this.state.sol}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({sol: event.target.value});
                                                    }}
                                                >
                                                    {this.state.solList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    style={{ width: "100%" }}
                                                    label="Immediate Action"
                                                    multiline
                                                    variant="outlined"
                                                    value={this.state.sol}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({sol: event.target.value});
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Action Taken"
                                                    fullWidth="true"
                                                    value={this.state.act}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState({act: event.target.value});
                                                    }}
                                                >
                                                    {this.state.actList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <TextField
                                                    id=""
                                                    label="Date:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    value={this.state.date}
                                                    onChange={(event)=>{
                                                        this.setState({date: event.target.value})
                                                    }}
                                                >

                                                </TextField>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Verified by:"
                                                    fullWidth="true"
                                                    select
                                                    value={this.state.varified}
                                                    onChange={(event) => {
                                                        this.setState({varified: event.target.value});
                                                    }}
                                                >
                                                    {this.state.varifiedList.map((pri) => (
                                                        <MenuItem key={pri.username} value={pri.username}>
                                                            {pri.username}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <FormControlLabel
                                                    control={<Checkbox color="primary" />}
                                                    label="Limit NC to Immediate Actions Only"
                                                    onChange={this.toggle}
                                                />
                                            </GridItem>

                                        </GridContainer>
                                    </CardContent>
                                </Card>
                            </GridContainer>
                            {this.state.show && (
                                <div id="hide">
                                    <Card>
                                        <CardHeader color="success">
                                            <h4>B- Corrective and Preventive Actions</h4>
                                        </CardHeader>
                                        <CardContent>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField
                                                        id=""
                                                        style={{ width: "100%" }}
                                                        label="Root Cause"
                                                        multiline
                                                        variant="outlined"
                                                        value={this.state.rootCause}
                                                        onChange={(event)=>{
                                                        this.setState({rootCause: event.target.value})
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField
                                                        id=""
                                                        style={{ width: "100%" }}
                                                        label="Proposed Corrective Action"
                                                        multiline
                                                        variant="outlined"
                                                        value={this.state.proposedAction}
                                                        onChange={(event)=>{
                                                        this.setState({proposedAction: event.target.value})
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField
                                                        id=""
                                                        style={{ width: "100%" }}
                                                        label="Action Taken"
                                                        multiline
                                                        variant="outlined"
                                                        value={this.state.actionTaken}
                                                        onChange={(event)=>{
                                                        this.setState({actionTaken: event.target.value})
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}




                            <Card>
                                <CardContent>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth="true"
                                                startIcon={<BackupIcon />}
                                                onClick={(event)=>{
                                                    this.handlePost();
                                                }}
                                            >
                                                Post
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <TextField
                                                id=""
                                                label="Print NCR No"
                                                variant="outlined"
                                                fullWidth="true"
                                                select
                                                value={this.state.ncrForPrint}
                                                onChange={(event) => {
                                                    this.setState({ncrForPrint: event.target.value});
                                                }}
                                            >
                                                {this.state.ncrForPrintList.map((pri) => (
                                                    <MenuItem key={pri.NCRNo} value={pri.NCRNo}>
                                                        {pri.NCRNo}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<PrintIcon />}
                                                fullWidth="true"

                                            >
                                                Print
                                            </Button>
                                        </GridItem>

                                    </GridContainer>
                                </CardContent>
                            </Card>

                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }
}
