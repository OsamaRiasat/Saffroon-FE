import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MenuItem from "@material-ui/core/MenuItem";
import RM_New_Formulation from "../../Services/Production/New_PMFormulation.js";
import { Alert, AlertTitle } from "@material-ui/lab";
import Select from "react-select";
import { toast } from "react-toastify";

import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import {
  PCodeList,
  PNameList,
  RMCodeList,
  RMNameList,
  PnameByPCode,
  PackSize,
  PCodeByPname,
  RMNameByRMCode,
  RMData,
  RMCodeByName,
  RMFormulation,
  batchsize,
} from "../../Services/Production/New_PMFormulation";

export default class RMNewFormulation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //API
      pCode: "",
      pCodeList: [],
      pName: "",
      pNameList: [],
      batchSize: "",
      rmCodeList: [],
      rmNameList: [],
      selected: {
        type: "",
        rmCode: "",
        rmName: "",
        unit: "",
        quantity: "",
      },
      selectedRows: [],
      canChange: true,
      canDelete: true,
      canUpDown: true,
      cart: [],
      error: false,
      packsizes: [],
      packsize: "",
      fieldErrors: {},
    };
  }

  clearSelect() {
    this.setState((prevState) => ({
      // pCode: "",
      // pName: "",
      // packsize: "",
      // batchSize: "",
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        type: "", // update the value of specific key
        rmCode: "",
        rmName: "",
        quantity: "",
        unit: "",
      },
      fieldErrors: "",
    }));
    // this.setState({pCode: ""});
    // this.setState({ pName: "" });
    // this.setState({batchSize: ""});
  }

  async componentDidMount() {
    const pCod = (await PCodeList()).data;
    this.setState({ pCodeList: pCod });
    const pNam = (await PNameList()).data;
    this.setState({ pNameList: pNam });
    const rmCod = (await RMCodeList()).data;
    this.setState({ rmCodeList: rmCod });
    const rmNam = (await RMNameList()).data;
    this.setState({ rmNameList: rmNam });
  }

  async handleProductSizeCod(cod) {
    const batchSize = (await batchsize(cod)).data;
    console.log(batchSize);
    this.setState({
      batchSize: batchSize.BatchSize,
    });
  }

  async handlePCod(cod) {
    const nam = (await PnameByPCode(cod)).data;
    this.setState({ pName: nam.Product });
    const packsizes = (await PackSize(cod)).data;
    console.log(packsizes);
    this.setState({
      packsizes: packsizes,
    });
  }
  async handlePName(nam) {
    const cod = (await PCodeByPname(nam)).data;
    this.setState({ pCode: cod.ProductCode }, async () => {
      const packsizes = (await PackSize(this.state.pCode)).data;
      console.log(packsizes);
      this.setState({
        packsizes: packsizes,
      });
    });
  }
  async handleRMCode(cod) {
    const nam = (await RMNameByRMCode(cod)).data;
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        rmName: nam.Material,
      },
    }));
    const res = (await RMData(cod)).data;
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        type: res.Type, // update the value of specific key
        unit: res.Units,
        rmName: res.Material,
      },
    }));
  }
  async handleRMName(nam) {
    const cod = (await RMCodeByName(nam)).data;
    this.setState(
      (prevState) => ({
        selected: {
          ...prevState.selected,
          rmCode: cod.PMCode,
        },
      }),
      () => {
        this.handleRMCode(cod.PMCode);
      }
    );

    console.log("code", cod);
  }
  // Validation
  validate = (fields) => {
    const errors = {};
    if (!fields.pCode) errors.pCode = "Plan No Required";
    if (!fields.pName) errors.pName = "Product Code Required";
    if (!fields.packsize) errors.packsize = "Product Code Required";
    if (!fields.batchSize) errors.batchSize = "Product Code Required";
    if (!fields.selected.type) errors.type = "Product Code Required";
    if (!fields.selected.rmCode) errors.rmCode = "Product Code Required";
    if (!fields.selected.rmName) errors.rmName = "Product Code Required";
    if (!fields.selected.quantity) errors.quantity = "Product Code Required";
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
  async handlePost() {
    try {
      var today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      if (this.state.cart.length !== 0) {
        const items = this.state.cart.map((item) => {
          return {
            ProductCode: this.state.pCode,
            PMCode: item.rmCode,
            batchSize: this.state.batchSize,
            quantity: item.quantity,
            date: date,
            docNo: "string",
            PackSize: this.state.packsize,
          };
        });
        const payload = {
          fItems: items,
        };
        const resp = await RMFormulation(payload);
        if (resp.status === 201) {
          toast.success("Data Saved!");
          this.setState({ cart: [], error: false });
        } else {
          toast.error("Exception thrown while sending request !!!");
        }
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  async updateCart() {
    return new Promise((resolve) => {
      this.setState(
        {
          cart: [...this.state.cart, this.state.selected],
        },
        () => resolve()
      );
    });
  }
  render() {
    console.log(this.state);
    const products_array = [];
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: i + 1,
        type: this.state.cart[i].type,
        rmCode: this.state.cart[i].rmCode,
        rmName: this.state.cart[i].rmName,
        unit: this.state.cart[i].unit,
        quantity: this.state.cart[i].quantity,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "type",
        headerName: "Type",
        width: 110,
        editable: true,
      },
      {
        field: "rmCode",
        headerName: "Material Code",
        width: 190,
        editable: true,
      },
      {
        field: "rmName",
        headerName: "Material",
        width: 220,
        editable: true,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 120,
        editable: true,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 210,
        editable: true,
      },
    ];
    return (
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>
                <center> New Formulation- Packing Material </center>{" "}
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="pCode"
                          placeholder="Select Product Code"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.pCodeList}
                          value={
                            this.state.pCode
                              ? { ProductCode: this.state.pCode }
                              : null
                          }
                          getOptionValue={(option) => option.ProductCode}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(value, select) => {
                            this.setState({
                              pCode: value.ProductCode,
                              fieldErrors: {
                                ...this.state.fieldErrors,
                                pName: "",
                                pCode: "",
                              },
                            });
                            this.handlePCod(value.ProductCode);
                            this.handleProductSizeCod(value.ProductCode);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.pCode && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.pCode}
                            </span>
                          )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="pName"
                          placeholder="Select Product"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.pNameList}
                          value={
                            this.state.pName
                              ? { Product: this.state.pName }
                              : null
                          }
                          getOptionValue={(option) => option.Product}
                          getOptionLabel={(option) => option.Product}
                          onChange={(value, select) => {
                            this.setState({
                              pName: value.Product,
                              fieldErrors: {
                                ...this.state.fieldErrors,
                                pName: "",
                                pCode: "",
                              },
                            });
                            this.handlePName(value.Product);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.pName && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.pName}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="packsize"
                          placeholder="Select Pack Size"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.packsizes}
                          value={
                            this.state.packsize
                              ? { PackSize: this.state.packsize }
                              : null
                          }
                          getOptionValue={(option) => option.PackSize}
                          getOptionLabel={(option) => option.PackSize}
                          onChange={(value, select) => {
                            this.setState({ packsize: value.PackSize });
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.packsize && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.packsize}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Batch Size:"
                          name="batchSize"
                          value={this.state.batchSize}
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0,
                              readOnly: true,
                            },
                          }}
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.batchSize
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.batchSize
                          }
                          onChange={(event) => {
                            this.setState({ batchSize: event.target.value });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="rmCode"
                          placeholder="Select PM Code"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.rmCodeList}
                          value={
                            this.state.selected && this.state.selected.rmCode
                              ? { PMCode: this.state.selected.rmCode }
                              : null
                          }
                          getOptionValue={(option) => option.PMCode}
                          getOptionLabel={(option) => option.PMCode}
                          onChange={(value, select) => {
                            this.setState((prevState) => ({
                              selected: {
                                ...prevState.selected,
                                rmCode: value.PMCode,
                              },
                              fieldErrors: {
                                ...this.state.fieldErrors,
                                rmCode: "",
                                rmName: "",
                                type: "",
                              },
                            }));
                            this.handleRMCode(value.PMCode);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.rmCode && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.rmCode}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="rmName"
                          placeholder="Select Material"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.rmNameList}
                          value={
                            this.state.selected && this.state.selected.rmName
                              ? { Material: this.state.selected.rmName }
                              : null
                          }
                          getOptionValue={(option) => option.Material}
                          getOptionLabel={(option) => option.Material}
                          onChange={(value, select) => {
                            this.setState((prevState) => ({
                              selected: {
                                ...prevState.selected,
                                rmName: value.Material,
                              },
                            }));
                            this.handleRMName(value.Material);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.rmName && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.rmName}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="priority"
                          label="Type"
                          fullWidth="true"
                          variant="outlined"
                          name="type"
                          InputProps={{
                            readOnly: true,
                          }}
                          value={this.state.selected.type}
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.type
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.type
                          }
                          onChange={(event) => {
                            this.setState((prevState) => ({
                              selected: {
                                // object that we want to update
                                ...prevState.selected, // keep all other key-value pairs
                                type: event.target.value, // update the value of specific key
                              },
                            }));
                            this.onChangeClearError(event.target.name);
                          }}
                        ></TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label={"Quantity"}
                          name="quantity"
                          value={this.state.selected.quantity}
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                          }}
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantity
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantity
                          }
                          onChange={(event) => {
                            this.setState((prevState) => ({
                              selected: {
                                // object that we want to update
                                ...prevState.selected, // keep all other key-value pairs
                                quantity: event.target.value, // update the value of specific key
                              },
                            }));
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Units"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={this.state.selected.unit}
                          onChange={(event) => {
                            this.setState((prevState) => ({
                              selected: {
                                // object that we want to update
                                ...prevState.selected, // keep all other key-value pairs
                                unit: event.target.value, // update the value of specific key
                              },
                            }));
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <Button
                          className=""
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={() => {
                            let present = false;
                            for (let i = 0; i < this.state.cart.length; ++i) {
                              if (
                                this.state.cart[i].rmCode ===
                                this.state.selected.rmCode
                              ) {
                                present = true;
                                break;
                              }
                            }

                            if (
                              this.state.pCode == "" ||
                              this.state.pName == "" ||
                              this.state.packsize == "" ||
                              this.state.batchSize == "" ||
                              this.state.selected.type == "" ||
                              this.state.selected.rmCode == "" ||
                              this.state.selected.rmName == "" ||
                              this.state.selected.quantity == "" ||
                              this.state.selected.unit == ""
                            ) {
                              const fieldErrors = this.validate(this.state);
                              this.setState({ fieldErrors: fieldErrors });
                              if (Object.keys(fieldErrors).length) return;
                            } else if (present === true) {
                              toast.error(
                                "This RMCode is already present in cart."
                              );
                            } else {
                              this.updateCart();
                              this.clearSelect();
                            }
                          }}
                          color="primary"
                        >
                          Add
                        </Button>
                        <Button
                          className=""
                          startIcon={<SaveIcon />}
                          onClick={() => {
                            if (this.state.cart.length < 1) {
                              toast.error("Enter Some Data First");
                            } else {
                              this.handlePost();
                            }
                          }}
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          className=""
                          startIcon={<EditIcon />}
                          disabled={this.state.canChange}
                          color="primary"
                          onClick={() => {
                            var array = [...this.state.cart];
                            var index = -1;
                            for (let i = 0; i < products_array.length; ++i) {
                              if (
                                products_array[i].id ===
                                this.state.selectedRows[0]
                              ) {
                                index = i;
                                break;
                              }
                            }

                            if (index !== -1) {
                              let temp = {
                                type: products_array[index].type,
                                rmCode: products_array[index].rmCode,
                                rmName: products_array[index].rmName,
                                unit: products_array[index].unit,
                                quantity: products_array[index].quantity,
                              };

                              this.setState({ selected: temp });
                              array.splice(index, 1);
                              this.setState({ cart: array });
                            }
                          }}
                        >
                          Change
                        </Button>
                        <Button
                          className=""
                          startIcon={<DeleteOutlineIcon />}
                          disabled={this.state.canDelete}
                          onClick={() => {
                            var array = [...this.state.cart];
                            var index = -1;
                            for (let i = 0; i < products_array.length; ++i) {
                              if (
                                products_array[i].id ===
                                this.state.selectedRows[0]
                              ) {
                                index = i;
                                break;
                              }
                            }

                            if (index !== -1) {
                              array.splice(index, 1);
                              this.setState({ cart: array });
                            }
                          }}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<ArrowUpwardIcon />}
                          disabled={this.state.canUpDown}
                          onClick={() => {
                            var array = [...this.state.cart];
                            for (
                              let x = 0;
                              x < this.state.selectedRows.length;
                              ++x
                            ) {
                              var index = -1;
                              for (let i = 0; i < products_array.length; ++i) {
                                if (
                                  products_array[i].id ===
                                  this.state.selectedRows[x]
                                ) {
                                  index = i;
                                  break;
                                }
                              }

                              if (index > 0) {
                                let t = array[index];
                                array[index] = array[index - 1];
                                array[index - 1] = t;
                                this.setState({ cart: array });
                              }
                            }
                          }}
                        ></Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<ArrowDownwardIcon />}
                          disabled={this.state.canUpDown}
                          onClick={() => {
                            var array = [...this.state.cart];
                            for (
                              let x = 0;
                              x < this.state.selectedRows.length;
                              ++x
                            ) {
                              var index = -1;
                              for (let i = 0; i < products_array.length; ++i) {
                                if (
                                  products_array[i].id ===
                                  this.state.selectedRows[x]
                                ) {
                                  index = i;
                                  break;
                                }
                              }

                              if (
                                index !== -1 &&
                                index < products_array.length - 1
                              ) {
                                let t = array[index];
                                array[index] = array[index + 1];
                                array[index + 1] = t;
                                this.setState({ cart: array });
                              }
                            }
                          }}
                        ></Button>
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

                              if (event.length === 1) {
                                this.setState({ canChange: false });
                                this.setState({ canDelete: false });
                                this.setState({ canUpDown: false });
                              } else {
                                this.setState({ canChange: true });
                                this.setState({ canDelete: true });
                                this.setState({ canUpDown: true });
                              }
                            }}
                          />
                        </div>
                      </GridContainer>
                    </GridItem>
                  </CardContent>
                </Card>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
