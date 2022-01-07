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

import {
	RMHighestIGPNO,
	RMPurchaseOrderPONOsWithPendingStatus,
	RMPurchaseOrderItemsCodesForReceiving,
	RMPurchaseOrderDetails,
	RMIGP,
} from "../../Services/Inventory/RM_IGP";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";


class demo extends React.Component {
    async componentDidMount(){
        //all states set when component is rendered
        const Hinum= (await RMHighestIGPNO()).data['IGPNo__max'];
        
        this.setState({
            
            igpnumber:Hinum+1
        })
        const poNums=(await RMPurchaseOrderPONOsWithPendingStatus()).data;
        console.log("poNums",poNums)
        this.setState({
            
            ponumber_list:poNums
        })
    }



    constructor(props) {
        super(props);
        this.state = {
            igpnumber: '',
            ponumber: '',
            materialcode: '',
            material: '',
            demanded: '',
            unit:'',
            balance: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            number_containers: '',
            date: '',
            ponumber_list: [],
            materialcode_list: [],
            material_list:[],
            supplier_list: ['S1', 'S2', 'S3'],
            supplierId:'',
            fieldErrors: {},


        }
    }

    handleMaterialCodes=async(po)=>{
        
        console.log("PO",po)
        const matList=(await RMPurchaseOrderItemsCodesForReceiving(po)).data;
        console.log(matList); 

        this.setState({
            materialcode_list:matList
        })

    }
    handleautoFilldata=async (PONo,RMCode)=>{
      const temp= (await RMPurchaseOrderDetails(PONo,RMCode)).data;
      console.log("tempp",temp)
      this.setState({
          material:temp['Material'],
          balance:temp['balance'],
          demanded:temp['demandedQuantity'],
          supplier:temp['supplierName'],
          unit:temp['units'],
          supplierId:temp["suppplierID"]


      })
      

    }
    validate = (fields) => {
        const errors = {};
        
        if (!fields.ponumber) errors.ponumber = "PO No Required";
        if (!fields.materialcode) errors.materialcode = "RMCode Required";
        if (!fields.batchnumber) errors.batchnumber = "Batch No Required";
        if (!fields.recieved_quantity) errors.recieved_quantity = "Recieved Quantity Required";
        if (!fields.number_containers) errors.number_containers = "No Of Containers Required";
        return errors;
      };
    
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

    postIGPData= async ()=>{

        let { batchnumber, recieved_quantity, number_containers , ponumber, materialcode} = this.state;

        const fieldErrors = this.validate({ batchnumber, recieved_quantity, number_containers, ponumber, materialcode });
  
        this.setState({ fieldErrors: fieldErrors });
  
        if (Object.keys(fieldErrors).length) return;
  
        try{
        const payload= {
            
            "RMCode": this.state.materialcode,
            "quantityReceived": this.state.recieved_quantity,
            "containersReceived": this.state.number_containers,
            "batchNo": this.state.batchnumber,
            "PONo": this.state.ponumber,
            "S_ID": this.state.supplierId
        }
        this.setState({

            ponumber:'',
            materialcode:'',
            supplier:'',
            batchnumber:'',
            number_containers:'',
            recieved_quantity:'',
            balance:'',
            material:'',
            demanded:'',
            fieldErrors: {},


        })
        const resp=(await RMIGP(payload));
        toast.success("IGP Added Successfully !!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        
        const Hinum= (await RMHighestIGPNO()).data['IGPNo__max'];
        
      this.setState({
          
          igpnumber:Hinum+1
      })
      
    }
    catch(error)
    {
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
    // async updateCart() {
    //     return new Promise(resolve => {
    //       this.setState({
    //         cart: [...this.state.cart, this.state.selected]
    //       }, ()=>resolve());
    //     })
    //   }

    render() {
        var today = new Date()
        // let date = today.getUTCDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let date = new Date().toLocaleString('en-us', { day: 'numeric', month: 'long', year: 'numeric' });

        return (
            <div style={{marginTop:50}}>
                {console.log(this.state)}
                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >Inward Gatepass-Raw Material </h2>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}  >
                                    <TextField id="date" style={{ backgroundColor: "#ebebeb" }} fullWidth="true" InputProps={{ readOnly: true, }} variant="outlined" defaultValue={"Date: " + date}
                                        onChange={(event) => {
                                            this.setState(prevState => ({
                                                selected: {                  // object that we want to update
                                                    ...prevState.selected,     // keep all other key-value pairs
                                                    date: event.target.value  // update the value of specific key
                                                }
                                            }))
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={8}>

                                    {/* Text Field for IGP Number */}
                                    <TextField id="igp-number" style={{ backgroundColor: "#ebebeb" }} InputProps={{readOnly: true,}} variant="outlined" label="IGP Number" value={this.state.igpnumber}
                                        onChange={(event) => {
                                            this.setState({ igpnumber: event.target.value })
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>

                                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                                    <CardContent>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}  >

                                                <Select
                                                        name="ponumber"
                                                        placeholder="P.O Number"
                                                        autoFocus={true}
                                                        // inputProps={{ tabIndex: "1" }}
                                                        tabIndex= "1"
                                                        className="customSelect"
                                                        classNamePrefix="select"
                                                        components={{
                                                            ValueContainer:CustomValueContainer,
                                                        }}
                                                        styles={CustomSelectStyle}
                                                        isSearchable={true}
                                                        options={this.state.ponumber_list}
                                                        value={
                                                            this.state.ponumber ? { PONo: this.state.ponumber } : null
                                                        }
                                                        getOptionValue={(option) => option.PONo}
                                                        getOptionLabel={(option) => option.PONo}
                                                        onChange={(value, select) => {
                                                            this.setState({ ponumber : value.PONo })
                                                            this.handleMaterialCodes(value.PONo);
                                                            console.log("Here from auto ", select.name)
                                                            this.onChangeClearError(select.name);
                                                        }}
                                                    />
                                                    {this.state.fieldErrors && this.state.fieldErrors.ponumber && (
                                                        <span className="MuiFormHelperText-root Mui-error">
                                                        {this.state.fieldErrors.ponumber}
                                                        </span>
                                                    )}
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={8}>

                                                <Select
                                                        name="materialcode"
                                                       // name1="rmCode"
                                                        placeholder="Raw Material Code"
                                                        className="customSelect"
                                                        tabIndex= "2"
                                                        // inputProps={{ tabIndex: "2" }}
                                                        classNamePrefix="select"
                                                        components={{
                                                            ValueContainer:CustomValueContainer,
                                                        }}
                                                        styles={CustomSelectStyle}
                                                        isSearchable={true}
                                                        options={this.state.materialcode_list}
                                                        value={
                                                            this.state.materialcode ? { RMCode: this.state.materialcode } : null
                                                        }
                                                        getOptionValue={(option) => option.RMCode}
                                                        getOptionLabel={(option) => option.RMCode}
                                                        onChange={(value, select) => {
                                                            this.setState({ materialcode : value.RMCode })
                                                            this.handleautoFilldata(this.state.ponumber,value.RMCode)
                                                            this.onChangeClearError(select.name);
                                                        }}
                                                    />
                                                     {this.state.fieldErrors && this.state.fieldErrors.materialcode && (
                                                        <span className="MuiFormHelperText-root Mui-error">
                                                        {this.state.fieldErrors.materialcode}
                                                        </span>
                                                    )}
                                                </GridItem>
                                            </GridContainer>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        id="materialname"
                                           
                                                        InputProps={{ readOnly: true,tabIndex:"-1" }}
                                                        label="Material Name"
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        value={this.state.material}
                                                        // onChange={(event) => {
                                                        //     this.setState({ material: event.target.value })
                                                        // }}
                                                    >
                                                        {/* {this.state.material_list.map((num) => (
                                                            <MenuItem key={num} value={num}>
                                                                {num}
                                                            </MenuItem>
                                                        ))} */}
                                                    </TextField>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        value={this.state.supplier}
                                                        // onChange={(event) => {
                                                        //     this.setState({ supplier: event.target.value })
                                                        // }}
                                                        id="supplier"
                                                        InputProps={{ readOnly: true, }}
                                                        label="Supplier"
                                                        variant="outlined"
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        fullWidth="true"
                                                    >
                                                        {/* {this.state.supplier_list.map((sup) => (
                                                            <MenuItem key={sup} value={sup}>
                                                                {sup}
                                                            </MenuItem>
                                                        ))} */}
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField id="demanded" style={{ backgroundColor: "#f5f7f7" }} InputProps={{ readOnly: true, }} fullWidth="true"  variant="outlined" label={"Demanded (" + this.state.unit + ")"} value={this.state.demanded}
                                                        // onChange={(event) => {
                                                        //     this.setState({ demanded: event.target.value })
                                                        // }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField id="balance" style={{ backgroundColor: "#f5f7f7" }} InputProps={{ readOnly: true, }} fullWidth="true" variant="outlined" label="Balance " value={this.state.balance}
                                                        // onChange={(event) => {
                                                        //     this.setState({ balance: event.target.value })
                                                        // }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            {/* <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <TextField
                                                        value={this.state.supplier}
                                                        onChange={(event) => {
                                                            this.setState({ supplier: event.target.value })
                                                        }}
                                                        id="supplier"
                                                        select
                                                        label="Supplier"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                    >
                                                        {this.state.supplier_list.map((sup) => (
                                                            <MenuItem key={sup} value={sup}>
                                                                {sup}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer> */}
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField name="batchnumber" id="batchnumber" fullWidth="true"  variant="outlined" label={"Batch Number"} required="true" value={this.state.batchnumber}
                                                         inputProps={{ tabIndex: "3" }}
                                                         error={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.batchnumber
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.batchnumber
                                                          }
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value });
                                                            this.onChangeClearError(event.target.name);
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="noOfContainers" name="number_containers" variant="outlined"  fullWidth="true" type="number" label="Number Of Containers " required="true" value={this.state.number_containers}
                                                         inputProps={{ tabIndex: "4" }}
                                                         error={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.number_containers
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.number_containers
                                                          }
                                                        
                                                        onChange={(event) => {
                                                            this.setState({ number_containers: event.target.value });
                                                            this.onChangeClearError(event.target.name);
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived" name="recieved_quantity" fullWidth="true" type="number" variant="outlined" required="true" label={"Quantity Received(" + this.state.unit + ")"} value={this.state.recieved_quantity}
                                                        inputProps={{ tabIndex: "5"  }}
                                                        error={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.recieved_quantity
                                                              ? true
                                                              : false
                                                          }
                                                          helperText={
                                                            this.state.fieldErrors &&
                                                            this.state.fieldErrors.recieved_quantity
                                                          }
                                                        onChange={(event) => {
                                                            this.setState({ recieved_quantity: event.target.value });
                                                            this.onChangeClearError(event.target.name);
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
                            <Button className="StyledButton" 
                            tabIndex="6"
                            onClick={() => {
                                this.postIGPData()
                            }} color="primary">Add</Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default demo