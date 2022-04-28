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
import Select from "react-select";
import {OpenBatches, CloseBPR} from "../../Services/QA/Close_Batch";
import { toast } from "react-toastify";
export default class CloseBatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart:[],
            batch_no: "",
           
            batchNo: "",
            MFGDate: "",
            EXPDate: "",
            currentStage: "",
            packed: 0,
            inProcess: "",
            yieldPercentage: "",
            batchStatus: ""

        }
    }

    async componentDidMount() {
        const resp = await OpenBatches();
      
        this.setState({
            cart: resp.data
        });
    }
  
    close = async () => {
        var today = new Date();
        let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      
        this.setState({ cart: [] , batch_no: "", batchNo: "", MFGDate: "", EXPDate: "", currentStage: "", packed: 0, inProcess: "", yieldPercentage: "", batchStatus: ""});
        const data = (await CloseBPR(this.state.batch_no, {
            "batchStatus": "CLOSED",
            "closingDate": "2022-04-23"
          })).status;
        
        if (data === 200) {
            //alert("PM Demand Raised");
            toast.success("Batch Closed !!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        } else {
            toast.error("Batch Cannot be closed !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
   
                });
        }
     this.componentDidMount();
      };
  
    render() {
        const products_array = [];
    var count = 0;
    for (let i = 0; i < this.state.cart.length; ++i) {
      count = count + 1;
      let temp = {
        id: count,
        batchNo: this.state.cart[i].batchNo,
                MFGDate: this.state.cart[i].MFGDate,
                EXPDate: this.state.cart[i].EXPDate,
                currentStage: this.state.cart[i].currentStage,
                packed: this.state.cart[i].packed,
                        inProcess: this.state.cart[i].inProcess,
                yieldPercentage: this.state.cart[i].yieldPercentage,  
      };
      products_array.push(temp);
    }
 
        const columns = [
            {
                field: "batchNo",
                headerName: "Batch No",
                width: 160,
                editable: true,
            },
            {
                field: "MFGDate",
                headerName: "MFG",
                width: 140,
                editable: true,
            },
            {
                field: "EXPDate",
                headerName: "EXP",
                width: 140,
                editable: true,
            },
            {
                field: "currentStage",
                headerName: "Current Stage",
                width: 180,
                editable: true,
            },
            {
                field: "packed",
                headerName: "Packed",
                width: 150,
                editable: true,
            },
            {
                field: "inProcess",
                headerName: "In-Process",
                width: 150,
                editable: true,
            },
            {
                field: "yieldPercentage",
                headerName: "Percentage Yield",
                width: 210,
                editable: true,
            },
            // {
            //     field: "product",
            //     headerName: "Product",
            //     width: 140,
            //     editable: true,
            // },
            // {
            //     field: "pcode",
            //     headerName: "Product Code",
            //     width: 180,
            //     editable: true,
            // },
            // {
            //     field: "batchsize",
            //     headerName: "Batch Size",
            //     width: 170,
            //     editable: true,
            // },
          
          
        ];
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
                            <h2 style={{ textAlign: "center" }}>Close Batch</h2>
                        </CardHeader>
                        <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                    <Select
                    placeholder="Batch No:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.cart}
                    value={
                      this.state.batch_no ? { batchNo: this.state.batch_no } : null
                    }
                    getOptionValue={(option) => option.batchNo}
                    getOptionLabel={(option) => option.batchNo}
                    onChange={(value) => {
                      this.setState({ batch_no: value.batchNo }, () => {
                        // this.handleGetData();
                      });
                    }}
                  />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={6}>
                                  <Button color="primary" onClick={this.close}>
                                   Close Batch
                                  </Button>
                                </GridItem>
                            </GridContainer>


                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <GridContainer>
                                        <div style={{ height: 450, width: "100%" }}>
                                            <DataGrid
                                                rows={products_array}
                                                columns={columns}
                                                disableSelectionOnClick
                                            />
                                        </div>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridContainer>

            </div>
        )
    }
}
