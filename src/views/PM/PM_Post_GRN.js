import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { GRNoList, PMRecievingDetailByGRNo, PMBinCard } from '../../Services/Inventory/PM/PM_Post_GRN';

import Select from "react-select";
import { toast } from "react-toastify";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";


class demo3 extends React.Component {


    async componentDidMount(){
        const GrnList=(await GRNoList()).data
        console.log(GrnList)
        this.setState({
            grnnumber_list:GrnList
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            grnnumber: '',
            approvedate: '',
            material: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            approved_quantity: '',
            mfg_date: '',
            exp_date: '',
            qcnumber: '',
            grnnumber_list: [],
            unit:'',
            fieldErrors:{},
        }
    }
    handleAutoFill=async (grnNum)=>{
        const temp = (await PMRecievingDetailByGRNo(grnNum)).data;
        this.setState({
            material:temp["Material"],
            supplier:temp["supplierName"],
            batchnumber:temp["Batch_No"],
            recieved_quantity:temp["Recieved_Quantity"],
            approved_quantity:temp["Approved_Quantity"],
            qcnumber:temp["QC_No"],
            mfg_date:temp["MFG"],
            exp_date:temp["Exp_Date"],
            unit:temp["units"],
            approvedate:temp["approval_Date"]

        })

    }

    addpostGRNData= async ()=>{
        const fieldErrors = this.validate(this.state);
        this.setState({ fieldErrors: fieldErrors });
        if (Object.keys(fieldErrors).length) return;

        try{
        const payload= {

            "GRNo": this.state.grnnumber,
 
        }
        const resp=(await PMBinCard(payload));
        //alert("Post GRN Added")
        toast.success("PM Post GRN Generated Successfully !!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        this.clearForm();
      
    }
    catch(error)
    {
       // alert(error)
       toast.error("Request Not sent "+error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
    }
    }

    clearForm=()=>{

        this.setState({
            
            grnnumber: '',
            approvedate: '',
            material: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            approved_quantity: '',
            mfg_date: '',
            exp_date: '',
            qcnumber: '',
            unit:'',
        })
       


    }
    onChangeClearError = (name) => {
        let data = {
          ...this.state.fieldErrors,
          [name]: "",
        };
        console.log(Object.entries(data));
        this.setState({
          fieldErrors: data,
        });
      };
      validate = (fields) => {
        const errors = {};
        if (!fields.grnnumber) errors.grnnumber = "GRN number Required";
        // if (!fields.PMCode) errors.PMCode = "PMCode Required";
        // if (!fields.Batchnumber) errors.Batchnumber = "Batchnumber Required";
        // if (!fields.NoOfContainers) errors.NoOfContainers = "noOfContainers Required";
        // if (!fields.QuantityReceived) errors.QuantityReceived = "quantityReceived Required";
        return errors;
    };

    render() {
        //{ console.log(this.state) }
        return (
            <div style={{marginTop:50}}>
                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >Post GRN Packing Material </h2>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                <Select
                                                        name="grnnumber"
                                                        placeholder="GRN Number"
                                                        className="customSelect"
                                                        classNamePrefix="select"
                                                        components={{
                                                            ValueContainer:CustomValueContainer,
                                                        }}
                                                        styles={CustomSelectStyle}
                                                        isSearchable={true}
                                                        options={this.state.grnnumber_list}
                                                        value={
                                                            this.state.grnnumber ? { GRNo: this.state.grnnumber } : null
                                                        }
                                                        getOptionValue={(option) => option.GRNo}
                                                        getOptionLabel={(option) => option.GRNo}
                                                        onChange={(value, select) => {
                                                            this.setState({ grnnumber : value.GRNo })
                                                            this.handleAutoFill(value.GRNo);
                                                            this.onChangeClearError(select.name);
                                                        }}
                                                    /> 
                                                     {this.state.fieldErrors && this.state.fieldErrors.grnnumber && (
                                                        <span className="MuiFormHelperText-root Mui-error">
                                                        {this.state.fieldErrors.grnnumber}
                                                        </span>
                                                    )} 
                                    {/* <TextField
                                        id="grnNumber"
                                        select
                                        label="GRN Number"
                                        fullWidth="true"
                                        value={this.state.grnnumber}
                                        onChange={(event) => {
                                            this.setState({ grnnumber: event.target.value })
                                            this.handleAutoFill(event.target.value);

                                        }}
                                    >
                                        {this.state.grnnumber_list.map((num) => (
                                            <MenuItem key={num["GRNo"]} value={num["GRNo"]}>
                                                {num["GRNo"]}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}  >
                                    <TextField id="approvedate" style={{ backgroundColor: "#f5f7f7" }} variant="outlined" label="Approve Date " value={this.state.approvedate}
                                        onChange={(event) => {
                                            this.setState({ approvedate: event.target.value })
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>
                                        <GridItem xs={12} sm={12} md={12}>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        id="materialname"
                                                        label="Material"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        InputProps={{readOnly: true,}} 
                                                        style={{backgroundColor:"#f5f7f7"}}
                                                        value={this.state.material}
                                                        onChange={(event) => {
                                                            this.setState({ material: event.target.value })
                                                        }}
                                                    >

                                                    </TextField>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        id="supplier"
                                                        label="Supplier"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        InputProps={{readOnly: true,}} 
                                                        style={{backgroundColor:"#f5f7f7"}}
                                                        value={this.state.supplier}
                                                        onChange={(event) => {
                                                            this.setState({ supplier: event.target.value })
                                                        }}
                                                    >

                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>
                                            {/* <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <TextField
                                                        id="supplier"
                                                        label="Supplier"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        InputProps={{readOnly: true,}} 
                                                        value={this.state.supplier}
                                                        onChange={(event) => {
                                                            this.setState({ supplier: event.target.value })
                                                        }}
                                                    >

                                                    </TextField>
                                                </GridItem>
                                            </GridContainer> */}

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="batchnumber" fullWidth="true" style={{backgroundColor:"#f5f7f7"}} InputProps={{readOnly: true,}}  variant="outlined" label={"Batch Number"} value={this.state.batchnumber}
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived" style={{backgroundColor:"#f5f7f7"}}   InputProps={{readOnly: true,}}  fullWidth="true" type="number" variant="outlined" label={"Received Quantity(" +this.state.unit+ ")"} value={this.state.recieved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ recieved_quantity: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityApproved" style={{backgroundColor:"#f5f7f7"}} InputProps={{readOnly: true,}} fullWidth="true" type="number" variant="outlined" label={"Approved Quantity(" +this.state.unit+ ")"} value={this.state.approved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ approved_quantity: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>

                                            </GridContainer>



                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}  >
                                                    <TextField id="manufacturedate" style={{backgroundColor:"#f5f7f7"}} fullWidth="true"   InputProps={{readOnly: true,}}  variant="outlined" label="Manufacture Date " value={this.state.mfg_date}
                                                        onChange={(event) => {
                                                            this.setState({ mfg_date: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="expirydate" style={{backgroundColor:"#f5f7f7"}} InputProps={{readOnly: true,}}  fullWidth="true" variant="outlined" label="Expiry Date " value={this.state.exp_date}
                                                        onChange={(event) => {
                                                            this.setState({ exp_date: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="qcNumber" style={{backgroundColor:"#f5f7f7"}} InputProps={{readOnly: true,}}  fullWidth="true" variant="outlined" label="QC Number " value={this.state.qcnumber}
                                                        onChange={(event) => {
                                                            this.setState({ qcnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </GridItem>
                                    </CardContent>
                                </CardM>
                            </GridContainer>
                        </CardBody>

                        <CardFooter className="center">
                            <Button className="StyledButton" onClick={() => {
                             this.addpostGRNData()
                            }} color="primary">Post GRN</Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default demo3
