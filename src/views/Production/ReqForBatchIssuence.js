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
import PrintIcon from "@material-ui/icons/Print";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DataGrid } from "@material-ui/data-grid";
import GetAppIcon from "@material-ui/icons/GetApp";
import Batch_Issuance_Request from "../../Services/Production/Batch_Issuance_Request.js";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import {
  PlanNo,
  ProductByPlanNo,
  SBS,
  BatchIssuenceRequest,
  Required_batches_by_product_and_planNo,
} from "../../Services/Production/Batch_Issuance_Request";

export default class ReqForBatchIssuence extends Component {
  async componentDidMount() {
    const plans = (await PlanNo()).data;
    console.log(plans);
    this.setState({
      plans: plans,
    });
  }
  getPcodes = async (planno) => {
    const pcodes = (await ProductByPlanNo(planno)).data;
    console.log(pcodes);
    this.setState({
      pcodes: pcodes,
      pcode: pcodes[0].ProductCode,
    });
  };
  getbatchSize = async (planno,pcode) => {
    const batchsize = (await SBS(pcode)).data;
    const nbtp = (await Required_batches_by_product_and_planNo(planno, pcode)).data;
    console.log(batchsize);
    this.setState({
      units: batchsize.Units,
      batches_to_be_planned: nbtp,
    });
  };
  sendRequest = async () => {
    try {
      // {
      //   "id": 0,
      //   "noOfBatches": 0,
      //   "planNo": 0,
      //   "ProductCode": "string"
      // }
      let { no_of_batches, plan, pcode } = this.state;

      const fieldErrors = this.validate({ no_of_batches, plan, pcode });

      this.setState({ fieldErrors: fieldErrors });

      if (Object.keys(fieldErrors).length) return;

      const payload = {
        noOfBatches: this.state.no_of_batches,
        planNo: this.state.plan,
        ProductCode: this.state.pcode,
      };
      const resp = await BatchIssuenceRequest(payload);
      console.log(resp);
      if (resp.status === 201) {
        toast.success("Request Sent !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // alert("Request Sent !!");
        this.clearForm();
      } else {
        toast.error("Request Not sent", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // alert("Request Not sent");
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
      // alert("Something Went Wrong !!!");
    }
  };

  validate = (fields) => {
    const errors = {};
    if (!fields.plan) errors.plan = "Plan No Required";
    if (!fields.pcode) errors.pcode = "Product Code Required";
    if (!fields.no_of_batches ) errors.no_of_batches = "No Of Batches Required";
    else if (fields.no_of_batches > this.state.batches_to_be_planned) errors.no_of_batches = "No Of Batches Exceeds Planned Batches";
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

  clearForm = () => {
    this.setState({
      plan: "",
      no_of_batches: "",
      units: "",
      pcode: "",
      pcodes: [],
      fieldErrors: {},
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      plan: "",
      no_of_batches: "",
      batches_to_be_planned:"",
      units: "",
      pcodes: [],
      pcode: "",
      fieldErrors: {},
    };
  }
  render() {
    console.log("States", this.state);
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>
                {" "}
                Request for Batch Issuence{" "}
              </h2>
            </CardHeader>
            <CardBody>
              {/* <GridContainer> */}
              <CardContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <Select
                      name="plan"
                      placeholder="Select Plan"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.plans}
                      value={
                        this.state.plan ? { planNo: this.state.plan } : null
                      }
                      getOptionValue={(option) => option.planNo}
                      getOptionLabel={(option) => option.planNo}
                      onChange={(value, select) => {
                        this.setState(
                          {
                            plan: value.planNo,
                            pcode: "",
                            no_of_batches: "",
                          },
                          () => {
                            this.getPcodes(value.planNo);
                          }
                        );
                        console.log(value, select.name);
                        this.onChangeClearError(select.name);
                      }}
                    />
                    {this.state.fieldErrors && this.state.fieldErrors.plan && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.plan}
                      </span>
                    )}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Select
                      name="pcode"
                      placeholder="Select Product Code"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.pcodes}
                      value={
                        this.state.pcode
                          ? { ProductCode: this.state.pcode }
                          : null
                      }
                      getOptionValue={(option) => option.ProductCode}
                      getOptionLabel={(option) => option.ProductCode}
                      onChange={(value, select) => {
                        this.setState(
                          {
                            pcode: value.ProductCode,
                            no_of_batches: "",
                          },
                          () => {
                            this.getbatchSize(this.state.plan,value.ProductCode);
                          }
                        );
                        this.onChangeClearError(select.name);
                      }}
                    />
                    {this.state.fieldErrors && this.state.fieldErrors.pcode && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.pcode}
                      </span>
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      id=""
                      variant="outlined"
                      label="Batches to be planned:"
                      fullWidth="true"
                      value={this.state.batches_to_be_planned}
                      InputProps={{ readOnly: true }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      variant="outlined"
                      label="No. of Batches"
                      fullWidth="true"
                      name="no_of_batches"
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.no_of_batches
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.no_of_batches
                      }
                      value={this.state.no_of_batches}
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      onChange={(event) => {
                        this.setState({
                          no_of_batches: event.target.value,
                        });
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
                      value={this.state.units}
                      InputProps={{ readOnly: true }}
                    />
                  </GridItem>
                  

                
                </GridContainer>
                <GridContainer>
                 
                  <GridItem xs={12} sm={12} md={2}>
                    <Button
                      className=""
                      color="primary"
                      startIcon={<GetAppIcon />}
                      onClick={() => {
                        this.sendRequest();
                      }}
                    >
                      Request
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardContent>
              {/* </GridContainer> */}
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
