import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import Select, { components } from "react-select";
import { toast } from "react-toastify";

import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

import {
  GetQcNo,
  PackingMaterialListFromSpecifications,
  SuppliersList,
  is_GRN_NO_Unique,
  // RecievingDetailByGRNo,
  Sample,
} from "../../../Services/QA/PM_Sample";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers.js";

export default class PMSamplingLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      send: false,
      pm_List: [],
      suppliers_list: [],
      addData_List: [],

      deliveredBy_List: [{ Name: "Saad" }, { Name: "Usama" }],
      recievedBy_List: [{ rname: "Asad" }, { rname: "Usman" }],

      GRN_No: "",
      material: "",
      PMCode: "",
      code: "",
      S_ID:"",
      S_Name:"",
      mfg: "",
      exp: "",
      batchNo: "",
      supplier: "",
      quantity: "",
      unit: "",
      noOfContainers: "",
      quantityReceived: "",
      qcNo: "",
      deliveredBy: "",
      recievedBy: "",
      fieldErrors: {},
    };
  }

  async componentDidMount() {
    const pm_List = (await PackingMaterialListFromSpecifications()).data;

    this.setState({ pm_List: pm_List });
    console.log(this.state.pm_List);

    const suppliers_list = (await SuppliersList()).data;
    this.setState({ suppliers_list: suppliers_list });
    console.log(this.state.suppliers_list);

    const qcNo = (await GetQcNo()).data;
    this.setState({ qcNo: qcNo.QC_No });
  }

  setvalues = async (id) => {
    // console.log(id);
    // const resp = (await RecievingDetailByGRNo(id)).data;
    // console.log(resp);
    // this.setState({
    //   material: resp.Material,
    //   code: resp.PMCode,
    //   mfg: resp.MFG_Date,
    //   exp: resp.EXP_Date,
    //   batchNo: resp.Batch_No,
    //   supplier: resp.supplierName,
    //   quantity: resp.Recieved_Quantity,
    //   unit: resp.units,
    //   noOfContainers: resp.containersReceived,
    //   qcNo: resp.QC_No,
    // });
  };
  isUnique = async (grn) => {
    const flag = await (is_GRN_NO_Unique(grn))
    console.log(flag.data);
    const errors ={}
    if (flag.data == false) {
      errors.GRN_No = "GRN_No Already Exists";
    this.setState({
      fieldErrors: errors,
      send: false
    })
    } else{
      this.setState({
        send: true
      })
    }
  };
  validate =  (fields) => {
    const errors = {};


    if (!fields.deliveredBy) errors.deliveredBy = "deliveredBy Required";
    if (!fields.recievedBy) errors.recievedBy = "recievedBy No Required";
    if (!fields.code) errors.code = "PM Code Required";
    if (!fields.quantityReceived) errors.quantityReceived = "quantityReceived Required";
    if (!fields.S_ID) errors.S_ID = "S_ID Required";
    if (!fields.mfg) errors.mfg = "PM Code Required";
    if (!fields.exp) errors.exp = "EXP Required";
    if (!fields.noOfContainers) errors.noOfContainers = "noOfContainers Required";
    if (!fields.GRN_No) errors.GRN_No = "GRN No Required";

    if (!fields.batchNo) errors.batchNo = "Batch No Required";
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


  sendRequest = async () => {
    try {
      //if (!this.state.send) return
      // const flag = false;
      // if (this.state.GRN_No){
      //  flag = await is_GRN_NO_Unique(this.state.GRN_No).data;
      // }
      let { qcNo, deliveredBy, recievedBy, code, quantityReceived, batchNo, S_ID, mfg, exp, noOfContainers, GRN_No } = this.state;

      const fieldErrors = this.validate({qcNo, deliveredBy, recievedBy, code, quantityReceived, batchNo, S_ID, mfg, exp, noOfContainers, GRN_No });

      this.setState({ fieldErrors: fieldErrors });
      console.log(Object.keys(fieldErrors));
      if (Object.keys(fieldErrors).length) return;

      console.log(this.state.PMCode+"HERE IS THE PMCode");
      const payload2 = {
        QCNo: this.state.qcNo,
        deliveredBy: this.state.deliveredBy,
        receivedBy: this.state.recievedBy,
        PMCode: this.state.code,
        quantityReceived: this.state.quantityReceived,
        batchNo: this.state.batchNo,
        S_ID: this.state.S_ID,
        MFG_Date: this.state.mfg,
        EXP_Date: this.state.exp,
        containersReceived: this.state.noOfContainers,
      };
      console.log(payload2);
      this.clearFoPM();



      const resp = await Sample(payload2);
      console.log(resp.message);
      this.componentDidMount();

      if (resp.status === 201) {
        toast.success("Sample Received !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        toast.error("Request Not Sent", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  clearFoPM = () => {
    this.setState({

      pm_List: [],
      suppliers_list: [],
      GRN_No: "",
      material: "",
      PMCode: "",
      code: "",
      S_ID:"",
      S_Name:"",
      mfg: "",
      exp: "",
      batchNo: "",
      supplier: "",
      quantity: "",
      unit: "",
      noOfContainers: "",
      quantityReceived: "",
      qcNo: "",
      deliveredBy: "",
      recievedBy: "",
      fieldErrors: {},
    });

    this.componentDidMount();
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
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>
                <center>Packing Material- Sampling Log</center>{" "}
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={2}>
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
                          placeholder="PM Code:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="code"
                          isSearchable={true}
                          options={this.state.pm_List}
                          value={
                            this.state.code
                              ? { PMCode: this.state.code }
                              : null
                          }
                          getOptionValue={(option) => option.PMCode}
                          getOptionLabel={(option) => option.PMCode}
                          onChange={(value, select) => {
                            this.setState({
                              code: value.PMCode,
                              material: value.Material,
                              unit: value.Unit,
                            });
                            // this.setvalues(value.GRNo);
                            this.onChangeClearError(select.name);
                            // this.onChangeClearError("material");
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.code && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.code}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Select
                          placeholder="Material:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="material"
                          isSearchable={true}
                          options={this.state.pm_List}
                          value={
                            this.state.material
                              ? { Material: this.state.material }
                              : null
                          }
                          getOptionValue={(option) => option.Material}
                          getOptionLabel={(option) => option.Material}
                          onChange={(value, select) => {
                            this.setState({
                              code: value.PMCode,
                              material: value.Material,
                              unit: value.Unit,
                            });
                            // this.setvalues(value.GRNo);
                            this.onChangeClearError(select.name);
                            this.onChangeClearError("code");
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.material && (
                      <span className="MuiFoPMHelperText-root Mui-error">
                        {this.state.fieldErrors.material}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Unit:"
                          value={this.state.unit}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Select
                          placeholder="Supplier ID:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="S_ID"
                          isSearchable={true}
                          options={this.state.suppliers_list}
                          value={
                            this.state.S_ID
                              ? { S_ID: this.state.S_ID }
                              : null
                          }
                          getOptionValue={(option) => option.S_ID}
                          getOptionLabel={(option) => option.S_ID}
                          onChange={(value, select) => {
                            this.setState({
                              S_ID: value.S_ID,
                              S_Name: value.S_Name,
                            });
                            // this.setvalues(value.GRNo);
                            this.onChangeClearError(select.name);
                            // this.onChangeClearError("S_Name");
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.S_ID && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.S_ID}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Select
                          placeholder="Supplier Name:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="S_Name"
                          isSearchable={true}
                          options={this.state.suppliers_list}
                          value={
                            this.state.S_Name
                              ? { S_Name: this.state.S_Name }
                              : null
                          }
                          getOptionValue={(option) => option.S_Name}
                          getOptionLabel={(option) => option.S_Name}
                          onChange={(value, select) => {
                            this.setState({
                              S_Name: value.S_Name,
                              S_ID: value.S_ID,
                            });
                            // this.setvalues(value.GRNo);

                            this.onChangeClearError(select.name);
                            this.onChangeClearError("S_ID");
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.S_Name && (
                      <span className="MuiFoPMHelperText-root Mui-error">
                        {this.state.fieldErrors.S_Name}
                      </span>
                    )}
                      </GridItem>


                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={2}>
                    <TextField
                          id=""
                          variant="outlined"
                          label="MFG_Date :"
                          fullWidth="true"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.mfg}
                          name="mfg"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.mfg
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.mfg
                          }
                          onChange={(event) => {
                            this.setState({ mfg: event.target.value });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                    {/* <TextField
                          id="mfg-date"
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          label="MFG Date"
                          fullWidth="true"
                          type="date"
                          onChange={(event) => {
                            this.setState({ mfg: event.target.value });
                          }}
                        /> */}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                      <TextField
                          id=""
                          variant="outlined"
                          label="EXP_Date :"
                          fullWidth="true"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={this.state.exp}
                          name="exp"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.exp
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.exp
                          }
                          onChange={(event) => {
                            this.setState({ exp: event.target.value });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      {/* <TextField
                          id="exp-date"
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          label="EXP Date"
                          fullWidth="true"
                          type="date"
                          onChange={(event) => {
                            this.setState({ exp: event.target.value });
                          }}
                        /> */}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          type="text"
                          fullWidth="true"
                          variant="outlined"
                          label="Batch/Lot:"
                          name= "batchNo"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.batchNo
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.batchNo
                          }
                          value={this.state.batchNo}
                          onChange={(event) => {
                            this.setState({
                              batchNo: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id=""
                          type="number"
                          fullWidth="true"
                          variant="outlined"
                          label="Quantity Received:"
                          name= "quantityReceived"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantityReceived
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantityReceived
                          }
                          value={this.state.quantityReceived}
                          onChange={(event) => {
                            this.setState({
                              quantityReceived: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      </GridContainer>
                    <GridContainer>




                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          type="number"
                          variant="outlined"
                          name= "noOfContainers"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.noOfContainers
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.noOfContainers
                          }
                          label="No. of Containers:"
                          value={this.state.noOfContainers}
                          onChange={(event) => {
                            this.setState({
                              noOfContainers: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}

                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          type="number"
                          variant="outlined"
                          name= "GRN_No"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.GRN_No
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.GRN_No
                          }
                          label="GRN No:"
                          value={this.state.GRN_No}
                          onChange={(event) => {
                            this.setState({
                              GRN_No: event.target.value,
                            });

                            this.onChangeClearError(event.target.name);
                          }}
                          onBlur= {
                            (event)=> {
                              this.isUnique(event.target.value);
                            }
                          }

                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>


                    <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          type="text"
                          fullWidth="true"
                          variant="outlined"
                          label="Delivered By:"
                          name= "deliveredBy"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.deliveredBy
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.deliveredBy
                          }
                          value={this.state.deliveredBy}
                          onChange={(event) => {
                            this.setState({
                              deliveredBy: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          type="text"
                          fullWidth="true"
                          variant="outlined"
                          label="Received By:"
                          name= "recievedBy"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.recievedBy
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.recievedBy
                          }
                          value={this.state.recievedBy}
                          onChange={(event) => {
                            this.setState({
                              recievedBy: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <Button
                          className=""
                          color="primary"
                          fullWidth="true"
                          onClick={() => {
                            this.sendRequest();
                          }}
                        >
                          Receive Sample
                        </Button>
                      </GridItem>
                    </GridContainer>
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
