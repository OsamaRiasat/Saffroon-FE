import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { toast } from "react-toastify";
import Select, { components } from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import {
  PCodeBPR,
  BatchNoandBatchesList,
  GeneralDataBPRLog,
  BatchStages,
  getProductName,
} from "../../Services/Production/Batch_Track";

export default class BatchTaP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      production_code_list: [],
      product: "",
      batch_no_list: [],
      production_code: "",
      batch_size: "",
      start_date: "",
      completion_date: "",
      uom_list: ["kg", "mg", "ml","no","tablet", "capsule","vial"],
      T_yield: "",
      A_yield: "",
      P_yield: "",
      remarks: "",
      uom: "",
      stage_list: [],
      stage: "",
      result_list: ["Complete", "Partial"],
      result: "",
      selected: {
        batch_no: "",
        batch_size: "",
        mfg_date: "",
        exp_date: "",
        current_stage: "",
        batch_status: "",
        in_progress: "",
        packed: "",
        P_yield: "",
      },
      listOfStages: [],
      cart1: [],
      cart2: [],
      batch_selected: false,
      fieldErrors: {},
    };
  }

  async componentDidMount() {
    const pc = (await PCodeBPR()).data;
    this.setState({ production_code_list: pc });
  }

  async handlePCode(cod) {
    const ls = (await BatchNoandBatchesList(cod)).data;
    console.log(ls);

    this.setState({ cart1: ls });
    let temp_batches = [];
    for (let i = 0; i < ls.length; ++i) {
      temp_batches.push(ls[i].batchNo);
    }
    this.setState({ batch_no_list: temp_batches });
  }

  getProductName = async (pcode) => {
    const productName = (await getProductName(pcode)).data;
    this.setState({
      product: productName.Product,
    });
  };

  async handleCode(cod) {
    let obj = {
      ProductCode: this.state.production_code,
      batchNo: cod,
    };
    this.setState({ batch_selected: true });
    const res = (await GeneralDataBPRLog(obj)).data;
    console.log("secondAPI: ", res);
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        batch_no: res["batchNo"],
        batch_size: res.batchSize,

        mfg_date: res["MFGDate"],
        exp_date: res["EXPDate"],
        current_stage: res["currentStage"],
        batch_status: res["batchStatus"],
      },
    }));
    this.setState(
      {
        listOfStages: res["ListOfStages"],
        T_yield: res.batchSize,
        A_yield: res.batchSize,
      },
      () => {
        this.handleYields();
      }
    );
    this.setState({ cart2: res["ListToBeAddedInTable"] });
  }

  handleYields() {
    if (this.state.T_yield == "" || this.state.A_yield == "") {
      this.setState({ P_yield: "" });
    } else {
      let a = parseInt(this.state.A_yield);
      let t = parseInt(this.state.T_yield);
      let x = (a / t).toFixed(2);
      x = x * 100;

      console.log("jlfdsk ", a, t, x);

      this.setState({ P_yield: x });
    }
  }

  async handlePost() {
    try {
      let res = {
        batchNo: this.state.selected.batch_no,
        openingDate: this.state.start_date,
        closingDate: this.state.completion_date,
        currentStage: this.state.stage,
        units: this.state.uom,
        theoreticalYield: this.state.T_yield,
        actualYield: this.state.A_yield,
        yieldPercentage: this.state.P_yield,
        PartialStatus: this.state.selected.current_stage,
        remarks: this.state.remarks,
      };

      const fieldErrors = this.validate(this.state);

      this.setState({ fieldErrors: fieldErrors });

      if (Object.keys(fieldErrors).length) return;

      const ans = await BatchStages(res);
      console.log(ans);
      if (ans.status === 201) {
        toast.success("Data Posted");
        this.handleClearForm();
      } else {
        toast.error("Data is not posted");
      }
    } catch (error) {
      toast.error("Exception Thrown : Something Went Wrong !!!");
    }
  }
  handleClearForm = () => {
    this.setState((prevState) => ({
      selected: {
        // object that we want to update
        ...prevState.selected, // keep all other key-value pairs
        batch_no: "",
        batch_size: "",

        mfg_date: "",
        exp_date: "",
        current_stage: "",
        batch_status: "",
        P_yield: "",
      },
    }));
    this.setState({ listOfStages: [], T_yield: "", A_yield: "" });
    this.setState({
      cart2: [],
      cart1: [],
      data: "",

      batch_no_list: [],
      production_code: "",
      product: "",
      uom: "",
      remarks: "",
      result: "",
      batch_size: "",
      start_date: "",
      completion_date: "",
      stage_list: [],
      P_yield: "",
      fieldErrors: {},
    });
  };

  validate = (fields) => {
    const errors = {};
    if (!fields.selected.batch_no) {
      errors.batch_no = "Batch No Required";
    }
    if (!fields.production_code) {
      errors.production_code = "Production Code Required";
      return errors;
    }

    if (!fields.selected.batch_no) {
      errors.batch_no = "Batch No Required";
      return errors;
    }

    if (!fields.start_date) errors.start_date = "Start Date Required";
    if (!fields.completion_date)
      errors.completion_date = "Completion Date Required";

    if (!fields.uom) errors.uom = "Unit Required";
    if (!fields.T_yield) errors.T_yield = "Theoretical Yield Required";
    if (!fields.A_yield) errors.A_yield = "Actual Yield Required";
    if (!fields.P_yield) errors.P_yield = "Percentage Yield Required";
    if (!fields.remarks) errors.remarks = "Remarks Required";
    if (!fields.stage) errors.stage = "Stage Required";

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

  render() {
    console.log("SSSSS", this.state);
    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    const products_array1 = [];
    for (let i = 0; i < this.state.cart1.length; ++i) {
      let temp = {
        id: i + 1,
        batchno: this.state.cart1[i].batchNo,
        mfgdate: this.state.cart1[i].MFGDate,
        expdate: this.state.cart1[i].EXPDate,
        currentstage: this.state.cart1[i].currentStage,
        packed: this.state.cart1[i].packed,
        inprocess: this.state.cart1[i].inProgress,
        peryield: this.state.cart1[i].yieldPercentage,
        Status: this.state.cart1[i].batchStatus,
      };
      products_array1.push(temp);
    }
    const products_array2 = [];
    for (let i = 0; i < this.state.cart2.length; ++i) {
      let temp = {
        id: i + 1,
        p_status: this.state.cart2[i].PartialStatus,
        a_yield: this.state.cart2[i].actualYield,
        c_date: this.state.cart2[i].closingDate,
        c_stage: this.state.cart2[i].currentStage,
        o_date: this.state.cart2[i].openingDate,
        t_yield: this.state.cart2[i].theoreticalYield,
        units: this.state.cart2[i].units,
        per_yield: (
          parseInt(this.state.cart2[i].actualYield) /
          parseInt(this.state.cart2[i].theoreticalYield)
        ).toFixed(2),
      };
      products_array2.push(temp);
    }
    const columns1 = [
      {
        field: "batchno",
        headerName: "Batch No.",
        width: 140,
        editable: true,
      },
      {
        field: "mfgdate",
        headerName: "Mfg Date",
        width: 150,
        editable: true,
      },
      {
        field: "expdate",
        headerName: "Exp Date",
        width: 140,
        editable: true,
      },
      {
        field: "currentstage",
        headerName: "Current Stage",
        width: 170,
        editable: true,
      },
      {
        field: "packed",
        headerName: "Packed",
        width: 130,
        editable: true,
      },
      {
        field: "inprocess",
        headerName: "In-Process",
        width: 170,
        editable: true,
      },
      {
        field: "peryield",
        headerName: "Percentage Yield",
        width: 190,
        editable: true,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 130,
        editable: true,
      },
    ];
    const columns2 = [
      {
        field: "p_status",
        headerName: "Partial Status.",
        width: 140,
        editable: true,
      },
      {
        field: "o_date",
        headerName: "Opening Date",
        width: 150,
        editable: true,
      },
      {
        field: "c_date",
        headerName: "Completion Date",
        width: 190,
        editable: true,
      },
      {
        field: "c_stage",
        headerName: "Complete Stage",
        width: 130,
        editable: true,
      },
      {
        field: "a_yield",
        headerName: "Actual Yield",
        width: 220,
        editable: true,
      },
      {
        field: "t_yield",
        headerName: "Theoretical Yield",
        width: 190,
        editable: true,
      },
      {
        field: "per_yield",
        headerName: "Percentage Yield",
        width: 210,
        editable: true,
      },
      {
        field: "units",
        headerName: "Units",
        width: 130,
        editable: true,
      },
    ];
    const products_array =
      this.state.batch_selected === true ? products_array2 : products_array1;
    const columns = this.state.batch_selected === true ? columns2 : columns1;
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>
                Batch Tracking and Posting
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardContent>
                  <CardHeader
                    color="info"
                    style={{
                      padding: "5px",
                      marginTop: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <h4>General Data</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={date}
                          variant="outlined"
                          label="Date: "
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <Select
                          name="production_code"
                          placeholder="Select Product Code"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.production_code_list}
                          value={
                            this.state.production_code
                              ? { ProductCode: this.state.production_code }
                              : null
                          }
                          getOptionValue={(option) => option.ProductCode}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(value, select) => {
                            this.handleClearForm();
                            this.setState({
                              production_code: value.ProductCode,
                            });
                            this.handlePCode(value.ProductCode);
                            this.getProductName(value.ProductCode);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.production_code && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.production_code}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Product :"
                          variant="outlined"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={this.state.product}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <span style={{ fontSize: "20px" }}>
                          {this.state.selected.current_stage}
                        </span>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <Select
                          name="batch_no"
                          placeholder="Select Batch No"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.batch_no_list.map((t) => ({
                            value: t,
                            label: t,
                          }))}
                          value={
                            this.state.selected && this.state.selected.batch_no
                              ? { label: this.state.selected.batch_no }
                              : null
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          onChange={(value, select) => {
                            this.setState((prevState) => ({
                              selected: {
                                // object that we want to update
                                ...prevState.selected, // keep all other key-value pairs
                                batch_no: value.value,
                              },
                            }));
                            this.handleCode(value.value);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.batch_no && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.batch_no}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Batch Size:"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.selected.batch_size}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Mfg Date :"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.selected.mfg_date}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Exp Date :"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.selected.exp_date}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Start Date :"
                          fullWidth="true"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.start_date}
                          name="start_date"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.start_date
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.start_date
                          }
                          onChange={(event) => {
                            this.setState({ start_date: event.target.value });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Completion dt:"
                          fullWidth="true"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.completion_date}
                          name="completion_date"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.completion_date
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.completion_date
                          }
                          onChange={(event) => {
                            this.setState({
                              completion_date: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardContent>

                  <CardHeader
                    color="danger"
                    style={{
                      padding: "5px",
                      marginTop: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <h4>Yeild Calculation</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          name="uom"
                          placeholder="Select UOM"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.uom_list.map((t) => ({
                            value: t,
                            label: t,
                          }))}
                          value={
                            this.state.uom ? { label: this.state.uom } : null
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          onChange={(value, select) => {
                            this.setState({
                              uom: value.value,
                            });
                            this.onChangeClearError(select.name);
                          }}
                        />

                        {this.state.fieldErrors &&
                          this.state.fieldErrors.uom && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.uom}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                          }}
                          label="Theoretical Yield:"
                          fullWidth="true"
                          value={this.state.T_yield}
                          name="T_yield"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.T_yield
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.T_yield
                          }
                          onChange={(event) => {
                            this.setState(
                              { T_yield: event.target.value },
                              () => {
                                this.handleYields();
                              }
                            );
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          type="number"
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                          }}
                          variant="outlined"
                          label="Actual Yield:"
                          fullWidth="true"
                          value={this.state.A_yield}
                          name="A_yield"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.A_yield
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.A_yield
                          }
                          onChange={(event) => {
                            this.setState(
                              { A_yield: event.target.value },
                              () => {
                                this.handleYields();
                              }
                            );
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Percentage Yield ( % )"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.P_yield}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Remarks:"
                          multiline
                          fullWidth="true"
                          value={this.state.remarks}
                          name="remarks"
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
                        />
                      </GridItem>
                    </GridContainer>
                  </CardContent>

                  <CardHeader
                    color="success"
                    style={{
                      padding: "5px",
                      marginTop: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <h4>Posting</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <Select
                          name="stage"
                          placeholder="Select Stage"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.listOfStages.map((t) => ({
                            value: t,
                            label: t,
                          }))}
                          value={
                            this.state.stage
                              ? { label: this.state.stage }
                              : null
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          onChange={(value, select) => {
                            this.setState({
                              stage: value.value,
                            });
                            this.onChangeClearError(select.name);
                          }}
                        />

                        {this.state.fieldErrors &&
                          this.state.fieldErrors.stage && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.stage}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={5}>
                        <Select
                          name="result"
                          placeholder="Partial/Complete"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.result_list.map((t) => ({
                            value: t,
                            label: t,
                          }))}
                          value={
                            this.state.result
                              ? { label: this.state.result }
                              : null
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          onChange={(value, select) => {
                            this.setState({
                              result: value.value,
                            });
                            this.onChangeClearError(select.name);
                          }}
                        />

                        {this.state.fieldErrors &&
                          this.state.fieldErrors.result && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.result}
                            </span>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<CloudUploadIcon />}
                          onClick={() => {
                            this.handlePost();
                          }}
                        >
                          Post
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
                          />
                        </div>
                      </GridContainer>
                    </GridItem>
                  </CardContent>
                </CardContent>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
