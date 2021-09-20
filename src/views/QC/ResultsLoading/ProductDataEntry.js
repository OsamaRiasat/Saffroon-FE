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
import MenuItem from "@material-ui/core/MenuItem";
import { DataGrid } from "@material-ui/data-grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import RM_Data_Entry from "../../../Services/QC/Product/Product_Data_Entry";

export default class DataEntryOfTestResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampling_date: "",
      analyst: "",
      qc_list: [],
      qc_no: "",
      igp_sample_req_no: "",
      code: "",
      name: "",
      mfg_date: "",
      exp_date: "",
      batch_lot: "",
      qty: "",
      approved_qty: "",
      rejected_qty: "",
      raw_data_ref: "",
      working_std_no: "",
      assigned_date: "",
      analysis_date: "",
      analysis_time: "",
      retest_date: "",
      cart: [],
      result: "",
      units: "",
      selectedRows: [],
      canResult: true,
      remarks: "",
      fdata: "",
      sdata: "",
      checkbox:false,
      
    };
  }

  async componentDidMount() {
    const qc = (await RM_Data_Entry.methods.RMQCNo()).data;
    this.setState({ qc_list: qc });
  }

  async fillSpecs(qc) {
    const temp = (await RM_Data_Entry.methods.RMQCNoSample(qc)).data;
    console.log(temp);
    this.setState({ sampling_date: temp.samplingDateTime });
    this.setState({ exp_date: temp.EXP_Date });
    this.setState({ igp_sample_req_no: temp.IGPNo });
    this.setState({ mfg_date: temp.MFG_Date });
    this.setState({ name: temp.Product });
    this.setState({ code: temp.ProductCode });
    this.setState({ units: temp.Units });
    this.setState({ igp_sample_req_no: temp.batchNo });
    this.setState({ analyst: temp.analyst });
    this.setState({ assigned_date: temp.assignedDateTime });
    this.setState({ batch_lot: temp.batchNo });
    this.setState({ qty: temp.quantityReceived });
    this.setState({
      fdata: temp.result.FirstData,
      sdata: temp.result.SecondData,
    });
    const temp2 = [];
    let arr = temp.result.list;
    for (let i = 0; i < arr.length; ++i) {
      let a = {
        parameter: arr[i].paramater,
        specification: arr[i].specification,
        result: "",
      };
      temp2.push(a);
    }
    this.setState({ cart: temp2 });
  }

  async postData() {
   
    try{
    const temp = this.state.cart.map((item) => {
      return {
        parameter: item.parameter,
        specification: item.specification,
        result: item.result,
      };
    });
    

    const payload = {
      QCNo: this.state.qc_no,
      workingStd: this.state.working_std_no,
      rawDataReference: this.state.raw_data_ref,
      analysisDateTime: this.state.analysis_date,
      retestDate: this.state.retest_date,
      quantityApproved: this.state.approved_qty,
      quantityRejected: this.state.rejected_qty,
      remarks: this.state.remarks,

      product_analysis_items: temp,
    };

    console.log(payload);

    const resp = await RM_Data_Entry.methods.PostRMAnalysis(payload);
    console.log(resp);
    alert("Data Entry Posted !!!");
    this.handleClearForm()
  }
  catch{
    alert("SOmething went Wrong !!!")
  }
  }
  handleValidation = () => {
    if (
      this.state.raw_data_ref === "" ||
      this.state.analysis_date === "" ||
      this.state.working_std_no === "" ||
      this.state.approved_qty === "" ||
      this.state.rejected_qty === "" ||
      this.state.retest_date === ""
    ) {
      alert("Some Data is Missing");
      return false;
    }
    return true;
  };

  handleClearForm=()=>{
    this.setState({ sampling_date:""  });
    this.setState({ exp_date: "" });
    this.setState({ igp_sample_req_no: "" });
    this.setState({ mfg_date: "" });
    this.setState({ name: "" });
    this.setState({ code: "" });
    this.setState({ units: "" });
    this.setState({ igp_sample_req_no:""  });
    this.setState({ analyst: "" });
    this.setState({ assigned_date: "" });
    this.setState({ batch_lot:"" });
    this.setState({ qty: "" });
    this.setState({
      fdata: "",
      sdata: "",
      qc_no:"",
      assigned_date: "",
      analysis_date: "",
      analysis_time: "",
      retest_date: "",
      approved_qty: "",
      rejected_qty: "",
      raw_data_ref: "",
      working_std_no: "",
      
    });
    this.setState({
      cart:""
    })
    this.handleClearResultsparas();
  }
  handleClearResultsparas=()=>{
    this.setState({
      result: "",
      canResult: false,
      
    })


  }

  render() {
    const products_array = [];
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: i + 1,
        parameter: this.state.cart[i].parameter,
        specification: this.state.cart[i].specification,
        result: this.state.cart[i].result,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "parameter",
        headerName: "Parameter",
        width: 210,
        editable: true,
      },
      {
        field: "specification",
        headerName: "Specification",
        width: 310,
        editable: true,
      },
      {
        field: "result",
        headerName: "Results",
        width: 300,
        editable: true,
      },
    ];

    return (
      <div style={{ marginTop: 50 }}>
        {console.log(this.state)}
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>
                Product Data Entry of Test Results
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
               
                  <CardContent>
                    <CardHeader color="info">
                      <h4>Sampling Information</h4>
                    </CardHeader>
                    <CardContent>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            select
                            variant="outlined"
                            label="QC No."
                            fullWidth="true"
                            value={this.state.qc_no}
                            onChange={(event) => {
                              this.setState({ qc_no: event.target.value });
                              this.fillSpecs(event.target.value);
                            }}
                          >
                            {this.state.qc_list.map((qc) => (
                              <MenuItem key={qc["QCNo"]} value={qc["QCNo"]}>
                                {qc["QCNo"]}
                              </MenuItem>
                            ))}
                          </TextField>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id="date"
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label={"Sampling Date: "}
                            value={this.state.sampling_date}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label="Analyst Name"
                            value={this.state.analyst}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            variant="outlined"
                            label="Batch No/Sample Req No."
                            fullWidth="true"
                            value={this.state.igp_sample_req_no}
                            InputProps={{ readOnly: true }}
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            value={this.state.code}
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label="Material Code:"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label="Material Name:"
                            value={this.state.name}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label="Mfg Date"
                            value={this.state.mfg_date}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            variant="outlined"
                            label="Exp Date"
                            value={this.state.exp_date}
                            fullWidth="true"
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            variant="outlined"
                            label="Batch/Lot"
                            fullWidth="true"
                            value={this.state.batch_lot}
                            InputProps={{ readOnly: true }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id="quantity"
                            fullWidth="true"
                            type="number"
                            variant="outlined"
                            label={
                              "Quantity Revieved (" + this.state.units + ")"
                            }
                            value={this.state.qty}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id=""
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label={"Assigned Date: "}
                            value={this.state.assigned_date}
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id=""
                            fullWidth="true"
                            variant="outlined"
                            label={"Raw Data Ref: "}
                            value={this.state.raw_data_ref}
                            onChange={(event) => {
                              this.setState({
                                raw_data_ref: event.target.value,
                              });
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id="approv"
                            fullWidth="true"
                            type="number"
                            variant="outlined"
                            label={"Approved Qty (" + this.state.units + ")"}
                            value={this.state.approved_qty}
                            onChange={(event) => {
                              this.setState({
                                approved_qty: event.target.value,
                              });
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id=""
                            fullWidth="true"
                            type="number"
                            variant="outlined"
                            label={"Rejected Qty (" + this.state.units + ")"}
                            value={this.state.rejected_qty}
                            onChange={(event) => {
                              this.setState({
                                rejected_qty: event.target.value,
                              });
                            }}
                          />
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id=""
                            fullWidth="true"
                            variant="outlined"
                            label={"Working Std No. "}
                            value={this.state.working_std_no}
                            onChange={(event) => {
                              this.setState({
                                working_std_no: event.target.value,
                              });
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id=""
                            fullWidth="true"
                            type="datetime-local"
                            format="dd/MM/yyyy"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            label={"Analysis Date:"}
                            value={this.state.analysis_date}
                            onChange={(event) => {
                              this.setState({
                                analysis_date: event.target.value,
                              });
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id=""
                            fullWidth="true"
                            type="datetime-local"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            label={"Retest Date: "}
                            value={this.state.retest_date}
                            onChange={(event) => {
                              this.setState({
                                retest_date: event.target.value,
                              });
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardContent>

                    <CardHeader
                      color="primary"
                      style={{
                        padding: "5px",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}
                    >
                      <h3>Results</h3>
                    </CardHeader>
                    <CardContent>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <TextField
                            id=""
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label={"Test Parameter:"}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={5}>
                          <TextField
                            id=""
                            fullWidth="true"
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            label={"Specification: "}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={2}>
                          <TextField
                            id=""
                            fullWidth="true"
                            variant="outlined"
                            label={"Result: "}
                            value={this.state.result}
                            onChange={(event) => {
                              this.setState({ result: event.target.value });
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={this.state.canResult}
                            onClick={() => {
                              try{
                              var array = [...this.state.cart];
                              var index = -1;
                              for (let i = 0; i < this.state.cart.length; ++i) {
                                if (
                                  products_array[i].id ===
                                  this.state.selectedRows[0]
                                ) {
                                  index = i;
                                  break;
                                }
                              }

                              if (index !== -1) {
                                array[index].result = this.state.result;
                                this.setState({ cart: array });
                              }
                              this.handleClearResultsparas();
                            }
                            catch{
                              alert("Technically Error Occured duruing Assigning Result !!");
                            }
                            }}
                          
                          >
                            Add Result
                          </Button>
                        </GridItem>
                      </GridContainer>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={7}>
                          <span>
                            <strong>Reference Specs:</strong>
                            {this.state.fdata}
                          </span>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={5}>
                          <span>
                            <strong>Specification No:</strong>
                            {this.state.sdata}
                          </span>
                        </GridItem>
                      </GridContainer>

                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          <div style={{ height: 450, width: "100%" }}>
                            <DataGrid
                              rows={products_array}
                              columns={columns}
                              checkboxSelection
                              
                              onSelectionModelChange={(event,selection) => {
                                console.log(selection)
                                this.setState({ selectedRows: event });

                                if (event.length === 1) {
                                  this.setState({ canResult: false });
                                } else {
                                  this.setState({ canResult: true });
                                }
                              }}
                            />
                          </div>
                        </GridContainer>
                      </GridItem>

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={10}>
                          <TextField
                            id=""
                            style={{ width: "100%" }}
                            label="Remarks"
                            multiline
                            variant="outlined"
                            value={this.state.value}
                            onChange={(event) => {
                              this.setState({ remarks: event.target.value });
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => {
                              if (this.handleValidation()) {
                                this.postData();
                              }
                            }}
                          >
                            Post
                          </Button>
                        </GridItem>
                      </GridContainer>
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
