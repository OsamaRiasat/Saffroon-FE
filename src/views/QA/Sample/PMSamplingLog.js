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
  GRNOList,
  RecievingDetailByGRNo,
  Sample,
} from "../../../Services/QA/PM_Sample";

export default class PMSamplingLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grno_List: [],
      addData_List: [],

      deliveredBy_List: [{ Name: "Saad" }, { Name: "Usama" }],
      recievedBy_List: [{ rname: "Asad" }, { rname: "Usman" }],

      grn_no: "",
      material: "",
      code: "",
      mfg: "",
      exp: "",
      batchNo: "",
      supplier: "",
      quantity: "",
      unit: "",
      noOfContainers: "",
      qcNo: "",
      deliveredBy: "",
      recievedBy: "",
      fieldErrors: {},
    };
  }

  async componentDidMount() {
    const grnlist = (await GRNOList()).data;

    this.setState({ grno_List: grnlist });
    console.log(this.state.grno_List);
  }

  setvalues = async (id) => {
    console.log(id);
    const resp = (await RecievingDetailByGRNo(id)).data;
    console.log(resp);
    this.setState({
      material: resp.Material,
      code: resp.PMCode,
      mfg: resp.MFG_Date,
      exp: resp.EXP_Date,
      batchNo: resp.Batch_No,
      supplier: resp.supplierName,
      quantity: resp.Recieved_Quantity,
      unit: resp.units,
      noOfContainers: resp.containersReceived,
      qcNo: resp.QC_No,
    });
  };
  validate = (fields) => {
    const errors = {};
    if (!fields.grn_no) errors.grn_no = "GRN No Required";
    if (!fields.deliveredBy) errors.deliveredBy = "deliveredBy Required";
    if (!fields.recievedBy) errors.recievedBy = "recievedBy No Required";
    
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

      
      let { grn_no, deliveredBy, recievedBy} = this.state;

      const fieldErrors = this.validate({grn_no, deliveredBy, recievedBy });

      this.setState({ fieldErrors: fieldErrors });

      if (Object.keys(fieldErrors).length) return;

      const payload2 = {
        QCNo: this.state.qcNo,
        GRNo: this.state.grn_no,
        deliveredBy: this.state.deliveredBy,
        receivedBy: this.state.recievedBy,
      };
      this.clearForm();
     

      const resp = await Sample(payload2);
      console.log(resp.message);
      
      if (resp.status === 201) {
        toast.success("Sample Sent to QC !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      } else {
        toast.error("Sample could'nt be sent!!", {
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
  clearForm = () => {
    this.setState({
      grn_no: "",
      material: "",
      code: "",
      mfg: "",
      exp: "",
      batchNo: "",
      supplier: "",
      quantity: "",
      unit: "",
      noOfContainers: "",
      qcNo: "",
      deliveredBy: "",
      recievedBy: "",
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
                          placeholder="GRN No:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="grn_no"
                          isSearchable={true}
                          options={this.state.grno_List}
                          value={
                            this.state.grn_no
                              ? { GRNo: this.state.grn_no }
                              : null
                          }
                          getOptionValue={(option) => option.GRNo}
                          getOptionLabel={(option) => option.GRNo}
                          onChange={(value, select) => {
                            this.setState({
                              grn_no: value.GRNo,
                            });
                            this.setvalues(value.GRNo);
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.grn_no && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.grn_no}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          multiline
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Material:"
                          value={this.state.material}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Code:"
                          value={this.state.code}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Mfg Date:"
                          value={this.state.mfg}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Exp Date:"
                          value={this.state.exp}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Batch/Lot:"
                          value={this.state.batchNo}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Supplier:"
                          value={this.state.supplier}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Quantity:"
                          value={this.state.quantity}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
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
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="No. of Containers:"
                          value={this.state.noOfContainers}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="QC No:"
                          value={this.state.qcNo}
                          //   InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <Select
                          placeholder="Delivered By:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          name="deliveredBy"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.deliveredBy_List}
                          value={
                            this.state.deliveredBy
                              ? { Name: this.state.deliveredBy }
                              : null
                          }
                          getOptionValue={(option) => option.Name}
                          getOptionLabel={(option) => option.Name}
                          onChange={(value, select) => {
                            this.setState({
                              deliveredBy: value.Name,
                            });
                            this.onChangeClearError(select.name);
                          
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.deliveredBy && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.deliveredBy}
                      </span>
                    )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <Select
                          placeholder="Recieved By:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name="recievedBy"
                          isSearchable={true}
                          options={this.state.recievedBy_List}
                          value={
                            this.state.recievedBy
                              ? { rname: this.state.recievedBy }
                              : null
                          }
                          getOptionValue={(option) => option.rname}
                          getOptionLabel={(option) => option.rname}
                          onChange={(value, select) => {
                            this.setState({
                              recievedBy: value.rname,
                            });
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.recievedBy && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.recievedBy}
                      </span>
                    )}
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
