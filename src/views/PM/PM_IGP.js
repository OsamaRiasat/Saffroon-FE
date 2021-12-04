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
	PMHighestIGPNO,
	PMPurchaseOrderPONOsWithPendingStatus,
	PMPurchaseOrderItemsCodesForReceiving,
	PMPurchaseOrderDetails,
    PMIGP
} from "../../Services/Inventory/PM/PM_IGP";

class demo extends React.Component {
    async componentDidMount(){
        //all states set when component is rendered
        const Hinum= (await PMHighestIGPNO()).data['IGPNo__max'];
        
        this.setState({
            
            igpnumber:Hinum+1
        })
        const poNums=(await PMPurchaseOrderPONOsWithPendingStatus()).data;
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
            supplierId:''
        }
    }

    handleMaterialCodes=async(po)=>{
        
        console.log("PO",po)
        const matList=(await PMPurchaseOrderItemsCodesForReceiving(po)).data;
        console.log(matList); 

        this.setState({
            materialcode_list:matList
        })

    }
    handleautoFilldata=async (PONo,RMCode)=>{
      const temp= (await PMPurchaseOrderDetails(PONo,RMCode)).data;
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

    postIGPData= async ()=>{
        try{
        const payload= {
            "PMCode": this.state.materialcode,
            "quantityReceived": this.state.recieved_quantity,
            "containersReceived": this.state.number_containers,
            "batchNo": this.state.batchnumber,
            "PONo": this.state.ponumber,
            "S_ID": this.state.supplierId
        }
        const resp=(await PMIGP(payload));
        alert("IGP Added")
        this.setState({

            ponumber:'',
            materialcode:'',
            supplier:'',
            batchnumber:'',
            number_containers:'',
            recieved_quantity:'',
            balance:'',
            material:'',
            demanded:''


        })
        const Hinum= (await PMHighestIGPNO()).data['IGPNo__max'];
        
      this.setState({
          
          igpnumber:Hinum+1
      })
      
    }
    catch(error)
    {
        alert(error)
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
                            <h2 >Inward Gatepass-Packing Material </h2>
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

                                                    <TextField
                                                        id="po number"
                                                        select
                                                        label="P.O Number"
                                                        fullWidth="true"
                                                        
                                                        value={this.state.ponumber}
                                                        onChange={(event) => {
                                                            this.setState({ ponumber: event.target.value })
                                                            this.handleMaterialCodes(event.target.value);
                                                        }}
                                                    >
                                                        {this.state.ponumber_list.map((num) => (
                                                            <MenuItem key={num['PONo']} value={num['PONo']}>
                                                                {num['PONo']}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={8}>

                                                    <TextField
                                                        id="materialcode"
                                                        select
                                                        label="Material Code"
                                                        fullWidth="true"
                                                        
                                                        value={this.state.materialcode}
                                                        onChange={(event) => {
                                                            this.setState({ materialcode: event.target.value })
                                                            this.handleautoFilldata(this.state.ponumber,event.target.value)
                                                            
                                                        }}
                                                    >
                                                        {this.state.materialcode_list.map((num) => (
                                                            <MenuItem key={num['PMCode']} value={num['PMCode']}>
                                                                {num['PMCode']}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        id="materialname"
                                                        InputProps={{ readOnly: true, }}
                                                        label="Material Name"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        style={{ backgroundColor: "#f5f7f7" }}
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
                                                        fullWidth="true"
                                                        style={{ backgroundColor: "#f5f7f7" }}
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
                                                    <TextField id="batchnumber" fullWidth="true"  variant="outlined" label={"Batch Number"} required="true" value={this.state.batchnumber}
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="noOfContainers" variant="outlined"  fullWidth="true" type="number" label="Number Of Containers " required="true" value={this.state.number_containers}
                                                        onChange={(event) => {
                                                            this.setState({ number_containers: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived" fullWidth="true" type="number" variant="outlined" required="true" label={"Quantity Received(" + this.state.unit + ")"} value={this.state.recieved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ recieved_quantity: event.target.value })
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