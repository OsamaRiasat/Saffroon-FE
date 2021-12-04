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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PrintIcon from "@material-ui/icons/Print";
import MenuItem from "@material-ui/core/MenuItem";
import Line_Clearance from "../../Services/Production/Line_Clearance.js";

import {
	PCodesForLineClearance,
	BatchNoBYPCode,
	WhenBatchNoIsSelected,
} from "../../Services/Production/Line_Clearance";

export default class LineClearanceRequest extends Component {
  async componentDidMount() {
    const pcodes = (await PCodesForLineClearance()).data;
    console.log(pcodes);
    this.setState({
      pcodes: pcodes,
    });
  }
  printData = () => {
    var divToPrint = document.getElementById("hide");
    if(divToPrint==="" || divToPrint === null)
    {
      return
    }
    else{
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
      pcode: "",
      pname: "",
      batch: "",
      batchsize: "",
      mfg_date: "",
      exp_date: "",
      status: "",
      batches: [],
      canprint:false

    });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,

      pcodes: [],
      pcode: "",
      pnames: [],
      pname: "",
      batches: [],
      batch: "",
      batchsize: "",
      mfg_date: "",
      exp_date: "",
      status: "",
      stages: [],

      canprint: false,
    };
  }

  handleGetBatches = async (pcode) => {
    const batches = (await BatchNoBYPCode(pcode)).data;
    console.log(batches);
    this.setState({
      batches: batches,
    });
  };
  handleGetPrintData = async (batchno) => {
    const data = (await WhenBatchNoIsSelected(batchno))
      .data;
    console.log(data);
    const startdate = data.mfgDate.split("-");
    const completiondate = data.expDate.split("-");

    this.setState(
      {
        stages: data.stagesList,
        status: data.currentStage,
        batchsize: data.batchSize,
        mfg_date: startdate[2] + "-" + startdate[1] + "-" + startdate[0],
        exp_date:
          completiondate[2] + "-" + completiondate[1] + "-" + completiondate[0],
      },
      () => {
        this.setState({
          canprint: true,
        });
      }
    );
  };
  toggle = () =>
    this.setState({ show: !this.state.show }, () => {
      this.printData();
    });

  Generatestages = () => {
    try {
      const tabledata = this.state.stages.map((staged, index) => {
        var { stage, startDate, completion, yieldPercentage, stageStatus } =
          staged;
        const startdate = startDate.split("-");
        startDate = startdate[2] + "-" + startdate[1] + "-" + startdate[0];
        const completiondate = completion.split("-");
        completion =
          completiondate[2] + "-" + completiondate[1] + "-" + completiondate[0];
        return (
          <tr style={{ border: "1px solid black" }} key={index}>
            <td style={{ border: "1px solid black", width: "100px" }}>
              {index + 1}{" "}
            </td>
            <td style={{ border: "1px solid black", width: "200px" }}>
              {stage}
            </td>
            <td style={{ border: "1px solid black", width: "200px" }}>
              {startDate}
            </td>
            <td style={{ border: "1px solid black", width: "200px" }}>
              {completion}
            </td>
            <td style={{ border: "1px solid black", width: "200px" }}>
              {yieldPercentage} %
            </td>
            <td style={{ border: "1px solid black", width: "200px" }}>
              {stageStatus}
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

  render() {
    console.log(this.state);

    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>Line Clearance Request</h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card>
                  <CardHeader
                    color="info"
                    style={{
                      padding: "5px",
                      marginTop: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <h3>General Data</h3>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={date}
                          variant="outlined"
                          label={"Date: "}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id=""
                          select
                          variant="outlined"
                          label="Product Code:"
                          fullWidth="true"
                          value={this.state.pcode}
                          onChange={(event) => {
                            this.setState(
                              {
                                pcode: event.target.value,
                              },
                              () => {
                                this.handleGetBatches(event.target.value);
                              }
                            );
                          }}
                        >
                          {this.state.pcodes.map((pcode) => (
                            <MenuItem key={pcode} value={pcode}>
                              {pcode}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          select
                          variant="outlined"
                          label="Products Name :"
                          fullWidth="true"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <span style={{ fontSize: "20px" }}>
                          {this.state.status}
                        </span>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          select
                          variant="outlined"
                          label={"Batch No: "}
                          value={this.state.batch}
                          onChange={(event) => {
                            this.setState(
                              {
                                batch: event.target.value,
                              },
                              () => {
                                this.handleGetPrintData(event.target.value);
                              }
                            );
                          }}
                        >
                          {this.state.batches.map((batch) => (
                            <MenuItem key={batch.batchNo} value={batch.batchNo}>
                              {batch.batchNo}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Batch Size:"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.batchsize}
                          onChnage={(event) => {
                            this.setState({
                              batchsize: event.target.value,
                            });
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Mfg Date :"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.mfg_date}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Exp Date :"
                          InputProps={{ readOnly: true }}
                          fullWidth="true"
                          value={this.state.exp_date}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem md={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            this.toggle();
                          }}
                          disabled={!this.state.canprint}
                          startIcon={<PrintIcon />}
                        >
                          Print
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardContent>
                </Card>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>

        {this.state.show && (
          <div id="hide">
            <div style={{ textAlign: "center" }}>
              <span>Dated: {date}</span>
              <h3>Line Clearance Request for {this.state.status}</h3>

              <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                <tr style={{ border: "1px solid black", color: "#234564" }}>
                  <td></td>
                  <th>Product</th>
                  <th>Batch No</th>
                  <th>Batch Size</th>
                  <th>Mfg Date</th>
                  <th>Exp Date</th>
                </tr>
                <tr style={{ border: "1px solid black" }}>
                  <td>Current</td>
                  <td style={{ border: "1px solid black", width: "200px" }}>
                    {this.state.pcode}
                  </td>
                  <td style={{ border: "1px solid black", width: "200px" }}>
                    {this.state.batch}
                  </td>
                  <td style={{ border: "1px solid black", width: "200px" }}>
                    {this.state.batchsize}
                  </td>
                  <td style={{ border: "1px solid black", width: "200px" }}>
                    {this.state.mfg_date}
                  </td>
                  <td style={{ border: "1px solid black", width: "200px" }}>
                    {this.state.exp_date}
                  </td>
                </tr>
                <tr style={{ border: "1px solid black" }}>
                  <td>Previous</td>
                  <th
                    style={{ border: "1px solid black", height: "40px" }}
                  ></th>
                  <th style={{ border: "1px solid black" }}></th>
                  <th style={{ border: "1px solid black" }}></th>
                  <th style={{ border: "1px solid black" }}></th>
                  <th style={{ border: "1px solid black" }}></th>
                </tr>
              </table>
              <p>
                <strong>
                  Line Clearance is required for{" "}
                  <span> {this.state.status} </span>{" "}
                </strong>
              </p>
              <p>Batch History of Previous Stages:</p>

              <table
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderCollapse: "collapse",
                }}
              >
                <tr style={{ border: "1px solid black", color: "#234564" }}>
                  <td style={{ border: "1px solid black", width: "100px" }}>
                    Sr.{" "}
                  </td>
                  <th style={{ border: "1px solid black", width: "200px" }}>
                    Stage
                  </th>
                  <th style={{ border: "1px solid black", width: "200px" }}>
                    Start Date
                  </th>
                  <th style={{ border: "1px solid black", width: "200px" }}>
                    Completion
                  </th>
                  <th style={{ border: "1px solid black", width: "200px" }}>
                    Percentage Yield
                  </th>
                  <th style={{ border: "1px solid black", width: "200px" }}>
                    Stage Status
                  </th>
                </tr>
                {this.Generatestages()}
              </table>

              <br />
              <br />
              <br />
              <br />

              <div style={{ display: "flex" }}>
                <div style={{ textAlign: "left", marginRight: "600px" }}>
                  <p>
                    <span>
                      <strong>Production Pharmacist/Supervisor:</strong>
                    </span>
                  </p>
                  ________________________________________
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>
                    <span>
                      <strong>QA Officer/Inspector:</strong>
                    </span>
                  </p>
                  ________________________
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
