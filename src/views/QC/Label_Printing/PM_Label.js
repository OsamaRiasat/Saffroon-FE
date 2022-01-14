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
import Select from "react-select";
import services from "../../../Services/QC/PM/PM_Labels.js"
import PrintIcon from "@material-ui/icons/Print";
import {
    CustomValueContainer,
    CustomSelectStyle,
  } from "../../../variables/genericVariables";
  
  export default class RejectedLabel extends React.Component {


      
  toggle = () =>
  this.setState({ show1: !this.state.show1 }, () => {
    this.printData();
  });
  
  
  printData =  async () => {

   

    var divToPrint = document.getElementById("hide");
    if (divToPrint === "" || divToPrint === null) {
      return;
    } else {
      
      var newWin = window.open("");
  
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
  
      if (newWin.stop) {
        newWin.location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
        newWin.stop(); //immediately stop reloading
      }
      newWin.close();

      this.setState({
        show1: !this.state.show1,
        canprint: false,
        qc_no_list:[],
            fieldErrors: {},
            IGPNo:"",
            code:"",
            name:"",
            batchNo:"",
            MFG_Date:"",
            EXP_Date:"",
            containersReceived:"",
            S_Name:"",
            remarks:"",
            QCNo:"",
            Assay:"",
            required_labels:"",
            result:"",
            color:"info"
  
      });
  
      this.componentDidMount();
      
    }
  };
  
  
//   GenerateSpecs = () => {
//     try {
//       const tabledata = this.state.cart.map((staged, index) => {
//         var { parameter, specification, result } =
//           staged;
        
//         return (
//           <tr style={{ border: "1px solid black" }} key={index}>
//             <td style={{ border: "1px solid black", width: "100px" }}>
//               {index + 1}{" "}
//             </td>
//             <td style={{ border: "1px solid black", width: "200px" }}>
//               {parameter}
//             </td>
//             <td style={{ border: "1px solid black", width: "300px" }}>
//               {specification}
//             </td>
//             <td style={{ border: "1px solid black", width: "170px" }}>
//               {result}
//             </td>
           
//           </tr>
//         );
//       });
  
//       return tabledata;
//     } catch (error) {
//       console.log(error);
//       alert("Something Went Wrong");
//     }
//   };
  

    async componentDidMount () {
        const qc_no = (await services.methods.RMAnalysisQCNo()).data;
        console.log(qc_no);
        this.setState({
            qc_no_list:qc_no
        })
    }


    constructor(props) {
        super(props);
        this.state = {
            qc_no_list:[],
            fieldErrors: {},
            IGPNo:"",
            code:"",
            name:"",
            batchNo:"",
            MFG_Date:"",
            EXP_Date:"",
            containersReceived:"",
            S_Name:"",
            remarks:"",
            QCNo:"",
            Assay:"",
            required_labels:"",
            result:"",
            color:"info",
            labelColor:"red",
            show1:false,
            canprint:false
        }
    }
    validate = (fields) => {
        const errors = {};
        // if (!fields.ProdItems) errors.ProdItems = "ProdItems  Required";
        if (!fields.QCNo) errors.QCNo = "QCNo Required";
        // if (!fields.BatchNo) errors.BatchNo = "BatchNo Required";
        // if (!fields.Qty) errors.Qty = "Qty Required";
        // if (!fields.NoOfContainers) errors.NoOfContainers = "NoOfContainers Required";
        // if (!fields.mfg_Date) errors.mfg_Date = "mfg_Date Required";
        // if (!fields.exp_Date) errors.exp_Date = "exp_Date Required";
        // if (!fields.Assay) errors.Assay = "Assay Required";
        // if (!fields.SupplierList) errors.SupplierList = "SupplierList Required";
        if (!fields.required_labels) errors.reqLabels = "reqLabels Required";
        // if (!fields.remarks) errors.remarks = "Remarks Required";
        return errors;
      };
      HandleErrors= async()=>
      {
        const fieldErrors = this.validate(this.state);
        this.setState({ fieldErrors: fieldErrors });
        if (Object.keys(fieldErrors).length) return;
    

      }
      handleQCNo = async (qcno)=> {
        
        
        console.log("state qc",qcno)
        const data = (await services.methods.RMAnalysis(qcno)).data;
        console.log(data);


        this.setState({
            IGPNo:data.IGPNo,
            code:data.RMCode,
            name:data.Material,
            batchNo:data.batchNo,
            MFG_Date:data.MFG_Date,
            EXP_Date:data.EXP_Date,
            containersReceived:data.containersReceived,
            S_Name:data.S_Name,
            remarks:data.remarks,
            Assay:data.Assay,
            result:data.result,
            
        })

        this.setState({ canprint: true });
        if(this.state.result==="Approved"){
            this.setState({
                color:"success",
                labelColor:"green"
            })
        }else{
            this.setState({
                color:"danger",
                labelColor:"red"
            })
        }

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
    render() { 
  

        return <div> <div>
        <GridContainer md={12} >
          <Card>
            <CardHeader color={this.state.color}>
              <h4>Packing Material LABEL PRINTING </h4>
            </CardHeader>
            <CardBody >
              <GridContainer >
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                <CardHeader color={this.state.color}>
                        <h4>Status :{this.state.result}</h4>
                      </CardHeader>
                  <CardContent>
                   <GridContainer>
                       <GridItem xs={12} sm={12} md={4}>
                            <Select
                                name="QCNo"
                                id="QCNo"
                                placeholder="QCNo:"
                                className="customSelect"
                                classNamePrefix="select"
                                isSearchable={true}
                                options = {this.state.qc_no_list}
                                value={
                                    this.state.QCNo
                                      ? { QCNo: this.state.QCNo }
                                      : null
                                  }
                                getOptionValue={(option) => option.QCNo}
                                getOptionLabel={(option) => option.QCNo}
                                components={{
                                    ValueContainer: CustomValueContainer,
                                }}
                                styles={CustomSelectStyle}
                                fullWidth="true"
                                onChange={(value, select) => {
                                    this.setState(
                                        {
                                          QCNo: value.QCNo,
                                         
                                        },)
                                    this.handleQCNo(value.QCNo);
                                    this.onChangeClearError(select.name);
                                    }}
                                >
                                
                            Product items
                            </Select>
                            {this.state.fieldErrors && this.state.fieldErrors.QCNo && (
                                <span className="MuiFormHelperText-root Mui-error">
                                    {this.state.fieldErrors.QCNo}
                                </span>
                            )}
                       </GridItem>

                       <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="name"
                          name="name"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Material Name:"
                          value={this.state.name}
                          
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                        
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Material Code:"
                          value={this.state.code}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                         
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="IGPNo :"
                        value={this.state.IGPNo}
                        />
                      </GridItem>


                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="NoOfContainers"
                          name="NoOfContainers"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="NO. Containers:"
                            value={this.state.containersReceived}
                        />
                      </GridItem>
                   </GridContainer>

                   <GridContainer>
                        <GridItem xs={12} sm={12} md={6}  >
                        <TextField 
                               id="manufacturedate" 
                                name="mfg_Date"
                                
                                fullWidth="true" 
                                required="true" 
                                variant="outlined" 
                                label="MFG   Date "     
                                value={this.state.MFG_Date}
                                                                   
                                />
                        </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <TextField 
                               id="manufacturedate" 
                                name="mfg_Date"
                                
                                fullWidth="true" 
                                required="true" 
                                variant="outlined" 
                                label="Expiry   Date "     
                                value={this.state.EXP_Date}
                                                                   
                                />
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={2}>
                            <TextField
                                id="Assay"
                                name="Assay"
                                fullWidth="true"
                                required="true"
                                variant="outlined"
                                label="Assay :"
                                value={this.state.Assay}
                                />
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={5}>
                        <TextField
                               
                                fullWidth="true"
                                required="true"
                                variant="outlined"
                                label="Supplier :"
                                value={this.state.S_Name}
                               
                                />
                        </GridItem>

                        <GridItem  xs={12} sm={12} md={5}>
                            {/* <TextField
                                id="reqLabels"
                                name="reqLabels"
                                type = {Number}
                                fullWidth="true"
                                variant="outlined"
                                label="Number Of Required labels:"
                                value = {this.state.required_labels}                                
                                error={
                                    this.state.fieldErrors &&
                                      this.state.fieldErrors.reqLabels
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    this.state.fieldErrors &&
                                    this.state.fieldErrors.reqLabels
                                  }
                                  onChange={(event) => {
                                    
                                    this.onChangeClearError(event.target.name);
                                  }}
                            /> */}
                              <TextField
                              id="reqLabels"
                              name="reqLabels"
                              style={{ width: "100%" }}
                              label="Number of Labels:"
                              multiline
                              variant="outlined"
                              value={this.state.required_labels}
                              onChange={(event) => {
                                this.setState({ required_labels: event.target.value });
                                this.onChangeClearError(event.target.name);
                              }}
                              error={
                                this.state.fieldErrors &&
                                  this.state.fieldErrors.reqLabels
                                  ? true
                                  : false
                              }
                              helperText={
                                this.state.fieldErrors &&
                                this.state.fieldErrors.reqLabels
                              }
                             
                            />
                        </GridItem>
                    </GridContainer>



                    <GridContainer>
                       <GridItem md={2}></GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="remarks"
                                name="remarks"
                                label="Remarks"
                                variant="outlined"
                                fullWidth="true"
                                name="remarks"
                                value={this.state.remarks}
                                >

                            </TextField>
                           
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Button 
                                startIcon={<PrintIcon />}
                                className="StyledButton"  
                                disabled={!this.state.canprint}
                                color={this.state.color}
                                onClick={() => {
                                    this.toggle();
                                  }}
                            >
                            Print     
                            </Button>

                        </GridItem>
                        
                    </GridContainer>
                   
                  </CardContent>
                </CardM>
              </GridContainer>
            </CardBody>
          
          </Card>
        </GridContainer>
        {this.state.show1 && (
          <div id="hide" >
          
             <div style={{textAlign:"center", fontFamily:"sans-serif",background:this.state.labelColor}}>

            <i><h1>{this.state.result}</h1></i>
            <div>
            <table>
                <thead>
                    <th style={{width:"310px"}}><h3>Material Name:</h3></th>
                    <th style={{color:"white",marginLeft:"-50px",textAlign:"left",width:"310px"}}><h3>{this.state.name}</h3></th>
                    <th style={{width:"310px"}}><h3>Material Name:</h3></th>
                    <th style={{color:"white",marginLeft:"-50px",textAlign:"left",width:"310px"}}><h3>{this.state.code}</h3></th>
                </thead>

                <tr>
                <td style={{textAlign:"left",width:"310px"}}><h3>IGPNo:</h3></td>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.IGPNo}</h3></th>
                <th style={{width:"310px"}}><h3>Batch No:</h3></th>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.batchNo}</h3></th>

                </tr>
                <tr>
                <td style={{width:"310px"}}><h3>MFG Date:</h3></td>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.MFG_Date}</h3></th>
                <th style={{width:"310px"}}><h3>EXP Date:</h3></th>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.EXP_Date}</h3></th>

                </tr>
                <tr>
                <td style={{width:"310px"}}><h3>Supplier Name:</h3></td>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.S_Name}</h3></th>
                <th style={{width:"310px"}}><h3>Containers Received:</h3></th>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.containersReceived}</h3></th>

                </tr>
                <tr>
                <td style={{width:"310px"}}><h3>Assay:</h3></td>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.Assay}</h3></th>
                <th style={{width:"310px"}}><h3>Remarks:</h3></th>
                <th style={{color:"white",textAlign:"left",width:"310px"}}><h3>{this.state.remarks}</h3></th>

                </tr>
             
            </table>
            </div>

             </div>
         
          </div>
        )}
    </div>
          
  </div>
    }
}



