import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import PrintIcon from "@material-ui/icons/Print";
import RM_Reporting from "../../../Services/QC/RM/RM_Reporting.js";
import MenuItem from '@material-ui/core/MenuItem';

export default class DARM extends Component {
  async componentDidMount(){
    const data = ( await RM_Reporting.methods.RMDataAnalysis()).data;
    console.log(data);
    this.setState({
      cart:data,
    })
    this.handleMakeLists();
    // QCNo: "RM23232"
    // analysisDateTime: "2021-08-29 05:35:19.945000+00:00"
    // batchNo: "ok-12-12"
    // material: "New Coat Brown"
    // parameter: "Taste"
    // supplierName: "usama"
    


  }

handleMakeLists=()=>{

  var materials=this.state.cart.map((item)=>{
    
   
    return{
        material:item.material
    }
  })
  materials=materials.filter((v,i,a)=>a.findIndex(t=>(t.material === v.material))===i)
  console.log("materials",materials);

  this.setState({
    materials:materials,
  })

  // parmeters
  var parameter=this.state.cart.map((item)=>{
    
   
    return{
        parameter:item.parameter
    }
  })
  parameter=parameter.filter((v,i,a)=>a.findIndex(t=>(t.parameter === v.parameter))===i)
  console.log("parameter",parameter);

  this.setState({
    parameters:parameter,
  })
//supplier
  var supplier=this.state.cart.map((item)=>{
    
   
    return{
      supplierName:item.supplierName
    }
  })
  supplier=supplier.filter((v,i,a)=>a.findIndex(t=>(t.supplierName === v.supplierName))===i)
  console.log("supplier",supplier);

  this.setState({
    suppliers:supplier,
  })

  //QC
  var QClist=this.state.cart.map((item)=>{
    
   
    return{
      QCNo:item.QCNo
    }
  })
  QClist=QClist.filter((v,i,a)=>a.findIndex(t=>(t.QCNo === v.QCNo))===i)
  console.log("QClist",QClist);

  this.setState({
    QClist:QClist,
  })
  //Batch
  var batches=this.state.cart.map((item)=>{
    
   
    return{
      batchNo:item.batchNo
    }
  })
  batches=batches.filter((v,i,a)=>a.findIndex(t=>(t.batchNo === v.batchNo))===i)
  console.log("batches",batches);

  this.setState({
    batches:batches,
  })
}

handleGetData= async ()=>{
  console.log("Get Data",this.state.material,this.state.batch,this.state.QCNo,this.state.parameter,this.state.supplier)
  const data=(await RM_Reporting.methods.RMDataAnalysis(this.state.material,this.state.batch,this.state.QCNo,this.state.parameter,this.state.supplier)).data;
  console.log(data)
  this.setState({
    cart:data
  },()=>{
    this.handleMakeLists()
  })
}

  constructor(props){
    super(props)
    this.state={
      materials:[],
      batches:[],
      suppliers:[],
      QClist:[],
      parameters:[],

      material:"",
      batch:"",
      supplier:"",
      QCNo:"",
      parameter:"",

      cart:[]
    }
  }
  render() {
    const products_array = [];
    var count=0;
    for(let i=0 ; i < this.state.cart.length ; ++i)
    {
      count=count+1;
      let temp={
      id:count,
      materialName:this.state.cart[i].material,
      batch:this.state.cart[i].batchNo,
      qc:this.state.cart[i].QCNo,
      parameter:this.state.cart[i].parameter,
      supplier:this.state.cart[i].supplierName,
      analysisdate:this.state.cart[i].analysisDateTime,
      }
      products_array.push(temp);

    }
  
    const columns = [
      {
        field: "materialName",
        headerName: "Material Name",
        width: 230,
        editable: true,
      },
      {
        field: "batch",
        headerName: "Batch No.",
        width: 150,
        editable: true,
      },
      {
        field: "qc",
        headerName: "QC#",
        width: 110,
        editable: true,
      },
      {
        field: "parameter",
        headerName: "Parameter",
        width: 160,
        editable: true,
      },
      {
        field: "supplier",
        headerName: "Supplier",
        width: 160,
        editable: true,
      },
      {
        field: "analysisdate",
        headerName: "Analysis Date",
        width: 200,
        editable: true,
      },
    ];

    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 style={{ textAlign: "center" }}>
                Finished Goods Analysis Data
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                   
                      <CardHeader color="info">
                        <h4>RM Reports Parameter</h4>
                      </CardHeader>
                      <CardContent>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id=""
                              select
                              variant="outlined"
                              label="Material Name:"
                              fullWidth="true"
                              onChange={(event)=>{
                                this.setState({
                                  material:event.target.value
                                },()=>{
                                  this.handleGetData()
                                });
                                
                              }}
                            >
                              {this.state.materials.map((item) => (
                                
                                
                                <MenuItem key={item.material} value={item.material}>
                                {item.material}
                              </MenuItem>
                            ))}
                            </TextField>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
                            <TextField
                              id=""
                              select
                              variant="outlined"
                              label="Batch No."
                              fullWidth="true"
                              onChange={(event)=>{
                                this.setState({
                                  batch:event.target.value
                                },()=>{
                                  this.handleGetData()
                                });
                                
                              }}
                            >
                                {this.state.batches.map((item) => (
                                <MenuItem key={item.batchNo} value={item.batchNo}>
                                {item.batchNo}
                              </MenuItem>
                            ))}
                            </TextField>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={2}>
                            <TextField
                              id=""
                              select
                              variant="outlined"
                              label="QC No."
                              fullWidth="true"
                              onChange={(event)=>{
                                this.setState({
                                  QCNo:event.target.value
                                },()=>{
                                  this.handleGetData()
                                });
                                
                              }}
                            >
                              {this.state.QClist.map((item) => (
                                <MenuItem key={item.QCNo} value={item.QCNo}>
                                {item.QCNo}
                                </MenuItem>
                              ))}
                              </TextField>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={2}>
                            <TextField
                              id=""
                              select
                              variant="outlined"
                              label="Supplier"
                              fullWidth="true"
                              onChange={(event)=>{
                                this.setState({
                                  supplier:event.target.value
                                },()=>{
                                  this.handleGetData()
                                });
                                
                              }}
                            >
                               {this.state.suppliers.map((item) => (
                                <MenuItem key={item.supplierName} value={item.supplierName}>
                                {item.supplierName}
                                </MenuItem>
                              ))}
                              </TextField>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id=""
                              select
                              variant="outlined"
                              label="Parameter:"
                              fullWidth="true"
                              onChange={(event)=>{
                                this.setState({
                                  parameter:event.target.value
                                },()=>{
                                  this.handleGetData()
                                });
                               
                              }}
                            >
                               {this.state.parameters.map((item) => (
                                <MenuItem key={item.parameter} value={item.parameter}>
                                {item.parameter}
                                </MenuItem>
                              ))}
                              </TextField>
                          </GridItem>
                        </GridContainer>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={2}>
                            <Button color="primary" startIcon={<PrintIcon />}>
                              Print
                            </Button>
                          </GridItem>
                        </GridContainer>

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
                      </CardContent>
                    
                  </CardContent>
                </CardM>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
