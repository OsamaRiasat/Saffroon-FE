import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PrintIcon from "@material-ui/icons/Print";
import Issue_Batch_No from "../../Services/QA/Issue_Batch_No.js";

export default class issueBtachNo extends Component {
  async componentDidMount() {
    const plans = (await Issue_Batch_No.methods.PlanNoBIR()).data;
    console.log(plans);
    this.setState({
      plans: plans,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      plan: "",
      pcodes: [],
      pcode: "",

      Dosage: "",
      EXP_Date: "",
      MFG_Date: "",
      Product: "",
      batchNo: "",
      batchSize: "",

      formulations:[]
    };
  }
  getPcodes = async (planno) => {
    const pcodes = (await Issue_Batch_No.methods.PCodeBIR(planno)).data;
    console.log(pcodes);
    this.setState({
      pcodes: pcodes,
    });
  };
  getAutoFill = async () => {
    const payload = {
      planNo: this.state.plan,
      ProductCode: this.state.pcode,
    };
    const data = (await Issue_Batch_No.methods.IssueBatchNo(payload)).data;
    console.log(data);
    this.setState({
      Dosage: data.Dosage,
      EXP_Date: data.EXP_Date,
      MFG_Date: data.MFG_Date,
      Product: data.Product,
      batchNo: data.batchNo,
      batchSize: data.batchSize,
    });
  };
  getFormulation = async () => {
    if (this.state.pcode === "" || this.state.batchSize === "") {
      alert("Product Code or Bath Size is Missing !!!!");
    } else {
        this.state.batchSize=parseInt(this.state.batchSize)
      const payload = {
        Pcode: this.state.pcode,
        batchSize: this.state.batchSize,
      };
      const formula = (await Issue_Batch_No.methods.Formulation(payload)).data;
      console.log(formula);
      this.setState({
          formulations:formula
      })
    }
  };
  postData=async()=>{
      try{
          if(this.state.batchNo===""||this.state.plan===""||this.state.pcode===""||this.state.batchSize===""||this.state.MFG_Date===""||this.state.EXP_Date==="")
            {
                alert("Kindly Fill the form ")
            }
            else{   
            const expdate =   this.state.EXP_Date.split(".")   ;
            const exp=expdate[2]+"-"+expdate[1]+"-"+expdate[0]
            const mfgdate =   this.state.EXP_Date.split(".")   ;
            const mfg=mfgdate[2]+"-"+mfgdate[1]+"-"+mfgdate[0]
            console.log(expdate)  
            const payload= {
            "batchNo": this.state.batchNo,
            "planNo": this.state.plan,
            "ProductCode":this.state.pcode,
            "batchSize": this.state.batchSize,
            "MFGDate": mfg,
            "EXPDate": exp
          }
          const resp =(await Issue_Batch_No.methods.BPRLog(payload));
          console.log(resp);
          if(resp.status===201)
          {
          alert("Bach is Issued")
          this.clearForm()
          }
          else{
            alert("Bach is not Issued due to technical problem ")
          }
        }
        }
        catch(error){
            console.log(error);
            alert("Something Went Wrong !!")
        }
  }
  clearForm= async ()=>{

    this.setState({
       
        plan: "",
        pcode: "",
        Dosage: "",
        EXP_Date: "",
        MFG_Date: "",
        Product: "",
        batchNo: "",
        batchSize: "",
        formulations:[]
    })
  }

  render() {
    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    const products_array = [];
    for (let i=0 ; i < this.state.formulations.length;++i){
        let temp={
            id:i+1,
            type:this.state.formulations[i].Type,
            RMCode:this.state.formulations[i].RMCode,
            Material:this.state.formulations[i].Material,
            Qty:this.state.formulations[i].Quantity +" " +this.state.formulations[i].Units
        }
        products_array.push(temp)
    }
    const columns = [
       
      {
        field: "type",
        headerName: "Type",
        width: 140,
      },
      {
        field: "RMCode",
        headerName: "RMCode",
        width: 300,
      },
      {
        field: "Material",
        headerName: "Material",
        width: 300,
      },
     
      {
        field: "Qty",
        headerName: "Qty",

        width: 200,
      },
    ];
    console.log("states", this.state);
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h2 ><center>Issue Batch Number</center></h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id="date"
                      style={{ backgroundColor: "#ebebeb" }}
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      defaultValue={"Date: " + date}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      select
                      label="Plan No"
                      fullWidth="true"
                      variant="outlined"
                      value={this.state.plan}
                      onChange={(event) => {
                        this.setState(
                          {
                            plan: event.target.value,
                          },
                          () => {
                            this.getPcodes(event.target.value);
                          }
                        );
                      }}
                    >
                      {this.state.plans.map((plan) => (
                        <MenuItem key={plan.planNo} value={plan.planNo}>
                          {plan.planNo}
                        </MenuItem>
                      ))}
                    </TextField>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      select
                      label="Product Code"
                      fullWidth="true"
                      variant="outlined"
                      value={this.state.pcode}
                      onChange={(event) => {
                        this.setState(
                          {
                            pcode: event.target.value,
                          },
                          () => {
                            this.getAutoFill();
                          }
                        );
                      }}
                    >
                      {this.state.pcodes.map((pcode) => (
                        <MenuItem
                          key={pcode.ProductCode}
                          value={pcode.ProductCode}
                        >
                          {pcode.ProductCode}
                        </MenuItem>
                      ))}
                    </TextField>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      variant="outlined"
                      label="Dosage Form"
                      fullWidth="true"
                      value={this.state.Dosage}
                      InputProps={{ readOnly: true }}
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
                      value={this.state.batchNo}
                      InputProps={{ readOnly: true }}
                    ></TextField>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      label="Batch Size:"
                      fullWidth="true"
                      variant="outlined"
                      value={this.state.batchSize}
                      onChange={(event) => {
                        this.setState({
                          batchSize: event.target.value,
                        });
                      }}
                    ></TextField>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      label="MFG Date:"
                      fullWidth="true"
                      variant="outlined"
                      value={this.state.MFG_Date}
                      InputProps={{ readOnly: true }}
                    ></TextField>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      label="EXP Date:"
                      fullWidth="true"
                      variant="outlined"
                      value={this.state.EXP_Date}
                      InputProps={{ readOnly: true }}
                    ></TextField>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridItem>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => {
                      this.getFormulation();
                    }}
                  >
                    View Formula
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    onClick={()=>{
                        this.postData();
                    }}
                  >
                    Post
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button>
                </GridItem>
              </CardFooter>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <div style={{ height: 450, width: "100%" }}>
                        <DataGrid
                          rows={products_array}
                          columns={columns}
                          
                        ></DataGrid>
                      </div>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
