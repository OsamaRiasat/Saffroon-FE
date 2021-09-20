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

export default class ReqForBatchIssuence extends Component {
  async componentDidMount() {
    const plans = (await Batch_Issuance_Request.methods.PlanNo()).data;
    console.log(plans);
    this.setState({
      plans: plans,
    });
  }
  getPcodes = async (planno) => {
    const pcodes = (
      await Batch_Issuance_Request.methods.ProductByPlanNo(planno)
    ).data;
    console.log(pcodes);
    this.setState({
      pcodes: pcodes,
    });
  };
  getbatchSize = async (pcode) => {
    const batchsize = (await Batch_Issuance_Request.methods.SBS(pcode)).data;

    console.log(batchsize);
    this.setState({
      units: batchsize.Units,
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
      const payload = {
        noOfBatches: this.state.no_of_batches,
        planNo: this.state.plan,
        ProductCode: this.state.pcode,
      };
      const resp = await Batch_Issuance_Request.methods.BatchIssuenceRequest( payload);
      console.log(resp);
      if (resp.status === 201) {
        alert("Request Sent !!");
        this.clearForm();
      } else {
        alert("Request Not sent");
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong !!!");
    }
  };
  clearForm = () => {
    this.setState({
      plan: "",
      no_of_batches: "",
      units: "",
      pcode: "",
      pcodes: [],
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      plan: "",
      no_of_batches: "",
      units: "",
      pcodes: [],
      pcode: "",
    };
  }
  render() {
    console.log("States", this.state);
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}> Request for Batch Issuence </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardContent>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={2}>
                      <TextField
                        id=""
                        select
                        variant="outlined"
                        label="Plan No:"
                        fullWidth="true"
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
                        variant="outlined"
                        label="Product Codes"
                        fullWidth="true"
                        value={this.state.pcode}
                        onChange={(event) => {
                          this.setState(
                            {
                              pcode: event.target.value,
                            },
                            () => {
                              this.getbatchSize(event.target.value);
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
                        label="No. of Batches"
                        fullWidth="true"
                        value={this.state.no_of_batches}
                        type="number"
                        onChange={(event) => {
                          this.setState({
                            no_of_batches: event.target.value,
                          });
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
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
