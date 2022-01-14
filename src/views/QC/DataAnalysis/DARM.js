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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";

export default class DARM extends Component {
  async componentDidMount() {
    const data = (await RM_Reporting.methods.RMDataAnalysis()).data;
    console.log(data);
    this.setState({
      cart: data,
    });
    this.handleMakeLists();
  }

  handleMakeLists = () => {
    var material = this.state.cart.map((item) => {
      return {
        material: item.material,
      };
    });
    material = material.filter(
      (v, i, a) => a.findIndex((t) => t.material === v.material) === i
    );
    console.log("datadata 2", material);
    this.setState({
      materials: material,
    });

    // parmeters
    var parameter = this.state.cart.map((item) => {
      return {
        parameter: item.parameter,
      };
    });
    parameter = parameter.filter(
      (v, i, a) => a.findIndex((t) => t.parameter === v.parameter) === i
    );
    console.log("datadata parameter", parameter);
    this.setState({
      parameters: parameter,
    });

   

    //supplier
    var supplier = this.state.cart.map((item) => {
      return {
        supplierName: item.supplierName,
      };
    });
    supplier = supplier.filter(
      (v, i, a) => a.findIndex((t) => t.supplierName === v.supplierName) === i
    );
    console.log("supplier", supplier);

    this.setState({
      suppliers: supplier,
    });

    //QC
    var QClist = this.state.cart.map((item) => {
      return {
        QCNo: item.QCNo,
      };
    });
    QClist = QClist.filter(
      (v, i, a) => a.findIndex((t) => t.QCNo === v.QCNo) === i
    );
    console.log("QClist", QClist);

    this.setState({
      QClist: QClist,
    });
    //Batch
    var batchesreset = this.state.cart.map((item) => {
      return {
        batchNo: item.batchNo,
      };
    });
    var batches = batchesreset.filter(
      (v, i, a) => a.findIndex((t) => t.batchNo === v.batchNo) === i
    );
    console.log("batches check", batches);
    this.setState({
      batches: batches,
    });
  };
  resetField = async () => {
    this.setState({ material: "" });
    this.setState({ batch: "" });
    this.setState({ supplier: "" });
    this.setState({ QCNo: "" });
    this.setState({ parameter: "" });
    const data = (await RM_Reporting.methods.RMDataAnalysis()).data;
    this.setState({
      cart: data,
    });
    this.handleMakeLists();
  };
  handleGetData = async () => {
    console.log(
      "Get Data",
      this.state.material,
      this.state.batch,
      this.state.QCNo,
      this.state.parameter,
      this.state.supplier
    );
    const data = (
      await RM_Reporting.methods.RMDataAnalysis(
        this.state.material,
        this.state.batch,
        this.state.QCNo,
        this.state.parameter,
        this.state.supplier
      )
    ).data;
    console.log("datadata", data);
    this.setState(
      {
        cart: data,
      },
      () => {
        this.handleMakeLists();
      }
    );
  };


  toggle = () =>
this.setState({ show: !this.state.show }, () => {
  this.printData();
});


printData = () => {
  var divToPrint = document.getElementById("hide");
  if (divToPrint === "" || divToPrint === null) {
    return;
  } else {
    console.log("hi", divToPrint);
    var newWin = window.open("");

    newWin.document.write(divToPrint.outerHTML);
    // console.log("FI",divToPrint.outerHTML)
    // newWin.focus();
    newWin.print();

    if (newWin.stop) {
      newWin.location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
      newWin.stop(); //immediately stop reloading
    }
    newWin.close();

    this.setState({
      show: !this.state.show,
    });
  }
};


GenerateSpecs = () => {
  try {
    const tabledata = this.state.cart.map((staged, index) => {
      var { material, batchNo , QCNo,parameter, specification,result, supplierName ,analysisDateTime} =
        staged;

      return (
        <tr style={{ border: "1px solid black" }} key={index}>
          <td style={{ border: "1px solid black", width: "100px" }}>
            {index + 1}{" "}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {material}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {batchNo}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {QCNo}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {parameter}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {specification}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {result}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {supplierName}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {analysisDateTime}
          </td>
         
        </tr>
      );
    });

    return tabledata;
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong");
  }
};


  constructor(props) {
    super(props);
    this.state = {
      materials: [],
      batches: [],
      suppliers: [],
      QClist: [],
      parameters: [],
      

      material: "",
      batch: "",
      supplier: "",
      QCNo: "",
      parameter: "",

      cart: [],

      show: false,
    };
  }
  render() {
    console.log("materials", this.statematerials);
    console.log("materials", this.state);
    console.log("batches", this.state.batches);
    console.log("QClist", this.state.QClist);
    console.log("suppliers", this.state.suppliers);
    console.log("parameters", this.stateparameters);
    const products_array = [];
    var count = 0;
    for (let i = 0; i < this.state.cart.length; ++i) {
      count = count + 1;
      let temp = {
        id: count,
        materialName: this.state.cart[i].material,
        batch: this.state.cart[i].batchNo,
        qc: this.state.cart[i].QCNo,
        parameter: this.state.cart[i].parameter,
        specification: this.state.cart[i].specification,
        result: this.state.cart[i].result,
        supplier: this.state.cart[i].supplierName,
        analysisdate: this.state.cart[i].analysisDateTime,
      };
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
        field: "specification",
        headerName: "Specification",
        width: 160,
        editable: true,
      },
      {
        field: "result",
        headerName: "Result",
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
                        <GridItem xs={12} sm={12} md={2}>
                          <Select
                            name="material"
                            placeholder="Material Name"
                            className="customSelect"
                            classNamePrefix="select"
                            isSearchable={true}
                            options={this.state.materials}
                            value={
                              this.state.material
                                ? { material: this.state.material }
                                : null
                            }
                            getOptionValue={(option) => option.material}
                            getOptionLabel={(option) => option.material}
                            onChange={(value) => {
                              this.setState(
                                { material: value.material },
                                () => {
                                  this.handleGetData();
                                }
                              );
                            }}
                          />
                          {/* <TextField
                            id=""
                            select
                            variant="outlined"
                            label="Material Name:"
                            fullWidth="true"
                            onChange={(event) => {
                              this.setState({
                                material: event.target.value
                              }, () => {
                                this.handleGetData()
                              });

                            }}
                          >
                            {this.state.materials.map((item) => (


                              <MenuItem key={item.material} value={item.material}>
                                {item.material}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <Select
                            name="batch"
                            placeholder="Batch No"
                            className="customSelect"
                            classNamePrefix="select"
                            isSearchable={true}
                            options={this.state.batches}
                            value={
                              this.state.batch
                                ? { batchNo: this.state.batch }
                                : null
                            }
                            getOptionValue={(option) => option.batchNo}
                            getOptionLabel={(option) => option.batchNo}
                            onChange={(value) => {
                              this.setState({ batch: value.batchNo }, () => {
                                this.handleGetData();
                              });
                              // this.fillAccCode(value.RMCode);
                            }}
                          />
                          {/* <TextField
                            id=""
                            select
                            variant="outlined"
                            label="Batch No."
                            fullWidth="true"
                            onChange={(event) => {
                              this.setState({
                                batch: event.target.value
                              }, () => {
                                this.handleGetData()
                              });

                            }}
                          >
                            {this.state.batches.map((item) => (
                              <MenuItem key={item.batchNo} value={item.batchNo}>
                                {item.batchNo}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={2}>
                          <Select
                            name="QCNo"
                            placeholder="QC No"
                            className="customSelect"
                            classNamePrefix="select"
                            isSearchable={true}
                            options={this.state.QClist}
                            value={
                              this.state.QCNo ? { QCNo: this.state.QCNo } : null
                            }
                            getOptionValue={(option) => option.QCNo}
                            getOptionLabel={(option) => option.QCNo}
                            onChange={(value) => {
                              this.setState({ QCNo: value.QCNo }, () => {
                                this.handleGetData();
                              });
                            }}
                          />
                          {/* <TextField
                            id=""
                            select
                            variant="outlined"
                            label="QC No."
                            fullWidth="true"
                            onChange={(event) => {
                              this.setState({
                                QCNo: event.target.value
                              }, () => {
                                this.handleGetData()
                              });

                            }}
                          >
                            {this.state.QClist.map((item) => (
                              <MenuItem key={item.QCNo} value={item.QCNo}>
                                {item.QCNo}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <Select
                            name="supplier"
                            placeholder="Supplier"
                            className="customSelect"
                            classNamePrefix="select"
                            isSearchable={true}
                            options={this.state.suppliers}
                            value={
                              this.state.supplier
                                ? { supplierName: this.state.supplier }
                                : null
                            }
                            getOptionValue={(option) => option.supplierName}
                            getOptionLabel={(option) => option.supplierName}
                            onChange={(value) => {
                              this.setState(
                                { supplier: value.supplierName },
                                () => {
                                  this.handleGetData();
                                }
                              );
                            }}
                          />
                          {/* <TextField
                            id=""
                            select
                            variant="outlined"
                            label="Supplier"
                            fullWidth="true"
                            onChange={(event) => {
                              this.setState({
                                supplier: event.target.value
                              }, () => {
                                this.handleGetData()
                              });

                            }}
                          >
                            {this.state.suppliers.map((item) => (
                              <MenuItem key={item.supplierName} value={item.supplierName}>
                                {item.supplierName}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={2}>
                          <Select
                            name="parameter"
                            placeholder="Parameter"
                            className="customSelect"
                            classNamePrefix="select"
                            isSearchable={true}
                            options={this.state.parameters}
                            value={
                              this.state.parameter
                                ? { parameter: this.state.parameter }
                                : null
                            }
                            getOptionValue={(option) => option.parameter}
                            getOptionLabel={(option) => option.parameter}
                            onChange={(value) => {
                              this.setState(
                                { parameter: value.parameter },
                                () => {
                                  this.handleGetData();
                                }
                              );
                            }}
                          />
                          {/* <TextField
                            id=""
                            select
                            variant="outlined"
                            label="Parameter:"
                            fullWidth="true"
                            onChange={(event) => {
                              this.setState({
                                parameter: event.target.value
                              }, () => {
                                this.handleGetData()
                              });

                            }}
                          >
                            {this.state.parameters.map((item) => (
                              <MenuItem key={item.parameter} value={item.parameter}>
                                {item.parameter}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={1}>
                          <Button
                            color="primary"
                            onClick={this.resetField}
                            // onClick={this.handleGetData}
                          >
                            Reset
                          </Button>
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={2}>
                          <Button color="primary" startIcon={<PrintIcon />}
                            onClick={() => {
                              this.toggle();
                            }}
                          >
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
        {this.state.show && (
          <div id="hide">
          <div style={{ textAlign: "center" }}>
            
            <h2>Data Analysis Log</h2>
          </div>

          <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderCollapse: "collapse",
            fontSize:"10px"
          }}>
            <thead style={{ border: "1px solid black", color: "#234564" }}>
              <th style={{ border: "1px solid black", width: "70px"}}>Sr. No </th>
              <th style={{ border: "1px solid black", width: "200px"}}>Material </th>
              <th style={{ border: "1px solid black", width: "200px" }}>Batch</th>
              <th style={{ border: "1px solid black", width: "200px" }}>QC No</th>
              <th style={{ border: "1px solid black", width: "200px" }}>Parameter</th>
              <th style={{ border: "1px solid black", width: "200px" }}>Specifications</th>
              <th style={{ border: "1px solid black", width: "200px" }}>Result</th>
              <th style={{ border: "1px solid black", width: "200px" }}>Supplier Name</th>
              <th style={{ border: "1px solid black", width: "200px" }}>analysisdate</th>

            </thead>
            <tbody>
            {this.GenerateSpecs()}
            </tbody>
          </table>

         
          </div>
        )}
    </div>
    );
  }
}

