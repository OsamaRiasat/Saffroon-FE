import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import Select from "react-select";
import PackSizeAdd from "../../Services/QA/Add_PackSize";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import {
	ProductCodeListForPackSize,
	ProductData,
	AddPackSizeAPI,
} from "../../Services/QA/Add_PackSize";

export default class AddPackSize extends Component {
  async componentDidMount() {
    this.getProductCodeList();
  }

  getProductCodeList = async () => {
    const productCodeList = (await ProductCodeListForPackSize()).data;
    console.log(productCodeList);
    this.setState({productCodeList: productCodeList});
  };

  getData = async (pcode) => {
    const sampledBtList = (await ProductData(pcode)).data;

    console.log(sampledBtList);
    this.setState({
      product: sampledBtList.Product,
      dosageForm: sampledBtList.DosageForm,
      registrationNumber: sampledBtList.RegistrationNo,
    });
    this.toggle(this.state.dosageForm);
  };

  state = {
    show: false,
  };
  
  toggle = (p) => {
    if (p == "Vial") {
      this.setState((currentState) => ({ show: true }));
    } else {
      this.setState((currentState) => ({ show: false }));
    }
  };

 

  constructor(props) {
    super(props);
    this.state = {
      //API

      productCodeList: [],
      productCode: "",

      product: "",
      dosageForm: "",
      registrationNumber: "",
      packSize: "",
      packType: "",
      fillingWeight: "0",
      MRP: "",
    };
  }

  clearForm = () => {
    this.setState({
      productCode: "",
      product: "",
      dosageForm: "",
      registrationNumber: "",
      packSize: "",
      packType: "",
      fillingWeight: "0",
      MRP: "",
      fieldErrors: {}
    });
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

  postButton = async () => {
    try {

      let { packSize, packType, MRP } = this.state;
      const fieldErrors = this.validate({ packSize, packType, MRP });
      this.setState({ fieldErrors: fieldErrors });
      if (Object.keys(fieldErrors).length) return;
      const payload = {
        PackSize: this.state.packSize,
        PackType: this.state.packType,
        MRP: this.state.MRP,
        FillingWeight: this.state.fillingWeight,
        ProductCode: this.state.productCode,
      };

     

      console.log(payload);
      const data = await AddPackSizeAPI(payload);
      console.log(data);

      if (data.status === 201) {
        // alert("Data Posted!!!");
        toast.success("Data Posted!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.clearForm();
        this.getProductCodeList();
      } else {
          // alert("Unexpected Error");
          toast.error("Unexpected Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch {
      // alert("Something Went Wrong!!!");
      toast.error("Something Went Wrong!!!", {
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
  validate = (fields) => {
    const errors = {};
    if (!fields.packSize) errors.packSize = "Pack Size Required";
    if (!fields.packType) errors.packType = "Pack Type Required";
    if (!fields.MRP) errors.MRP= "MRF Required";
    return errors;
  };
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 style={{ textAlign: "center" }}>Add Pack Size</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="product-code"
                          options={this.state.productCodeList}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(event, value) => {
                            this.setState({
                              productCode: value.ProductCode,
                            });
                            this.getData(value.ProductCode);
                          }}
                          renderInput={(params) => <TextField {...params} label="Product Code:" variant="outlined" />}
                        />
                        
                      </GridItem>

                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id=""
                          variant="outlined"
                          InputProps={{ readOnly: true }}
                          label="Product:"
                          fullWidth="true"
                          value={this.state.product}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Dosage Form:"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          value={this.state.dosageForm}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Registration No:"
                          fullWidth="true"
                          value={this.state.registrationNumber}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packSize
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packSize
                          }
                          label="Pack Size:"
                          fullWidth="true"
                          value={this.state.packSize}
                          onChange={(event) => {
                            this.setState({
                              packSize: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                          {/* {this.state.fieldErrors && this.state.fieldErrors.packSize && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.packSize}
                      </span>
                    )} */}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packSize
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packSize
                          }
                          label="Pack Type:"
                          fullWidth="true"
                          value={this.state.packType}
                          onChange={(event) => {
                            this.setState({
                              packType: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packType
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.packType
                          }
                          label="MRP:"
                          fullWidth="true"
                          value={this.state.MRP}
                          onChange={(event) => {
                            this.setState({
                              MRP: event.target.value,
                            });
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>

                      {this.state.show && (
                        <div id="hide">
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id=""
                              style={{ width: "100%" }}
                              label="Filling Weight"
                              multiline
                              variant="outlined"
                              value={this.state.fillingWeight}
                              onChange={(event) => {
                                this.setState({
                                  fillingWeight: event.target.value,
                                });
                              }}
                            />
                          </GridItem>
                        </div>
                      )}

                      <GridItem md={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth="true"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={this.postButton}
                        >
                          Add Pack Size
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
