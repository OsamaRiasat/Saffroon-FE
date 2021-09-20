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
import Change_Control from "../../Services/QA/Change_Control.js"


export default class ChangeControl extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //API
            dept: ["Capsule", "Dry Syrup", "Oral Liquid", "Tablet", "Quality Control", "Quality Assurance", "Production", "Raw Material St", "Packing Material", "Finished Goods", "Engineering"],
            nc: ["Temporary", "Potential"],
            kw: ["Caping", "Coating", "Color", "Cracking", "DRF", "Drying", "DT", "Formula", "Friability", "Granulation", "Hardness", "LOD", "Lubrication", "Mesh", "pH", "Reprocessing", "Shelf-Life", "Specification", "Sticking", "Sweetness", "Wastage", "WeightVar"],
            cat: ["Product Formulation", "Process", "Machinery", "Supplier", "Infrastructure", "Others",],
            des: ["Approved", "Rejected"],
            
            selected: {
                dept: "",
                nc: "",
                kw: "",
                cat: "",
                des: "",
            },
            
            ccn: '',
            initiator: '',
            product: '',
            productList: [],
            batchNo: '',
            name: '',
            related: '',
            desc: '',
            purpose: '',
            commentsPM: '',
            commentsQC: '',
            commentsPD:'',
            commentsQA: '',
            date: '',
        };
    }
    async componentDidMount() {
        var today = new Date();
        let date =
            today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear();
        this.setState({date: date})
        const hccn = (await Change_Control.methods.HighestCCNo()).data;
        console.log(hccn);
        this.setState({ccn: hccn.CCNo})
        const pl = (await Change_Control.methods.ProductCode()).data;
        console.log(pl);
        this.setState({productList: pl})
    }
    
    async handleProd(pro) {
        const batch = (await Change_Control.methods.BatchNo(pro)).data;
        this.setState({batchNo: batch.batchNo})
    }
    
    async handlePost() {
    try {
        let temp = this.state.des==="Rejected" ? "REJECTED" : "APPROVED"
        const payload = {
            "status": "CLOSE",   // every time
            "initiator": this.state.initiator,
            "department": this.state.selected.dept,
            "natureOfChange": this.state.selected.nc,
            "keyword": this.state.selected.kw,
            "category": this.state.selected.cat,
            "QAStatus": "CLOSED",
            "name": this.state.name,
            "relatedChanges": this.state.related,
            "descriptionOfChange": this.state.desc,
            "intendedPurposeOfChange": this.state.purpose,
            "commentsOfProductionManager": this.state.commentsPM,
            "commentsOfQCManager": this.state.commentsQC,
            "commentsOfPlantDirector": this.state.commentsPD,
            "commentsOfQAManager": this.state.commentsQA,
            "batchNo": this.state.batchNo,
        }
        
        const resp = await Change_Control.methods.ChangeControl(payload);

        if (resp.status === 201) {
            alert("Data Saved Successfully!");
    } else {
        alert("Exception thrown while sending request !!!");
    }
    } catch (error) {
      alert("Something Went Wrong");
    }
  }
    
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
                            <h2 style={{ textAlign: "center" }}>Change Control</h2>
                        </CardHeader>
                        <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
                            <GridContainer>

                                <Card>
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
                                                    label="Change Control No(CCN):"
                                                    fullWidth="true"
                                                    InputProps={{ readOnly: true, }}
                                                    value={this.state.ccn}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Initiator:"
                                                    fullWidth="true"
                                                    value={this.state.initiator}
                                                    onChange={(event)=>{
                                                        this.setState({initiator: event.target.value})
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Department/Section"
                                                    fullWidth="true"
                                                    value={this.state.selected.dept}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                dept: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.dept.map((pri) => (
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
                                                    label="Nature of NC:"
                                                    fullWidth="true"
                                                    value={this.state.selected.nc}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                nc: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.nc.map((pri) => (
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
                                                    label="Keyword"
                                                    fullWidth="true"
                                                    value={this.state.selected.kw}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                kw: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.kw.map((pri) => (
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
                                    <CardHeader color="danger">
                                        <h4>Change Required in</h4>
                                    </CardHeader>
                                    <CardContent>

                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Category:"
                                                    fullWidth="true"
                                                    value={this.state.selected.cat}
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        this.setState((prevState) => ({
                                                            selected: {
                                                                // object that we want to update
                                                                ...prevState.selected, // keep all other key-value pairs
                                                                cat: event.target.value, // update the value of specific key
                                                            },
                                                        }));
                                                    }}
                                                >
                                                    {this.state.cat.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    select
                                                    label="Product:"
                                                    fullWidth="true"
                                                    variant="outlined"
                                                    select
                                                    value={this.state.product}
                                                    onChange={(event) => {
                                                       this.setState({product: event.target.value})
                                                       this.handleProd(event.target.value)
                                                    }}
                                                >
                                                    {this.state.productList.map((pri) => (
                                                        <MenuItem key={pri} value={pri}>
                                                            {pri}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Batch No:"
                                                    fullWidth="true"
                                                    InputProps={{readOnly: true}}
                                                    value={this.state.batchNo}
                                                    onChange={(event)=>{
                                                        this.setState({initiator: event.target.value})
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <TextField
                                                    id=""
                                                    variant="outlined"
                                                    label="Name:"
                                                    fullWidth="true"
                                                    value={this.state.name}
                                                    onChange={(event)=>{
                                                        this.setState({name: event.target.value})
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>

                                    </CardContent>
                                </Card>


                            </GridContainer>

                            <Card>
                                <CardContent>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Related Changes and Activities:"
                                                fullWidth="true"
                                                value={this.state.related}
                                                onChange={(event)=>{
                                                    this.setState({related: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Description of Change:"
                                                fullWidth="true"
                                                value={this.state.desc}
                                                onChange={(event)=>{
                                                    this.setState({desc: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Intended Purpose of Change:"
                                                fullWidth="true"
                                                value={this.state.purpose}
                                                onChange={(event)=>{
                                                    this.setState({purpose: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Comments of Production Manager (if required):"
                                                fullWidth="true"
                                                value={this.state.commentsPM}
                                                onChange={(event)=>{
                                                    this.setState({commentsPM: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>


                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Comments of QC Manager (if required):"
                                                fullWidth="true"
                                                value={this.state.commentsQC}
                                                onChange={(event)=>{
                                                    this.setState({commentsQC: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>


                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Comments of Plan Director:"
                                                fullWidth="true"
                                                value={this.state.commentsPD}
                                                onChange={(event)=>{
                                                    this.setState({commentsPD: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>


                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <TextField
                                                id=""
                                                select
                                                label="decision:"
                                                fullWidth="true"
                                                value={this.state.selected.des}
                                                variant="outlined"
                                                onChange={(event) => {
                                                    this.setState((prevState) => ({
                                                        selected: {
                                                            // object that we want to update
                                                            ...prevState.selected, // keep all other key-value pairs
                                                            des: event.target.value, // update the value of specific key
                                                        },
                                                    }));
                                                }}
                                            >
                                                {this.state.des.map((pri) => (
                                                    <MenuItem key={pri} value={pri}>
                                                        {pri}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <TextField
                                                id=""
                                                variant="outlined"
                                                label="Comments of QA Manager:"
                                                fullWidth="true"
                                                value={this.state.commentsQA}
                                                onChange={(event)=>{
                                                    this.setState({commentsQA: event.target.value})
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                </CardContent>
                            </Card>


                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth="true"
                                        startIcon={<PrintIcon />}
                                    >
                                        Print DRF/Copy
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth="true"
                                        startIcon={<CloudUploadIcon />}
                                        onClick={(event)=>{
                                            this.handlePost();
                                        }}
                                    >
                                        Post
                                    </Button>
                                </GridItem>

                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }
}
