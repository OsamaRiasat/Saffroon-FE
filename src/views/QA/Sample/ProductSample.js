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
  PSPCode,
  PSBatchNo,
  PSBatchDetail,
  AllUsers,
  Sample,
  stagesList
} from "../../../Services/QA/Product_Sample.js";

export default class ProductSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // sampledStatus_List: [
      //   { ss: "Granules" },
      //   { ss: "Mixed Powder" },
      //   { ss: "Compressed" },
      //   { ss: "Coated" },
      //   { ss: "Blistered" },
      //   { ss: "Finished" },
      // ],
      sampledStatus_List:[],

      sampledStatusUnits_List: [
        { u: "g" },
        { u: "mL" },
        { u: "Tablets" },
        { u: "Capsules" },
        { u: "Bottles" },
        { u: "Packs" },
      ],

      pspCode_List: [],
      sampledBy_List: [],
      Batch_No_List: [],

      productCode: "",
      psBatchNo: "",

      product: "",
      batchSize: "",
      mfg: "",
      exp: "",
      currentStage: "",
      qcNo: "",
      sampledBy: "",
      sampleStatus: "",
      unit: "",
      quantity: "",
      fieldErrors: {},
    };
  }

  async componentDidMount() {
    const pspCode = (await PSPCode()).data;
    this.setState({ pspCode_List: pspCode });
    console.log(this.state.pspCode_List);

    const users = (await AllUsers()).data;
    this.setState({ sampledBy_List: users });
    console.log(this.state.sampledBy_List);
  }

  setvalues = async (id) => {
    const psBatch = (await PSBatchNo(id)).data;
    //     const batches = (await PSBatchNo(this.state.Product_Code)).data;
    this.setState(
      {
        Batch_No_List: psBatch
      }
    )


    // const details = (await PSBatchDetail(this.state.psBatchNo)).data;
    // // this.setState({ psBatchNo: psBatch[0].batchNo });
    // console.log(details);
    // const stages =  (await stagesList(id)).data;
    // this.setState({
    //   batchSize: details.batchSize,
    //   mfg: details.MFGDate,
    //   exp: details.EXPDate,
    //   currentStage: details.currentStage,
    //   qcNo: details.QCNo,
    //   sampledStatus_List: stages
    // });
  };
  setBatchDetail = async (id) => {
    console.log("setabatch detail" + id)
    const details = (await PSBatchDetail(id)).data;
    // this.setState({ psBatchNo: psBatch[0].batchNo });
    console.log("details"+details);
    const stages =  (await stagesList(this.state.productCode)).data;
    this.setState({
      batchSize: details.batchSize,
      mfg: details.MFGDate,
      exp: details.EXPDate,
      currentStage: details.currentStage,
      qcNo: details.QCNo,
      sampledStatus_List: stages
    });
  };
  // setStages = async (id) => {
  //   // console.log("holaa"+ stages.data);
  //   const stages = (await stagesList(this.state.productCode));
  //   console.log("holaa"+ stages.data);
  //   this.setState({
  //     sampledStatus_List: stages.data
  //   })
  // };
  
  validate = (fields) => {
    const errors = {};
    if (!fields.productCode) errors.productCode = "Product Code Required";
    if (!fields.product) errors.product = "Product Required";
    if (!fields.psBatchNo) errors.psBatchNo = "Batch No Required";
    if (!fields.sampleStatus) errors.sampleStatus = "Sample Status Required";
    if (!fields.quantity) errors.quantity = "Quantity Required";
    if (!fields.unit) errors.unit = "Units Required";
    if (!fields.sampledBy) errors.sampledBy = "Select QA Person";
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

      let { productCode, product, psBatchNo, sampleStatus, quantity, unit, sampledBy } = this.state;

      const fieldErrors = this.validate({ productCode, product, psBatchNo, sampleStatus, quantity, unit,sampledBy });

      this.setState({ fieldErrors: fieldErrors });

      if (Object.keys(fieldErrors).length) return;

      const payload2 = {
        batchNo: this.state.psBatchNo,
        sampleStage: this.state.sampleStatus,
        sampledBy: this.state.sampledBy,
        sampleQuantity: this.state.quantity,
        sampleUnity: this.state.unit,
      };

      console.log(payload2);

      const resp = await Sample(payload2);
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
        this.clearForm();
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

  clearForm = () => {
    this.setState({
      productCode: "",
      psBatchNo: "",
      Batch_No_List: [],
      product: "",
      batchSize: "",
      mfg: "",
      exp: "",
      currentStage: "",
      qcNo: "",
      sampledBy: "",
      sampleStatus: "",
      unit: "",
      quantity: "",
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
          padding: "5px",
          marginTop: "10px",
          paddingLeft: "20px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader
              color="primary"
              style={{
                padding: "5px",
                marginTop: "10px",
                paddingLeft: "20px",
              }}
            >
              <h2>
                <center>Product Sample</center>{" "}
              </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Date"
                          value={date}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                        name="productCode"
                          placeholder="Product Code:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.pspCode_List}
                          value={
                            this.state.productCode
                              ? { ProductCode: this.state.productCode }
                              : null
                          }
                          getOptionValue={(option) => option.ProductCode}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(value, select) => {
                            this.setState({
                              productCode: value.ProductCode,
                              product: value.Product,
                            });
                            this.setvalues(value.ProductCode);
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.productCode && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.productCode}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          placeholder="Product:"
                          name="product"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.pspCode_List}
                          value={
                            this.state.product
                              ? { Product: this.state.product }
                              : null
                          }
                          getOptionValue={(option) => option.Product}
                          getOptionLabel={(option) => option.Product}
                          onChange={(value, select) => {
                            this.setState({
                              productCode: value.ProductCode,
                              product: value.Product,
                            });
                            this.setvalues(value.ProductCode);
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.product && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.product}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <span style={{ fontSize: "20px" }}>
                          {this.state.currentStage}
                        </span>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                      <Select
                          placeholder="Batch No:"
                          name="psBatchNo"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.Batch_No_List}
                          value={
                            this.state.psBatchNo
                              ? { batchNo: this.state.psBatchNo }
                              : null
                          }
                          getOptionValue={(option) => option.batchNo}
                          getOptionLabel={(option) => option.batchNo}
                          onChange={(value, select) => {
                            this.setState({
                              psBatchNo: value.batchNo,
    
                            });
                            this.setBatchDetail(value.batchNo);
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.psBatchNo && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.psBatchNo}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Batch Size:"
                          value={this.state.batchSize}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Mfg Date:"
                          value={this.state.mfg}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Exp Date:"
                          value={this.state.exp}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          placeholder="Sampled Status:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          name= "sampleStatus"
                          isSearchable={true}
                          options={this.state.sampledStatus_List}
                          value={
                            this.state.sampleStatus
                              ? { stage: this.state.sampleStatus }
                              : null
                          }
                          getOptionValue={(option) => option.stage}
                          getOptionLabel={(option) => option.stage}
                          onChange={(value, select) => {
                            this.setState({
                              sampleStatus: value.stage,
                            });
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.sampleStatus && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.sampleStatus}
                      </span>
                    )}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Sample Quantity:"
                          name="quantity"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantity
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.quantity
                          }
                          value={this.state.quantity}
                          onChange={(event) => {
                            this.setState({
                              quantity: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                            console.log(event.target.value);
                          }}
                          type="number"
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <Select
                          placeholder="Units:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          name="unit"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.sampledStatusUnits_List}
                          value={
                            this.state.unit ? { u: this.state.unit } : null
                          }
                          getOptionValue={(option) => option.u}
                          getOptionLabel={(option) => option.u}
                          onChange={(value, select) => {
                            this.setState({
                              unit: value.u,
                            });
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.unit && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.unit}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="QC No:"
                          value={this.state.qcNo}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={9}>
                        <Select
                          placeholder="Sampled By:"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          name= "sampledBy"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.sampledBy_List}
                          value={
                            this.state.sampledBy
                              ? { username: this.state.sampledBy }
                              : null
                          }
                          getOptionValue={(option) => option.username}
                          getOptionLabel={(option) => option.username}
                          onChange={(value, select) => {
                            this.setState({
                              sampledBy: value.username,
                            });
                            this.onChangeClearError(select.name);
                            // this.setStages(value.ProductCode);
                          }}
                        />
                          {this.state.fieldErrors && this.state.fieldErrors.sampledBy && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.sampledBy}
                      </span>
                    )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
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

































// import React, { Component } from "react";
// import GridItem from "../../../components/Grid/GridItem.js";
// import GridContainer from "../../../components/Grid/GridContainer.js";
// import Button from "../../../components/CustomButtons/Button.js";
// import Card from "../../../components/Card/Card.js";
// import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "../../../components/Card/CardHeader.js";
// import CardBody from "../../../components/Card/CardBody.js";
// import TextField from "@material-ui/core/TextField";
// import Select, { components } from "react-select";
// import { toast } from "react-toastify";

// import {
//   CustomValueContainer,
//   CustomSelectStyle,
// } from "../../../variables/genericVariables";

// import   {PSPCode, PSBatchNo} from "../../../Services/QA/Product_Sample";
// export default class ProductSample extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       Product_Code_an_Name_List: [],
//       Batch_No_List: [],
     

//       deliveredBy_List: [{ Name: "Saad" }, { Name: "Usama" }],
//       recievedBy_List: [{ rname: "Asad" }, { rname: "Usman" }],

//       Product_Code: "",
//       Product: "",
//       Batch_No: "",
//       material: "",
//       code: "",
//       mfg: "",
//       exp: "",
//       batchNo: "",
//       supplier: "",
//       quantity: "",
//       unit: "",
//       noOfContainers: "",
//       qcNo: "",
//       deliveredBy: "",
//       recievedBy: "",
//     };
//   }

  
//   async componentDidMount() {
//     const Product_Code_an_Name_List = (await PSPCode()).data;
//     this.setState(
//       {
//         Product_Code_an_Name_List: Product_Code_an_Name_List
//       }
//     )
    
//     console.log(this.state.Product_Code_an_Name_List);
//   }

//   setBatches = async () => {
//     console.log("ho"+this.state.Product_Code)
//     const batches = (await PSBatchNo(this.state.Product_Code)).data;
//     this.setState(
//       {
//         Batch_No_List: batches
//       }
//     )

//     console.log(batches)

//   }

//   render() {
//     var today = new Date();
//     let date =
//       today.getDate() +
//       "-" +
//       (today.getMonth() + 1) +
//       "-" +
//       today.getFullYear();

//     return (
//       <div
//         style={{
//           padding: "5px",
//           marginTop: "10px",
//           paddingLeft: "20px",
//         }}
//       >
//         <GridContainer md={12}>
//           <Card>
//             <CardHeader
//               color="primary"
//               style={{
//                 padding: "5px",
//                 marginTop: "10px",
//                 paddingLeft: "20px",
//               }}
//             >
//               <h2>
//                 <center>Product Sample</center>{" "}
//               </h2>
//             </CardHeader>
//             <CardBody>
//               <GridContainer>
//                 <Card style={{ marginLeft: 15, minWidth: 960 }}>
//                   <CardContent>
//                     <GridContainer>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id="date"
//                           fullWidth="true"
//                           InputProps={{ readOnly: true }}
//                           variant="outlined"
//                           label="Date"
//                           value={date}
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                       <Select
//                           placeholder="Product Code:"
//                           components={{
//                             ValueContainer: CustomValueContainer,
//                           }}
//                           styles={CustomSelectStyle}
//                           className="customSelect"
//                           classNamePrefix="select"
//                           isSearchable={true}
//                           options={this.state.Product_Code_an_Name_List}
//                           value={
//                             this.state.Product_Code
//                               ? { ProductCode: this.state.Product_Code }
//                               : null
//                           }
//                           getOptionValue={(option) => option.ProductCode}
//                           getOptionLabel={(option) => option.ProductCode}
//                           onChange={(value, select) => {
//                             this.setState({
//                               Product_Code: value.ProductCode,
//                               Product: value.Product
//                             });
//                             this.setBatches();
//                           }}
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                       <Select
//                           placeholder="Product Name:"
//                           components={{
//                             ValueContainer: CustomValueContainer,
//                           }}
//                           styles={CustomSelectStyle}
//                           className="customSelect"
//                           classNamePrefix="select"
//                           isSearchable={true}
//                           options={this.state.Product_Code_an_Name_List}
//                           value={
//                             this.state.Product
//                               ? { Product: this.state.Product }
//                               : null
//                           }
//                           getOptionValue={(option) => option.Product}
//                           getOptionLabel={(option) => option.Product}
//                           onChange={(value, select) => {
//                             this.setState({
//                               Product: value.Product,
//                               Product_Code: value.ProductCode
//                             });

//                             this.setBatches();
//                           }}
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <span style={{ fontSize: "20px" }}>Blistering</span>
//                       </GridItem>
//                     </GridContainer>

//                     <GridContainer>
//                       <GridItem xs={12} sm={12} md={3}>
//                       <Select
//                           placeholder="Batch No:"
//                           components={{
//                             ValueContainer: CustomValueContainer,
//                           }}
//                           styles={CustomSelectStyle}
//                           className="customSelect"
//                           classNamePrefix="select"
//                           isSearchable={true}
//                           options={this.state.Batch_No_List}
//                           value={
//                             this.state.Batch_No
//                               ? { batchNo: this.state.Batch_No }
//                               : null
//                           }
//                           getOptionValue={(option) => option.batchNo}
//                           getOptionLabel={(option) => option.batchNo}
//                           onChange={(value, select) => {
//                             this.setState({
//                               Batch_No: value.batchNo,
                            
//                             });

//                             // this.setvalues(value.Product_Code);
//                           }}
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Batch Size:"
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Mfg Date:"
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Exp Date:"
//                         />
//                       </GridItem>
//                     </GridContainer>

//                     <GridContainer>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Sample Status:"
//                           select
//                         />
//                       </GridItem>

//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Sample Quantity:"
//                         />
//                       </GridItem>

//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label=""
//                           select
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="QC No:"
//                         />
//                       </GridItem>
//                     </GridContainer>

//                     <GridContainer>
//                       <GridItem xs={12} sm={12} md={9}>
//                         <TextField
//                           id=""
//                           fullWidth="true"
//                           variant="outlined"
//                           label="Sampled by:"
//                           select
//                         />
//                       </GridItem>
//                       <GridItem xs={12} sm={12} md={3}>
//                         <Button className="" color="primary" fullWidth="true">
//                           Receive Sample
//                         </Button>
//                       </GridItem>
//                     </GridContainer>
//                   </CardContent>
//                 </Card>
//               </GridContainer>
//             </CardBody>
//           </Card>
//         </GridContainer>
//       </div>
//     );
//   }
// }
