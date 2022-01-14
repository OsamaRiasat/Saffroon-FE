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
import PrintIcon from "@material-ui/icons/Print";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

export default class COARM extends Component {

    
  toggle = () =>
this.setState({ show1: !this.state.show1 }, () => {
  this.printData();
});


printData =  async () => {
  var divToPrint = document.getElementById("hide");
  if (divToPrint === "" || divToPrint === null) {
    return;
  } else {
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


    const qc = (await RM_COA_Approval.methods.RMAnalysisLogPrint(this.state.qc_no)).data;
    console.log(qc);
    this.setState({
      show1: !this.state.show1,
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
      ],

      show1: false,
      isPrint: true,
      canprint: false

    });

    this.componentDidMount();
    
  }
};


GenerateSpecs = () => {
  try {
    const tabledata = this.state.cart.map((staged, index) => {
      var { parameter, specification, result } =
        staged;
      
      return (
        <tr style={{ border: "1px solid black" }} key={index}>
          <td style={{ border: "1px solid black", width: "100px" }}>
            {index + 1}{" "}
          </td>
          <td style={{ border: "1px solid black", width: "200px" }}>
            {parameter}
          </td>
          <td style={{ border: "1px solid black", width: "300px" }}>
            {specification}
          </td>
          <td style={{ border: "1px solid black", width: "170px" }}>
            {result}
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
      ],

      show1: false,
      isPrint: true,
      canprint: false

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
    this.setState({ canprint: true });
  }

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
                        <TextField
                              id="date"
                              fullWidth="true"
                              InputProps={{ readOnly: true }}
                              variant="outlined"
                              label={"Result: "}
                              value={this.state.result}
                            />
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
                              InputProps={{ readOnly: true }}
                              variant="outlined"
                              value={this.state.remarks}
                              onChange={(event) => {
                                this.setState({ remarks: event.target.value });
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
                          <Button color="primary" startIcon={<PrintIcon />}
                          disabled={!this.state.canprint}
                           onClick={() => {
                            this.toggle();
                          }}
                          >
                            Print
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
        {this.state.show1 && (
          <div id="hide" >
          <div style={{ textAlign: "center" }}>
            
            <h2>TEST REPORTS</h2>
            <h3>Finsih Goods</h3>
          </div>

          <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderCollapse: "collapse",
            fontSize:"18px"
          }}>
            
            <tr style={{ border: "1px solid black", color: "black", backgroundColor: "rgba(100, 100, 100, 0.5)" }}>
              <td style={{  width: "200px"}}><b>Name of Material:  </b></td>
              <td style={{textAlign: "left", width: "200px" }}>{this.state.name}</td>
              <td style={{ width: "100px" }}><b>Material Code: </b></td>
              <td style={{textAlign: "left", width: "300px" }}>{this.state.code}</td>

            </tr>
            <tr style={{  color: "black", textDecoration:"bold" }}>
              <td style={{  width: "200px"}}>Supplier:  </td>
              <td style={{textAlign: "left", width: "200px" }}>Text Mising</td>
              <td style={{ width: "200px" }}></td>
              <td style={{textAlign: "left", width: "200px" }}></td>

            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Batch No: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.batch_lot}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>QCNo: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.qc_no}</td>
            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>MFG. Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.mfg_date}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>Sampling Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.sampling_date}</td>
            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Expiry Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.exp_date}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>Analysis Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.analysis_date}</td>
            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>IGP No: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.igp_sample_req_no}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>Approved Qty: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.approved_qty}</td>
            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>Raw Data#: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.raw_data_ref}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>Specification Ref: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.sdata}</td>
            </tr>
            <tr>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}><b>WS/Sec. STD Used: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.working_std_no}</td>
            <td style={{textAlign: "left", width: "200px" ,border: "1px solid black"}}><b>Retest Date: </b></td>
            <td style={{textAlign: "left", width: "200px",border: "1px solid black" }}>{this.state.retest_date}</td>
            </tr>
            <tbody>
            {/* {this.GenerateSpecs()} */}
            </tbody>
          </table>

          <br /> <br />

          <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            borderCollapse: "collapse",
            fontSize:"17px"
          }}>
            <thead style={{ border: "1px solid black", backgroundColor: "rgba(100, 100, 100, 0.5)" }}>
              <th style={{ border: "1px solid black", width: "80px"}}>Sr. </th>
              <th style={{ border: "1px solid black", width: "300px" }}>Parameters</th>
              <th style={{ border: "1px solid black", width: "400px" }}>Specifications</th>
              <th style={{ border: "1px solid black", width: "170px" }}>Result</th>
            </thead>
            <tbody>
            {this.GenerateSpecs()}
            </tbody>
          </table>
          <div style={{marginLeft:"30px"}}>
              
              <p align="right">

              <button style={{marginRight: "30px", backgroundColor: "rgba(100, 100, 100, 0.5)"  }}> <p>{this.state.result}</p></button>

              </p>


              <div style={{marginTop:"-40px"}}>
              <p>Name of analyst:  {this.state.analyst}</p>
              <p>Remarks : {this.state.remarks}</p>
              </div>
            </div>
          <div style={{ display: "flex" , marginTop:"40px"}}>
              <div style={{ textAlign: "left" , width:"50%"}}>
                <p>
                  <span>
                    <strong>Analyst:</strong>
                    
                  </span>
                  ________________________
                </p>
                
              </div>
             
              <div style={{ textAlign: "right", width:"50%" }}>
                <p>
                  <span>
                    <strong>QC Manager:</strong>
                  </span>
                  ___________________________
                </p>
                
              </div>
            </div>

         
          </div>
        )}
    </div>
    );
  }
}

