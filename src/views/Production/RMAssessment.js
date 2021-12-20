import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PrintIcon from "@material-ui/icons/Print";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "react-select";

import {
  ListOfPCodeForAssessment,
  ListOfPNameForAssessment,
  PackSizesList,
  PCodeByPNameAssessment,
  ViewFormulationForAssessment,
} from "../../Services/Production/RM_Assessment";

export default class RMAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pCodeList: [],
      pCode: "",
      productList: [],
      product: "",
      packSizeList: [],
      packSize: "",
      noOfBatches: "",
      batchSize: "",
      editBatchSize: false,
      code: "",
      name: "",
      unit: "",
      quantity: "",
      cart: [],
      selectedRows: [],
      prevNoBatch: 1,
      fieldErrors: {},
    };
  }

  async componentDidMount() {
    const pCodes = (await ListOfPCodeForAssessment()).data;
    const products = (await ListOfPNameForAssessment()).data;
    this.setState({ pCodeList: pCodes.List });
    this.setState({ productList: products.List });
    console.log("States", this.state);
  }

  validate = (fields) => {
    const errors = {};
    if (!fields.pCode) errors.pCode = "Product No Required";
    if (!fields.product) errors.product = "Product Required";
    return errors;
  };

  onChangeClearError = (name) => {
    let data = {
      ...this.state.fieldErrors,
      [name]: "",
    };
    this.setState({
      fieldErrors: data,
    });
  };

  handleQuantity(num) {
    if (isNaN(num)) {
      return;
    }
    if (num === "" || num === 0 || this.state.selectedRows.length !== 1) {
      this.setState({ quantity: num });
      return;
    }
    const std = (
      parseInt(this.state.noOfBatches) /
      parseFloat(this.state.cart[this.state.selectedRows[0] - 1].Quantity)
    ).toFixed(10);
    this.setState({ prevNoBatch: this.state.noOfBatches });
    this.setState(
      { noOfBatches: Math.round(std * num) < 1 ? 1 : Math.round(std * num) },
      this.handleNoOfBatches(
        Math.round(std * num) < 1 ? 1 : Math.round(std * num)
      )
    );
    console.log(this.state);
  }

  async handleCode(cod) {
    const res = (await PackSizesList(cod)).data;
    this.setState({ batchSize: res.batchSize });
    this.setState({ packSizeList: res.list });
    this.setState({ product: res.productName });
    this.setState({ noOfBatches: 1 });
  }
  async handleProduct(nam) {
    const cod = (await PCodeByPNameAssessment(nam)).data;
    this.setState({ pCode: cod.PCode });
    this.handleCode(cod.PCode);
  }
  async showCart() {
    this.setState({ editBatchSize: true });
    this.setState({ code: "" });
    this.setState({ name: "" });
    this.setState({ unit: "" });
    this.setState({ quantity: "" });

    const fieldErrors = this.validate(this.state);
    this.setState({ fieldErrors: fieldErrors });
    if (Object.keys(fieldErrors).length) return;

    const res = (
      await ViewFormulationForAssessment(
        this.state.pCode,
        this.state.batchSize,
        this.state.noOfBatches
      )
    ).data;
    this.setState({ cart: res });
  }
  handleSelected(ev) {
    console.log(ev, this.state.cart);
    if (ev == "" || ev.length > 1) {
      return;
    }
    ev = ev - 1;
    this.setState({ code: this.state.cart[ev].RMCode });
    this.setState({ name: this.state.cart[ev].Material });
    this.setState({ unit: this.state.cart[ev].Units });
    this.setState({ quantity: this.state.cart[ev].Quantity });
  }
  handleNoOfBatches(num) {
    if (isNaN(num)) {
      return;
    }
    if (num === 0 || num === "") {
      this.setState({
        noOfBatches: num,
      });
      return;
    }
    for (let i = 0; i < this.state.cart.length; ++i) {
      let arr = [...this.state.cart];
      const std =
        parseFloat(this.state.cart[i].Quantity) /
        parseInt(this.state.prevNoBatch);
      arr[i].Quantity = std * parseInt(num);
      this.setState({ cart: arr });
    }
    this.setState({
      prevNoBatch: num,
      noOfBatches: num,
    });
  }

  render() {
    const products_array = [];
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: i + 1,
        Type: this.state.cart[i].Type,
        RMCode: this.state.cart[i].RMCode,
        Material: this.state.cart[i].Material,
        Units: this.state.cart[i].Units,
        Quantity:
          this.state.noOfBatches === 0 || this.state.noOfBatches === ""
            ? 0
            : this.state.cart[i].Quantity,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "Type",
        headerName: "Type",
        width: 110,
        editable: true,
      },
      {
        field: "RMCode",
        headerName: "Code",
        width: 140,
        editable: true,
      },
      {
        field: "Material",
        headerName: "Material",
        width: 200,
        editable: true,
      },
      {
        field: "Units",
        headerName: "Unit",
        width: 120,
        editable: true,
      },
      {
        field: "Quantity",
        headerName: "Quantity",
        width: 160,
        editable: true,
      },
    ];

    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    return (
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>Raw Material Assessment</h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <TextField
                    id="date"
                    fullWidth="true"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    label="Date"
                    value={date}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    name="pCode"
                    placeholder="Select PCode"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.pCodeList.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    value={
                      this.state.pCode ? { label: this.state.pCode } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value, select) => {
                      this.setState({ pCode: value.value });
                      this.handleCode(value.value);
                      this.onChangeClearError(select.name);
                      this.setState({ fieldErrors: "" });
                    }}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.pCode && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.pCode}
                    </span>
                  )}

                  {console.log(this.state.fieldErrors, this.state)}
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    name="product"
                    placeholder="Select Product"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.productList.map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    value={
                      this.state.product ? { label: this.state.product } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value, select) => {
                      this.setState({ product: value.value });
                      this.handleProduct(value.value);
                      this.onChangeClearError(select.name);
                      this.setState({ fieldErrors: "" });
                    }}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.product && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.product}
                    </span>
                  )}
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"No of Batches: "}
                    value={this.state.noOfBatches}
                    onChange={(event) => {
                      this.handleNoOfBatches(event.target.value);
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Batch Size: "}
                    value={this.state.batchSize}
                    InputProps={{ readOnly: this.state.editBatchSize }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button>

                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<AssignmentTurnedInIcon />}
                    onClick={() => {
                      this.showCart();
                    }}
                  >
                    Check Stock
                  </Button>
                </GridItem>
              </GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <div style={{ height: 450, width: "100%" }}>
                    <DataGrid
                      rows={products_array}
                      columns={columns}
                      checkboxSelection
                      disableSelectionOnClick
                      onSelectionModelChange={(event) => {
                        this.setState({ selectedRows: event });
                        this.handleSelected(event);
                      }}
                    />
                  </div>
                </GridContainer>
              </GridItem>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    style={{ width: "100%" }}
                    label="Code"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    value={this.state.code}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    style={{ width: "100%" }}
                    label="Material"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    value={this.state.name}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    style={{ width: "100%" }}
                    label="Unit"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    value={this.state.unit}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    style={{ width: "100%" }}
                    label="Quantity"
                    variant="outlined"
                    value={this.state.quantity}
                    onChange={(event) => {
                      this.setState({ quantity: event.target.value });
                      this.handleQuantity(event.target.value);
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
