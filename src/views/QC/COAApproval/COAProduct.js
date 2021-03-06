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
import Checkbox from "@material-ui/core/Checkbox";
import RM_COA_Approval from "../../../Services/QC/Product/Product_COA_Approval.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

export default class COARM extends Component {
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
      remarks: "",
      show: false,
      reason: "",
      fdata: "",
      sdata: "",
      fieldErrors: {},
      options1 : [
        { value1: 'Released'  },
        { value1: 'Rejected' }
      ]
    };
  }

  async componentDidMount() {
    const qc = (await RM_COA_Approval.methods.RMAnalysisQCNo()).data;
    this.setState({ qc_list: qc });
  }

  async fillSpecs(qc) {
    const temp = (await RM_COA_Approval.methods.RMAnalysis(qc)).data;
    console.log("temp",temp);
    this.setState({ exp_date: temp.EXP_Date });
    this.setState({ igp_sample_req_no: temp.IGPNo });
    this.setState({ mfg_date: temp.MFG_Date });
    this.setState({ name: temp.Product });
    this.setState({ code: temp.ProductCode });
    this.setState({ units: temp.Units });
    this.setState({ analysis_date: temp.analysisDateTime });
    this.setState({ assigned_date: temp.assignedDateTime });
    this.setState({ igp_sample_req_no: temp.IGPNo });
    this.setState({ analyst: temp.analyst });
    this.setState({ assigned_date: temp.assignedDateTime });
    this.setState({ batch_lot: temp.batchNo });
    this.setState({ qty: temp.quantityReceived });
    this.setState({ working_std_no: temp.workingStd });
    this.setState({ approved_qty: temp.quantityApproved });
    this.setState({ rejected_qty: temp.quantityRejected });
    this.setState({ sampling_date: temp.samplingDateTime });
    this.setState({ retest_date: temp.retestDate });
    this.setState({ raw_data_ref: temp.rawDataReference });
    this.setState({ fdata: temp.FirstData });
    this.setState({ sdata: temp.SecondData });
    const temp2 = [];
    let arr = temp.items;
    for (let i = 0; i < arr.length; ++i) {
      let a = {
        parameter: arr[i].parameter,
        specification: arr[i].specification,
        result: arr[i].result,
      };
      temp2.push(a);
    }
    this.setState({ cart: temp2 });
  }

  async postData() {
    try{
      let { qc_no , result} = this.state;

      const fieldErrors = this.validate({ qc_no, result });

      this.setState({ fieldErrors: fieldErrors });
      
      if (Object.keys(fieldErrors).length) return;
    const payload = {
      remarks: this.state.remarks,
      isRetest: this.state.show,
      retestReason: this.state.reason,
      result: this.state.result,
    };
    const qc = this.state.qc_no;
    const resp = await RM_COA_Approval.methods.PostRMCOAApproval(qc, payload);
    console.log(resp);
    // alert("Certified !!");
    if (this.state.result === "Rejected"){
      toast.success("Material Rejected");
    }
    else{
      toast.success("Material Released");
    }
    this.handleClearForm();
    
  }
  catch(error){
    console.log(error);
    // alert("Something Went Wrong !!")
    toast.error("Data cannot be posted");
  }
  }
handleValidate=()=>{
    if(this.state.result==="")
    {
        return false
    }
    else if (this.state.show && this.state.reason ==="")
    {
        return false
    }
    return true
}
validate = (fields) => {
  const errors = {};
  if (!fields.qc_no) errors.qc_no = "QC No Required*";
  if (!fields.result) errors.result = "Result Required*";
 
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

handleClearForm=()=>{
  this.setState({
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
    remarks: "",
    show: false,
    reason: "",
    fdata: "",
    sdata: "",
  });
   

  // this.handleClearResultsparas();
} 
toggle = () =>
    this.setState((currentState) => ({ show: !currentState.show }));

  render() {
      console.log(this.state);
    const products_array = [];
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: i + 1,
        parameters: this.state.cart[i].parameter,
        specs: this.state.cart[i].specification,
        results: this.state.cart[i].result,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "parameters",
        headerName: "Parameter",
        width: 210,
       
      },
      {
        field: "specs",
        headerName: "Specification",
        width: 310,
       
      },
      {
        field: "results",
        headerName: "Results",
        width: 300,
       
      },
    ];

    return (
      <div style={{ marginTop: 50 }}>
        {console.log(this.state)}
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h3 >
                Certificate of Approval - Product
              </h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    
                      <CardHeader color="info">
                        <h4>COA APPROVAL</h4>
                      </CardHeader>
                      <CardContent>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                        <Select
                      name="QC No"
                      placeholder="Select QC No"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.qc_list}
                      value={
                        this.state.qc_no
                          ? { QCNo: this.state.qc_no }
                          : null
                      }
                      getOptionValue={(option) => option.QCNo}
                      getOptionLabel={(option) => option.QCNo}
                      onChange={(value, select) => {
                        this.setState(
                          {
                            qc_no: value.QCNo,
                           
                          },
                          () => {
                            // this.getPcodes(value.planNo);
                            this.fillSpecs(value.QCNo);
                          }
                        );
                        console.log(value, select.name);
                        this.onChangeClearError(select.name);
                      }}
                    />
                    {this.state.fieldErrors && this.state.fieldErrors.qc_no&& (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.qc_no}
                      </span>
                    )}


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
                              label="IGP/Sample Req No."
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
                              label={"Quantity (" +this.state.units+ ")"}
                              value={this.state.qty}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id=""
                              fullWidth="true"
                              type="number"
                              variant="outlined"
                              label={"Approved Qty (" +this.state.units+ ")"}
                              value={this.state.approved_qty}
                            />
                          </GridItem>

                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id=""
                              fullWidth="true"
                              InputProps={{ readOnly: true }}
                              type="number"
                              variant="outlined"
                              label={"Rejected Qty (" +this.state.units+ ")"}
                              value={this.state.rejected_qty}
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
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <TextField
                              id=""
                              fullWidth="true"
                              variant="outlined"
                              label={"Working Std No. "}
                              value={this.state.working_std_no}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
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
                              label={"Analysis Date & Time:"}
                              value={this.state.analysis_date}
                            />
                          </GridItem>

                          {/* <GridItem xs={12} sm={12} md={4}>
                                                        <TextField id="" fullWidth="true" variant="outlined" label={"Analysis Time: "} value={this.state.analysis_time}
                                                        />
                                                    </GridItem> */}

                          <GridItem xs={12} sm={12} md={4}>
                            <TextField
                              id=""
                              fullWidth="true"
                              variant="outlined"
                              label={"Retest Date: "}
                              value={this.state.retest_date}
                            />
                          </GridItem>
                        </GridContainer>
                      </CardContent>
                   

                    
                      <CardHeader color="primary" style={{
                        padding: "5px",
                        marginTop: "10px",
                        paddingLeft: "20px",
                      }}>
                        <h4>Results</h4>
                      </CardHeader>
                      <CardContent>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={7}>
                            <span>
                              <strong>Reference Specs:  </strong>
                              {this.state.fdata}
                            </span>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={5}>
                            <span>
                              <strong>Specification No:  </strong>
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
                                
                                disableSelectionOnClick
                              />
                            </div>
                          </GridContainer>
                        </GridItem>

                        <GridContainer>
                        <GridItem xs={50} sm={50} md={4}>
                    <Select
                      name="Results"
                      placeholder="Select Result"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.options1}
                      value={
                        this.state.result
                          ? { value1: this.state.result }
                          : null
                      }
                      getOptionValue={(option) => option.value1}
                      getOptionLabel={(option) => option.value1}
                      onChange={(value) => {
                        console.log("Chnage");
                      this.setState({
                        result: value.value1,
                      });
                    }}
                    />
                      {this.state.fieldErrors &&
                          this.state.fieldErrors.result && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.result}
                            </span>
                          )}
                          </GridItem> 

                          <GridItem xs={12} sm={12} md={3}>
                            <FormControlLabel
                              control={<Checkbox color="primary" />}
                              label="Retest Advised"
                              onChange={this.toggle}
                            />
                          </GridItem>
                        </GridContainer>
                        {this.state.show && (
                          <div id="hide">
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <TextField
                                  id=""
                                  style={{ width: "100%" }}
                                  label="Explain Reason of Retest"
                                  multiline
                                  variant="outlined"
                                  value={this.state.reason}
                                  onChange={(event) => {
                                    this.setState({
                                      reason: event.target.value,
                                    });
                                  }}
                                />
                              </GridItem>
                            </GridContainer>
                          </div>
                        )}

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={10}>
                            <TextField
                              id=""
                              style={{ width: "100%" }}
                              label="Remarks"
                              multiline
                              variant="outlined"
                              value={this.state.remarks}
                              onChange={(event) => {
                                this.setState({ remarks: event.target.value });
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
                            <Button
                              variant="contained"
                              
                              startIcon={<CloudUploadIcon />}
                              onClick={() => {
                                // if (this.state.qc_no === "") {
                                //   alert("Please select a QC number first!");
                                // } else if(this.handleValidate()) {
                                //   this.postData();
                                // }else{
                                //     alert("Soe Data is missing ")
                                // }
                                this.postData();
                              }}
                            >
                              Post
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </CardContent>
                   
                  </CardContent>
                </CardM>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
