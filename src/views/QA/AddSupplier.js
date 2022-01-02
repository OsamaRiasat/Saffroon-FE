import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { toast } from "react-toastify";
import Select, { components } from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import { AddSupplierService } from "../../Services/QA/Add_Supplier";

export default class AddSupplier extends Component {
  constructor(props) {
    super(props);

    this.onHandlephoneNumberChange = this.onHandlephoneNumberChange.bind(this);
    this.onHandlepersonPhoneChange = this.onHandlepersonPhoneChange.bind(this);

    this.state = {
      fieldErrors: {},
      regexp: /^[0-9\b]+$/,
      phoneNumber: "",
      personPhone: "",
      supplierName: "",
      supplierEmail: "",
      address: "",
      country: "",
      city: "",
      contactPersonName: "",
    };
  }

  onHandlephoneNumberChange = (e) => {
    let phoneNumber = e.target.value;
    // if value is not blank, then test the regex
    if (phoneNumber === "" || this.state.regexp.test(phoneNumber)) {
      this.setState({ [e.target.name]: phoneNumber });
    }
  };

  onHandlepersonPhoneChange = (e) => {
    let personPhone = e.target.value;
    // if value is not blank, then test the regex
    if (personPhone === "" || this.state.regexp.test(personPhone)) {
      this.setState({ [e.target.name]: personPhone });
    }
  };

  sendRequest = async () => {
    try {
      let {
        phoneNumber,
        personPhone,
        supplierName,
        supplierEmail,
        address,
        country,
        city,
        contactPersonName,
      } = this.state;

      const fieldErrors = this.validate({
        phoneNumber,
        personPhone,
        supplierName,
        supplierEmail,
        address,
        country,
        city,
        contactPersonName,
      });
      this.setState({ fieldErrors: fieldErrors });
      if (Object.keys(fieldErrors).length) return;

      const payload = {
        phoneNumber: this.state.phoneNumber,
        personPhone: this.state.personPhone,
        supplierName: this.state.supplierName,
        supplierEmail: this.state.supplierEmail,
        address: this.state.address,
        country: this.state.country,
        city: this.state.city,
        contactPersonName: this.state.personPhone,
      };

      const payload2 = {
        S_Name: supplierName,
        S_Email: supplierEmail,
        S_Address: address,
        S_City: city,
        S_Country: country,
        S_Phone: phoneNumber,
        contactPersonName: contactPersonName,
        contactPersonPhone: personPhone,
      };

      console.log(payload2);

      const resp = await AddSupplierService(payload2);

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

  validate = (fields) => {
    const errors = {};
    if (!fields.phoneNumber) errors.phoneNumber = "Required!";
    if (!fields.personPhone) errors.personPhone = "Required!";
    if (!fields.supplierName) errors.supplierName = "Required!";
    if (!fields.supplierEmail) errors.supplierEmail = "Required!";
    if (!fields.address) errors.address = "Required!";
    if (!fields.country) errors.country = "Required!";
    if (!fields.city) errors.city = "Required!";
    if (!fields.contactPersonName) errors.contactPersonName = "Required!";
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

  clearForm = () => {
    this.setState({
      fieldErrors: {},
      phoneNumber: "",
      personPhone: "",
      supplierName: "",
      supplierEmail: "",
      address: "",
      country: "",
      city: "",
      contactPersonName: "",
    });
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
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>Add Supplier</h2>
            </CardHeader>
            <CardBody>
              <CardContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id="date"
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      value={date}
                      variant="outlined"
                      label="Date: "
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Supplier Name:"
                      value={this.state.supplierName}
                      variant="outlined"
                      fullWidth="true"
                      onChange={(event) => {
                        this.setState({
                          supplierName: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.supplierName
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.supplierName
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Supplier Email:"
                      value={this.state.supplierEmail}
                      variant="outlined"
                      fullWidth="true"
                      onChange={(event) => {
                        this.setState({
                          supplierEmail: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.supplierEmail
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.supplierEmail
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Phone Number:"
                      variant="outlined"
                      fullWidth="true"
                      type="tel"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.onHandlephoneNumberChange}
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.phoneNumber
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.phoneNumber
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Address:"
                      value={this.state.address}
                      multiline
                      variant="outlined"
                      fullWidth="true"
                      onChange={(event) => {
                        this.setState({
                          address: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors && this.state.fieldErrors.address
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors && this.state.fieldErrors.address
                      }
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Country:"
                      variant="outlined"
                      fullWidth="true"
                      value={this.state.country}
                      onChange={(event) => {
                        this.setState({
                          country: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors && this.state.fieldErrors.country
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors && this.state.fieldErrors.country
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="City:"
                      variant="outlined"
                      fullWidth="true"
                      value={this.state.city}
                      onChange={(event) => {
                        this.setState({
                          city: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors && this.state.fieldErrors.city
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors && this.state.fieldErrors.city
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Contact Person Name:"
                      variant="outlined"
                      fullWidth="true"
                      value={this.state.contactPersonName}
                      onChange={(event) => {
                        this.setState({
                          contactPersonName: event.target.value,
                        });
                        this.onChangeClearError(event.target.name);
                      }}
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.contactPersonName
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.contactPersonName
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Contact Person Phone:"
                      variant="outlined"
                      fullWidth="true"
                      type="tel"
                      name="personPhone"
                      value={this.state.personPhone}
                      onChange={this.onHandlepersonPhoneChange}
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.personPhone
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.personPhone
                      }
                    />
                  </GridItem>
                </GridContainer>
                <br></br>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9}></GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      className=""
                      color="primary"
                      fullWidth="true"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        this.sendRequest();
                      }}
                    >
                      Add Supplier
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardContent>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
