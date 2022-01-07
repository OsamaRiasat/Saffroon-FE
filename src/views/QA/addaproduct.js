import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";

import AlertModal from "../../components/Modal/AlertModal.js";

import { ListOfDosageForms, AddProduct } from "../../Services/QA/Product_Add";

export default class addaproduct extends Component {
  async componentDidMount() {
    this.getDosageFormList();
    this.setRegandRenDate();
  }

  constructor(props) {
    super(props);
    this.state = {
      registrationDate: "",
      renewalDate: "",

      dosageFormList: [],
      dosageForm: "",

      productCode: "",
      registrationCode: "",
      product: "",
      genericName: "",
      composition: "",
      shelfLife: "",
      showSuccess: false,
      showError: false,
      message: "",

      edosage: "",

      fieldErrors: {},
    };
  }

  getDosageFormList = async () => {
    const dosageformlist = (await ListOfDosageForms()).data.List;

    console.log(dosageformlist);
    this.setState({
      dosageFormList: dosageformlist,
    });
  };

  setRegandRenDate = async () => {
    var today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let rdate =
      today.getFullYear() +
      5 +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.setState({
      registrationDate: date,
      renewalDate: rdate,
    });
  };

  clearForm = () => {
    this.setState({
      registrationDate: "",
      renewalDate: "",
      dosageFormList: [],
      dosageForm: "",
      productCode: "",
      registrationCode: "",
      product: "",
      genericName: "",
      composition: "",
      shelfLife: "",
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

  validate = (fields) => {
    const errors = {};
    if (!fields.productCode) errors.productCode = "Required!";
    if (!fields.registrationCode) errors.registrationCode = "Required!";
    if (!fields.product) errors.product = "Required!";
    if (!fields.genericName) errors.genericName = "Required!";
    if (!fields.composition) errors.composition = "Required!";
    if (!fields.shelfLife) errors.shelfLife = "Required!";
    if (!fields.edosage) errors.edosage = "Required!";
    return errors;
  };

  postButton = async () => {
    this.setRegandRenDate();

    try {
      let {
        productCode,
        registrationCode,
        product,
        genericName,
        composition,
        shelfLife,
        edosage,
      } = this.state;

      const fieldErrors = this.validate({
        productCode,
        registrationCode,
        product,
        genericName,
        composition,
        shelfLife,
        edosage,
      });
      this.setState({ fieldErrors: fieldErrors });
      if (Object.keys(fieldErrors).length) return;

      const payload = {
        ProductCode: this.state.productCode,
        Product: this.state.product,
        RegistrationNo: this.state.registrationCode,
        RegistrationDate: this.state.registrationDate,
        RenewalDate: this.state.renewalDate,
        GenericName: this.state.genericName,
        Composition: this.state.composition,
        ShelfLife: this.state.shelfLife,
        dosageForm: this.state.dosageForm,
      };

      console.log(payload);
      const resp = await AddProduct(payload);
      console.log(resp);

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

  render() {
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
              <h2 style={{ textAlign: "center" }}>Add a Product</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Product Code:"}
                    value={this.state.productCode}
                    onChange={(event) => {
                      this.setState({
                        productCode: event.target.value,
                      });
                      this.onChangeClearError("productCode");
                    }}
                    error={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.productCode
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.productCode
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Registration Number:"}
                    value={this.state.registrationCode}
                    inputProps={{ maxLength: 6 }}
                    onChange={(event) => {
                      const re = /^[0-9\b]+$/;
                      if (
                        event.target.value === "" ||
                        re.test(event.target.value)
                      ) {
                        this.setState({
                          registrationCode: event.target.value,
                        });
                      }
                      this.onChangeClearError("registrationCode");
                    }}
                    error={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.registrationCode
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.registrationCode
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Product:"}
                    value={this.state.product}
                    onChange={(event) => {
                      this.setState({
                        product: event.target.value,
                      });
                      this.onChangeClearError("product");
                    }}
                    error={
                      this.state.fieldErrors && this.state.fieldErrors.product
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors && this.state.fieldErrors.product
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Autocomplete
                    id="dosage-form"
                    options={this.state.dosageFormList}
                    getOptionLabel={(option) => option.dosageForm}
                    onChange={(event, value) => {
                      this.setState({
                        edosage: "s",
                      });
                      this.setState({
                        dosageForm: value?.dosageForm,
                      });

                      console.log("value:" + this.state.edosage);
                      this.onChangeClearError("edosage");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dosage Form:"
                        variant="outlined"
                      />
                    )}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.edosage && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.edosage}
                    </span>
                  )}
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Generic Name:"}
                    value={this.state.genericName}
                    onChange={(event) => {
                      this.setState({
                        genericName: event.target.value,
                      });
                      this.onChangeClearError("genericName");
                    }}
                    error={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.genericName
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.genericName
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Composition:"}
                    value={this.state.composition}
                    onChange={(event) => {
                      this.setState({
                        composition: event.target.value,
                      });
                      this.onChangeClearError("composition");
                    }}
                    error={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.composition
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors &&
                      this.state.fieldErrors.composition
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    fullWidth="true"
                    variant="outlined"
                    label={"Shelf-Life(In Month):"}
                    type="number"
                    value={this.state.shelfLife}
                    onChange={(event) => {
                      this.setState({
                        shelfLife: event.target.value,
                      });
                      this.onChangeClearError("shelfLife");
                    }}
                    error={
                      this.state.fieldErrors && this.state.fieldErrors.shelfLife
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors && this.state.fieldErrors.shelfLife
                    }
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={this.postButton}
                  >
                    Add Product
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
        {(this.state.showSuccess == true || this.state.showError == true) && (
          <AlertModal
            showOpen={this.state.showSuccess || this.state.showError}
            message={this.state.message}
            success={this.state.showSuccess}
            error={this.state.showError}
          />
        )}
      </div>
    );
  }
}
  