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
import { CircularProgress} from '@material-ui/core';
import PrintIcon from "@material-ui/icons/Print";

import {GRNoList, RMRecievingDetailByGRNo } from "../../Services/Inventory/GRN_Print";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

class RM_GRN_Print extends React.Component {

    
    printData = async () => {
        var divToPrint = document.getElementById("hide");
        if (divToPrint === "" || divToPrint === null) {
          return;
        } else {
          console.log("hi", divToPrint);
          var newWin = window.open("");
    
          newWin.document.write(divToPrint.outerHTML);
        
          newWin.print();
    
          if (newWin.stop) {
            newWin.location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
            newWin.stop(); //immediately stop reloading
          }
          newWin.close();

         
          this.componentDidMount();
          this.clearForm();
        
        }
      };
      toggle = () =>
      this.setState({ show: !this.state.show }, () => {
        this.printData();
      });

    async componentDidMount(){
        //all states set when component is rendered
       

        const GrnList=(await GRNoList()).data
        console.log(GrnList)
        this.setState({
            grnnumber_list:GrnList
        })
    }

    handleAutoFill=async (igpNum)=>{
        const temp = (await RMRecievingDetailByGRNo(igpNum)).data;
        this.setState({
            material:temp["Material"],
            code:temp["Code"],
            supplier:temp["supplierName"],
            batchnumber:temp["Batch_No"],
            recieved_quantity:temp["Recieved_Quantity"],
            number_containers:temp["containersReceived"],
            rec_date:temp["Recieving_Date"].substr(0,10),
            codenumber:temp["Code"],
            mfg_date:temp["MFG"],
            exp_date:temp["Exp_Date"],
            unit:temp[ "units"],
            igpnumber:temp[ "IGPNo"],
            remarks:temp[ "remarks"],

            canprint:true
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            grnnumber_list:[],
            grnnumber: '',
            igpnumber: '',
            codenumber: '',
            material: '',
            code: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            number_containers: '',
            rec_date: '',
            mfg_date: '',
            exp_date: '',
            remarks: '',
            unit:'',
            
            show: false,
            canprint: false,
        }
    }
  
    clearForm=()=>{

        this.setState({
            
            igpnumber: '',
            codenumber: '',
            material: '',
            code: '',
            supplier: '',
            batchnumber: '',
            recieved_quantity: '',
            number_containers: '',
            rec_date: '',
            mfg_date: '',
            exp_date: '',
            remarks: '',
            show: false,
            canprint: false,
            unit:''
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
        var today = new Date();
        let date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
        return (
            <div style={{marginTop:50}}>

                <GridContainer md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >Print GRN-Raw Material </h2>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>
                            <GridItem xs={12} sm={12} md={4}  >
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
                           
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <TextField id="igpnumber" style={{ backgroundColor: "#ebebeb" }} variant="outlined" label="IGP Number" value={this.state.igpnumber}
                                        onChange={(event) => {
                                            this.setState({ grnnumber: event.target.value })
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

                                                    <TextField id="date" fullWidth="true"  style={{ backgroundColor: "#f5f7f7" }} InputProps={{readOnly: true,}} variant="outlined" label="Recieving Date" value={this.state.rec_date}
                                                        onChange={(event) => {
                                                            this.setState({ rec_date: event.target.value })
                                                        }}
                                                    />
                                                    

                                                </GridItem>

                                                <GridItem xs={6} sm={6} md={4}>
                                                    <TextField
                                                        id="materialname"
                                                        label="Material"
                                                        variant="outlined"
                                                        InputProps={{readOnly: true,}}
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        fullWidth="true"
                                                        value={this.state.material}
                                                        onChange={(event) => {
                                                            this.setState({ material: event.target.value })
                                                        }}
                                                    >

                                                    </TextField>
                                                </GridItem>

                                                <GridItem xs={6} sm={6} md={4}>
                                                    <TextField id="codenumber" style={{ backgroundColor: "#f5f7f7" }} InputProps={{readOnly: true,}} variant="outlined" fullWidth="true" label="Code Number" value={this.state.code}
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
                                                        style={{ backgroundColor: "#f5f7f7" }}
                                                        value={this.state.supplier}
                                                        onChange={(event) => {
                                                            this.setState({ supplier: event.target.value })
                                                        }}
                                                    >
                                                    </TextField>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="batchnumber" style={{ backgroundColor: "#f5f7f7" }} fullWidth="true" required="true" variant="outlined" label="Batch Number" value={this.state.batchnumber}
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived" style={{ backgroundColor: "#f5f7f7" }} fullWidth="true" required="true" fullWidth="true" type="number" variant="outlined" label={"Received Quantity(" + this.state.unit+")"} value={this.state.recieved_quantity}
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
                                                <TextField id="manufacturedate" style={{backgroundColor:"#f5f7f7"}} fullWidth="true"   InputProps={{readOnly: true,}}  variant="outlined" label="Manufacture Date " value={this.state.mfg_date}
                                                        onChange={(event) => {
                                                            this.setState({ mfg_date: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                <TextField id="expirydate" style={{backgroundColor:"#f5f7f7"}} InputProps={{readOnly: true,}}  fullWidth="true" variant="outlined" label="Expiry Date " value={this.state.exp_date}
                                                        onChange={(event) => {
                                                            this.setState({ exp_date: event.target.value })
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.toggle();
                          }}
                          disabled={!this.state.canprint}
                          startIcon={<PrintIcon />}
                        >
                          PRINT GRN
                        </Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>

                {this.state.show && (
          <div id="hide">
            <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
            
            <h2>Goods Receiving Note</h2>
            <h3>Raw Material</h3>
          </div>

          <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderCollapse: "collapse",
            fontSize:"22px"
          }}>
            
            <tr style={{  color: "black", textDecoration:"bold" }}>
              <td style={{  width: "200px"}}>Date:  </td>
              <td style={{textAlign: "left", width: "200px" }}>{date}</td>
              <td style={{ width: "200px" }}>GRN No:</td>
              <td style={{textAlign: "left", width: "200px" }}>{this.state.grnnumber}</td>

            </tr>
            <tr></tr><tr></tr>
            <tr style={{ border: "1px solid black", color: "black", backgroundColor: "rgba(100, 100, 100, 0.5)" }}>
              <td style={{  width: "200px"}}><b>Material:  </b></td>
              <td style={{textAlign: "left", width: "200px" }}>{this.state.material}</td>
              <td style={{ width: "100px" }}><b></b></td>
              <td style={{textAlign: "left", width: "300px" }}>{this.state.code}</td>

            </tr>
          
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Batch No: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.batchnumber}</td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>MFG. Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.mfg_date}</td>
            </tr>
          
            <tr>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>IGP No: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.igpnumber}</td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Expiry Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.exp_date}</td>
            
            </tr>
            <tr style={{border: "1px solid black"}}>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Supplier: </b></td>
            <td style={{textAlign: "left", width: "200px"}}>{this.state.supplier}</td>
            <td style={{textAlign: "left", width: "200px" }}><b> </b></td>
            <td style={{textAlign: "left", width: "200px" }}></td>
            </tr>
            <tr style={{border: "1px solid black"}}>
            <td style={{textAlign: "left", width: "200px", border: "1px solid black" }}><b>Quantity: </b></td>
            <td style={{textAlign: "left", width: "200px" }}>{this.state.recieved_quantity}</td>
            <td style={{textAlign: "left", width: "200px" }}><b></b></td>
            <td style={{textAlign: "left", width: "200px" }}> </td>
            </tr>
            <tr style={{border: "1px solid black" }}>
            <td style={{textAlign: "left", width: "200px", border: "1px solid black"}}><b>Remarks: </b></td>
            <td style={{textAlign: "left", width: "600px" }}>{this.state.remarks}</td>
            <td style={{textAlign: "left", width: "200px" }}><b> </b></td>
            <td style={{textAlign: "left", width: "200px" }}></td>
            </tr>
            <tbody>
            {/* {this.GenerateSpecs()} */}
            </tbody>
          </table>


              <div style={{ display: "flex" }}>
                <div style={{ textAlign: "left", marginRight: "600px" }}>
                  <p>
                    <span>
                      <strong>Warehouse I/C:</strong>
                    </span>
                  </p>
                  ______________________
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>
                    <span>
                      <strong>QA I/C:</strong>
                    </span>
                  </p>
                  ________________________
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RM_GRN_Print