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

import {
	ProductCode,
	HighestBDNo,
	BatchNo,
	BatchDetail,
	BatchDeviation,
} from "../../Services/QA/Batch_Deviation";

export default class BatchDeviationForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            devNo: "",
            productList: [],
            product: "",
            batchNoList: [],
            batchNo: "",
            mfgDate: "",
            expDate: "",
            batchSize: "",
            
            stageList: [],
            stage: "",
            keyword: "",
            keywordList: ["Caping", "Coating", "Color", "Cracking", "DRF", "Drying", "DT", "Formula", "Friability", "Granulation", "Hardness", "LOD", "Lubrication", "Mesh", "pH", "Reprocessing", "Shelf-Life", "Specification", "Sticking", "Sweetness", "Wastage", "WeightVar"],
            
            desc: "",
            actionTaken: "",
        }
    }
    
    async componentDidMount() {
        const pl = (await ProductCode()).data;
        this.setState({productList: pl})
        const dev = (await HighestBDNo()).data;
        this.setState({devNo: dev.deviationNo})        
    }
    async handleProd(pro) {
        const bn = (await BatchNo(pro)).data;
        this.setState({batchNoList: bn})
    }
    async handleBN(bn) {
        const det = (await BatchDetail(bn)).data;
        console.log(det)
        this.setState({mfgDate: det.MFGDate})
        this.setState({expDate: det.EXPDate})
        this.setState({batchSize: det.batchSize})
        this.setState({stageList: det.stages})
    }
    
    async handlePost() {
        if(this.state.batchNo==="" ||
            this.state.keyword==="") {
                alert("Please fill the form first!");
                return;
            }
            
        try {
            const payload = {
                "stage": "OPEN",    // will be open everytime
                "keyword": this.state.keyword,
                "descriptionOfDeviation": this.state.desc,
                "actionTaken": this.state.actionTaken,
                "batchNo": this.state.batchNo,
            }
            
            const resp = await BatchDeviation(payload);
    
            if (resp.status === 201) {
                alert("Data Saved Successfully!");
                this.setState({
                    product: "",
                    batchNoList: [],
                    batchNo: "",
                    mfgDate: "",
                    expDate: "",
                    batchSize: "",
                    
                    stageList: [],
                    stage: "",
                    keyword: "",
                    desc: "",
                    actionTaken: "",
                })
                this.componentDidMount();
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
                            <h2 style={{ textAlign: "center" }}>Batch Deviation</h2>
                        </CardHeader>
                        <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="date" fullWidth="true" InputProps={{ readOnly: true, }} defaultValue={date} variant="outlined" label={"Date:"}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" label={"Deviation No:"}
                                    value={this.state.devNo}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" variant="outlined" label={"Product Code:"} select
                                    value={this.state.product}
                                    onChange={(event)=>{
                                        this.setState({product: event.target.value})
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

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" variant="outlined" label={"Batch No:"} select
                                    value={this.state.batchNo}
                                    onChange={(event)=>{
                                        this.setState({batchNo: event.target.value})
                                        this.handleBN(event.target.value);
                                    }}                                    
                                    >
                                        {this.state.batchNoList.map((pri) => (
                                            <MenuItem key={pri.batchNo} value={pri.batchNo}>
                                                {pri.batchNo}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" label={"Manufacture Date:"}
                                    value={this.state.mfgDate}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" label={"Expire Date:"}
                                    value={this.state.expDate}                                        
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" label={"Batch Size:"} 
                                    value={this.state.batchSize}                                        
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true"  variant="outlined" label={"Batch Stage:"} select
                                    value={this.state.stage}
                                    onChange={(event)=>{
                                        this.setState({stage: event.target.value})
                                    }}                                    
                                    >
                                        {this.state.stageList.map((pri) => (
                                            <MenuItem key={pri.stage} value={pri.stage}>
                                                {pri.stage}
                                            </MenuItem>
                                        ))}
                                    </TextField>                                    
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" variant="outlined" label={"Keyword:"} select
                                    value={this.state.keyword}
                                    onChange={(event)=>{
                                        this.setState({keyword: event.target.value})
                                    }}                                    
                                    >
                                        {this.state.keywordList.map((pri) => (
                                            <MenuItem key={pri} value={pri}>
                                                {pri}
                                            </MenuItem>
                                        ))}
                                    </TextField>                                    
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" variant="outlined" label={"Description:"} multiline
                                        value={this.state.desc}
                                        onChange={(event)=>{this.setState({desc: event.target.value})}}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="" fullWidth="true" variant="outlined" label={"Action Taken:"}
                                    value={this.state.actionTaken}
                                        onChange={(event)=>{this.setState({actionTaken: event.target.value})}}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth="true"
                                        startIcon={<BackupIcon />}
                                        onClick={()=>{
                                            this.handlePost();
                                        }}
                                    >
                                        Post Deviation
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>

            </div>
        )
    }
}
