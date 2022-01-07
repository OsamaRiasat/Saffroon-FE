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

import PackSizeAdd from "../../Services/QA/Add_PackSize";

import {
  ProductCodeListForPackSize,
  ProductData,
  AddPackSizeAPI,
} from "../../Services/QA/Add_PackSize";
import { PackSize } from "../../Services/Production/New_PMFormulation.js";

export default class AddPackSize extends Component {
  async componentDidMount() {
    this.getProductCodeList();
  }

  getProductCodeList = async () => {
    const productCodeList = (await ProductCodeListForPackSize()).data;
    console.log(productCodeList);
    this.setState({ productCodeList: productCodeList });
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

      eproductcode: "",

      fieldErrors: {},
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

  validatePackSize = (PackSize) => {
    if(this.state.dosageForm==="Tablet" || this.state.dosageForm==="Capsule"){
      try{
        const data = PackSize.split("x").map((e) => parseInt(e));
        if(Number.isInteger(data[0]) && Number.isInteger(data[1]) && data[1]>0){
            return true;
        }else return false;
      }
      catch(error){
        console.log(error)
        return false;
    }
  }else if(this.state.dosageForm==="Vial")
  {
    const digits_only = string => [...string].every(c => '0123456789'.includes(c));
    if (digits_only(PackSize) && parseInt(PackSize)>0) {
      return true;
    }else return false;
  }
  };
  validate = (fields) => {
    const errors = {};
    if (!fields.eproductcode) errors.eproductcode = "Required!";
    if (!fields.packSize) errors.packSize = "Required!";
    if (!fields.packType) errors.packType = "Required!";
    else if(!this.validatePackSize(fields.packSize)) errors.packSize = "Pack Size format is not correct!";
    if (!fields.MRP) errors.MRP = "Required!";
    
   console.log(this.validatePackSize(fields.packSize))
    return errors;
  };

  postButton = async () => {
    try {
      let { eproductcode, packSize, packType, MRP , dosageForm} = this.state;
      
      const fieldErrors = this.validate({
        eproductcode,
        packSize,
        packType,
        MRP,
        dosageForm
      });
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
      const resp = await AddPackSizeAPI(payload);

      console.log(resp);
      if (resp.status === 201) {
        toast.success("Pack Size Added !!", {
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
        toast.error("Request Not Sent" , {
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
      toast.error("Pack Size Added Already Exists ", {
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
                          tabIndex={"1"}
                          autoFocus={true}
                          options={this.state.productCodeList}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(event, value) => {
                            this.setState({
                              eproductcode: "s",
                            });
                            this.setState({
                              productCode: value.ProductCode,
                            });
                            this.getData(value.ProductCode);
                            console.log("value:" + this.state.eproductcode);
                            this.onChangeClearError("eproductcode");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Product Code:"
                              variant="outlined"
                            />
                          )}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.eproductcode && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.eproductcode}
                            </span>
                          )}
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
                          inputProps={{ tabIndex: "2"  }}
                          label="Pack Size:"
                          fullWidth="true"
                          value={this.state.packSize}
                          onChange={(event) => {
                            this.setState({
                              packSize: event.target.value,
                            });
                            this.onChangeClearError("packSize");
                          }}
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
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Pack Type:"
                          inputProps={{ tabIndex: "3"  }}
                          fullWidth="true"
                          value={this.state.packType}
                          onChange={(event) => {
                            this.setState({
                              packType: event.target.value,
                            });
                            this.onChangeClearError("packType");
                          }}
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
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          variant="outlined"
                          inputProps={{ tabIndex: "4"  }}
                          label="MRP:"
                          type="number"
                          fullWidth="true"
                          value={this.state.MRP}
                          onChange={(event) => {
                            this.setState({
                              MRP: event.target.value,
                            });
                            this.onChangeClearError("MRP");
                          }}
                          error={
                            this.state.fieldErrors && this.state.fieldErrors.MRP
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors && this.state.fieldErrors.MRP
                          }
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
                          tabIndex={"5"}
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
