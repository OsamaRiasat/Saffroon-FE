import React, { Component } from 'react';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from '../../components/Card/Card.js';
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import { toast } from "react-toastify";
import PrintIcon from "@material-ui/icons/Print";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import { GRNoList, RMRecievingDetailByGRNo, RM_Returned } from '../../Services/Inventory/RM_Material_Return_Note';
export default class RawMaterialReturnNote extends Component{
    
    
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

          const GrnList=(await (RM_Returned(this.state.grnnumber))).data;
          console.log(GrnList);
          this.componentDidMount();
          this.clearForm();
        
        }
      };
      toggle = () =>
      this.setState({ show: !this.state.show }, () => {
        this.printData();
      });


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
            rejectedDate: '',
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
            reasonOfReturn:'',

            show: false,
            canprint: false,
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
            remarks:'',
            show: false,
            canprint: false,
        })
       


    }
    handleAutoFill=async (grnNum)=>{
        const temp = (await RMRecievingDetailByGRNo(grnNum)).data;
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
            approvedate:temp["Approval_Date"],
            remarks:temp["remarks"],


            canprint:true
        })

    }
    addpostGRNData= async ()=>{

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
        if (!fields.grnnumber) errors.grnnumber = "IGPNumber Required";
        // if (!fields.ManufactureDate) errors.ManufactureDate = "ManufactureDate Required";
        // if (!fields.ExpiryDate) errors.ExpiryDate = "ExpiryDate Required";
        // if (!fields.Remarks) errors.Remarks = "Remarks Required";
       // if (!fields.QuantityReceived) errors.QuantityReceived = "quantityReceived Required";
        return errors;
    };
    render() {
        //{ console.log(this.state) }
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
                            <h2 >Raw Material Return Note </h2>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                <Select
                                                        name="grnnumber"
                                                        placeholder="GRN Number"
                                                        InputProps={{readOnly:true}}
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
                                <GridItem xs={12} sm={12} md={4}  >

                                    <TextField id="rejectedDate" style={{backgroundColor:"#f5f7f7"}} variant="outlined" label="Rejected Date " value={this.state.approvedate}
                                       InputLabelProps={{ shrink: true }}
                                          //type="date" 
                                     
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
                                                        label="Raw Material"
                                                        variant="outlined"
                                                        fullWidth="true"
                                                        InputProps={{readOnly: true,}} 
                                                        value={this.state.material}
                                                        style={{backgroundColor:"#f5f7f7"}}
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
                                           
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="batchnumber" style={{backgroundColor:"#f5f7f7"}} fullWidth="true"  InputProps={{readOnly: true,}}  variant="outlined" label={"Batch Number"} value={this.state.batchnumber}
                                                        onChange={(event) => {
                                                            this.setState({ batchnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityReceived" style={{backgroundColor:"#f5f7f7"}}    InputProps={{readOnly: true,}}  fullWidth="true" type="number" variant="outlined" label={"Received Quantity(" +this.state.unit+ ")"} value={this.state.recieved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ recieved_quantity: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField id="quantityApproved" style={{backgroundColor:"#f5f7f7"}}  InputProps={{readOnly: true,}} fullWidth="true" type="number" variant="outlined" label={"Approved Quantity(" +this.state.unit+ ")"} value={this.state.approved_quantity}
                                                        onChange={(event) => {
                                                            this.setState({ approved_quantity: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>

                                            </GridContainer>

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}  >
                                                    <TextField 
                                                    id="manufacturedate" 
                                                    style={{backgroundColor:"#f5f7f7"}} 
                                                    fullWidth="true"   
                                                    InputProps={{readOnly: true,}}  
                                                    variant="outlined" 
                                                    label="Manufacture Date " 
                                                    value={this.state.mfg_date}
                                                        onChange={(event) => {
                                                            this.setState({ mfg_date: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField 
                                                    id="expirydate" 
                                                    style={{backgroundColor:"#f5f7f7"}} 
                                                    InputProps={{readOnly: true,}}  
                                                    fullWidth="true" 
                                                    variant="outlined" 
                                                    label="Expiry Date " 
                                                    value={this.state.exp_date}
                                                        onChange={(event) => {
                                                            this.setState({ exp_date: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <TextField 
                                                    id="qcNumber" 
                                                    style={{backgroundColor:"#f5f7f7"}} 
                                                    InputProps={{readOnly: true,}}  
                                                    fullWidth="true" 
                                                    variant="outlined" 
                                                    label="QC Number " 
                                                    value={this.state.qcnumber}
                                                    
                                                    onChange={(event) => {
                                                            this.setState({ qcnumber: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>

                                            <GridContainer>
                                            <TextField 
                                                    id="reason" 
                                                    style={{backgroundColor:"#f5f7f7"}} 
                                                    InputProps={{readOnly: true,}} 
                                                    InputLabelProps={{ shrink: true }} 
                                                    fullWidth="true" 
                                                    variant="outlined" 
                                                    label="Reason " 
                                                    value={this.state.remarks}
                                                    onChange={(event) => {
                                                        this.setState({ remarks: event.target.value })
                                                    }}
                                                  
                                                    />
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
                          Return Material
                        </Button>
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>

                {this.state.show && (
          <div id="hide">
            <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
            
            <h2>Material Return Note</h2>
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
              <td style={{ width: "200px" }}>QC No:</td>
              <td style={{textAlign: "left", width: "200px" }}>{this.state.qcnumber}</td>

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
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>GRN No: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.grnnumber}</td>
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
            <td style={{textAlign: "left", width: "200px" }}>{this.state.approved_quantity}</td>
            <td style={{textAlign: "left", width: "200px" }}><b></b></td>
            <td style={{textAlign: "left", width: "200px" }}> </td>
            </tr>
            <tr style={{border: "1px solid black" }}>
            <td style={{textAlign: "left", width: "200px", border: "1px solid black"}}><b>Reason: </b></td>
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
