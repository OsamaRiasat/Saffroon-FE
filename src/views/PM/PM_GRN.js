import React from 'react';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { PMHighestGRNo, IGPNoList, PMRecievingDetail, UpdateRMRecieving } from "../../Services/Inventory/PM/PM_GRN";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

class demo2 extends React.Component {

    async componentDidMount(){
       this.incGrn()
        const igpList=(await IGPNoList()).data;
        this.setState({
            igpnumber_list:igpList
        })
    }

    handleAutoFill=async (igpNum)=>{
        const temp = (await PMRecievingDetail(igpNum)).data;
        this.setState({
            material:temp["Material"],
            supplier:temp["supplierName"],
            batchnumber:temp["Batch_No"],
            recieved_quantity:temp["Recieved_Quantity"],
            number_containers:temp["Containers"],
            rec_date:temp["Recieving_Date"].substr(0,10),
            codenumber:temp["Code"],
            unit:temp[ "units"]
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            grnnumber: '',
            igpnumber: '',
            codenumber: '',
            material: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            number_containers: '',
            rec_date: '',
            mfg_date: '',
            exp_date: '',
            remarks: '',
            igpnumber_list: [],
            unit:''
        }
    }
    postGRNData= async ()=>{
        const fieldErrors = this.validate(this.state);
        this.setState({ fieldErrors: fieldErrors });
        if (Object.keys(fieldErrors).length) return;
        try{
            const payload= {
                "batchNo":this.state.batchnumber,
                "quantityReceived": this.state.recieved_quantity,
                "containersReceived": this.state.number_containers,
                "MFG_Date": this.state.mfg_date,
                "EXP_Date": this.state.exp_date,
                "GRNo": this.state.grnnumber,
                "remarks": this.state.remarks
            }
            const resp=(await UpdateRMRecieving(this.state.igpnumber,payload));
            //alert("GRN Update Request Sent")
            toast.success("GRN Added Successfully !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            this.clearForm();
            this.incGrn();
        }
        catch(error)
        {
            //alert(error)
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
            igpnumber: '',
            codenumber: '',
            material: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            number_containers: '',
            rec_date: '',
            mfg_date: '',
            exp_date: '',
            remarks: '',
           
            unit:''
        })
    }
    incGrn=async ()=>{
        const Hinum= (await PMHighestGRNo()).data['GRNo__max'];
        this.setState({
            
            grnnumber:Hinum+1
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
        if (!fields.igpnumber) errors.igpnumber = "IGPNumber Required";
        if (!fields.mfg_date) errors.mfg_date = "ManufactureDate Required";
        if (!fields.exp_date) errors.exp_date = "ExpiryDate Required";
        if (!fields.remarks) errors.remarks = "Remarks Required";
       // if (!fields.QuantityReceived) errors.QuantityReceived = "quantityReceived Required";
        return errors;
    };
    render() {
        var today = new Date()
        return (
            <div style={{marginTop:50}}>
            {console.log(this.state)}
                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >Goods Receiving Note-Packing Material </h2>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="grn-number" style={{ backgroundColor: "#ebebeb" }} variant="outlined" label="GRN Number" value={this.state.grnnumber}
                                        onChange={(event) => {
                                            this.setState({ grnnumber: event.target.value })
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}  >
                                <Select
                                                        name="igpnumber"
                                                        placeholder="IGP Number"
                                                        className="customSelect"
                                                        classNamePrefix="select"
                                                        components={{
                                                            ValueContainer:CustomValueContainer,
                                                        }}
                                                        styles={CustomSelectStyle}
                                                        isSearchable={true}
                                                        options={this.state.igpnumber_list}
                                                        value={
                                                            this.state.igpnumber ? { IGPNo: this.state.igpnumber } : null
                                                        }
                                                        getOptionValue={(option) => option.IGPNo}
                                                        getOptionLabel={(option) => option.IGPNo}
                                                        onChange={(value, select) => {
                                                            this.setState({ igpnumber : value.IGPNo })
                                                            this.handleAutoFill(value.IGPNo);
                                                            this.onChangeClearError(select.name);
                                                        }}
                                                    /> 
                                                     {this.state.fieldErrors && this.state.fieldErrors.igpnumber && (
                                                        <span className="MuiFormHelperText-root Mui-error">
                                                        {this.state.fieldErrors.igpnumber}
                                                        </span>
                                                    )}
                                    {/* <TextField
                                        id="igpNumber"
                                        select
                                        label="IGP Number"
                                        fullWidth="true"
                                        value={this.state.igpnumber}
                                        onChange={(event) => {
                                            this.setState({ igpnumber: event.target.value })
                                            this.handleAutoFill(event.target.value);

                                        }}
                                    >
                                    {this.state.igpnumber_list.map((num) => (
                                            <MenuItem key={num["IGPNo"]} value={num["IGPNo"]}>
                                                {num["IGPNo"]}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                </GridItem>
                            </GridContainer>

                            <GridContainer>

                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}  >

                                                    <TextField id="date" fullWidth="true" style={{ backgroundColor: "#f5f7f7" }} InputProps={{readOnly: true,}} variant="outlined" label="Recieving Date" value={this.state.rec_date}
                                                        onChange={(event) => {
                                                            this.setState({ rec_date: event.target.value })
                                                        }}
                                                    />
                                                    

                                                </GridItem>

                                                <GridItem xs={6} sm={6} md={4}>
                                                    <TextField
                                                        id="materialname"
                                                        label="Material"
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        variant="outlined"
                                                        InputProps={{readOnly: true,}}
                                                        fullWidth="true"
                                                        value={this.state.material}
                                                        onChange={(event) => {
                                                            this.setState({ material: event.target.value })
                                                        }}
                                                    >

                                                    </TextField>
                                                </GridItem>

                                                <GridItem xs={6} sm={6} md={4}>
                                                    <TextField id="codenumber"  style={{ backgroundColor: "#f5f7f7" }} InputProps={{readOnly: true,}} variant="outlined" fullWidth="true" label="Code Number" value={this.state.codenumber}
                                                        onChange={(event) => {
                                                            this.setState({ codenumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                               
                                            </GridContainer>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <TextField
                                                        id="supplier"
                                                        label="Supplier"
                                                        InputProps={{readOnly: true,}}
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        value={this.state.supplier}
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        onChange={(event) => {
                                                            this.setState({ supplier: event.target.value })
                                                        }}
                                                    >
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="batchnumber" style={{ backgroundColor: "#f5f7f7" }}  fullWidth="true" required="true" variant="outlined" label="Batch Number" value={this.state.batchnumber}
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived"style={{ backgroundColor: "#f5f7f7" }} fullWidth="true" required="true" fullWidth="true" type="number" variant="outlined" label={"Received Quantity(" + this.state.unit+")"} value={this.state.recieved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ recieved_quantity: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="noOfContainers" style={{ backgroundColor: "#f5f7f7" }} required="true" fullWidth="true" variant="outlined" label="Number Of Containers " value={this.state.number_containers}
                                                        onChange={(event) => {
                                                            this.setState({ number_containers: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}  >
                                                    <TextField name="mfg_date" id="manufacturedate" type="date"  fullWidth="true" required="true" variant="outlined" label="Manufacture Date "  InputLabelProps={{ shrink: true }}  value={this.state.mfg_date}
                                                          error={
                                                            this.state.fieldErrors &&
                                                              this.state.fieldErrors.mfg_date
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.mfg_date
                                                          }
                                                        onChange={(event) => {
                                                            this.setState({ mfg_date: event.target.value });
                                                            this.onChangeClearError(event.target.name);
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField name="exp_date" id="expirydate" fullWidth="true" required="true" variant="outlined" label="Expiry Date "   InputLabelProps={{ shrink: true }}  type="date" value={this.state.exp_date}
                                                         error={
                                                            this.state.fieldErrors &&
                                                              this.state.fieldErrors.exp_date
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.exp_date
                                                          }
                                                        onChange={(event) => {
                                                            this.setState({ exp_date: event.target.value });
                                                            this.onChangeClearError(event.target.name);
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <TextField
                                                      name="remarks"
                                                        id="remarks"
                                                        label="Remarks"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        value={this.state.remarks}
                                                        error={
                                                            this.state.fieldErrors &&
                                                              this.state.fieldErrors.remarks
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.remarks
                                                          }
                                                        onChange={(event) => {
                                                            this.setState({ remarks: event.target.value });
                                                            this.onChangeClearError(event.target.name);
                                                        }}
                                                    >
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>
                                        </GridItem>
                                    </CardContent>
                                </CardM>
                            </GridContainer>
                        </CardBody>
                        <CardFooter className="center">
                            <Button className="StyledButton" onClick={() => {

                            this.postGRNData()
                            }} color="primary">Request For Sample</Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}
export default demo2