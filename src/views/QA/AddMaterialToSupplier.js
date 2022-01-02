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
import { convertGridRowsPropToState, DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { toast } from "react-toastify";
import Select, { components } from "react-select";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

import {
  ShowSuppliers,
  RawMaterialCodesppliers,
  PackingMaterialCodesppliers,
  AddSupplier,
} from "../../Services/QA/Approve_Material_for_Supplier";

export default class ApproveMaterialToSupplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ["Raw Material", "Packing Material"],
      showCodeList: [],
      suppliers_list: [],
      rmCodes_list: [],
      pmCodes_list: [],
      rmCode: "",
      rmName: "",
      showCode: "",
      suppliers_id: "",
      supplier_Name: "",
      supplier_Address: "",
      supplier_City: "",
      supplier_Country: "",
      supplier_Email: "",
      supplier_PhoneNumber: "",
      supplier_PersonName: "",

      fieldErrors: {},

      selected: {
        type: "",
      },
    };
  }

  async componentDidMount() {
    const suppliers = (await ShowSuppliers()).data;
    this.setState({ suppliers_list: suppliers });
    console.log(this.state.suppliers_list);

    const rmCodes = (await RawMaterialCodesppliers()).data;
    this.setState({ rmCodes_list: rmCodes });
    console.log(this.state.rmCodes_list);

    const pmCodes = (await PackingMaterialCodesppliers()).data;
    this.setState({ pmCodes_list: pmCodes });
    console.log(this.state.pmCodes_list);
  }

  onChangeClear = () => {
    this.setState({ showCode: "", rmName: "" });
  };

  onChangeCodes = (kaka) => {
    if (kaka == "Raw Material") {
      this.setState({
        showCodeList: this.state.rmCodes_list,
        selectedType: "RM",
      });
    }
    if (kaka == "Packing Material") {
      this.setState({
        showCodeList: this.state.pmCodes_list,
        selectedType: "PM",
      });
    }
  };

  clearForm = () => {
    this.setState({
      showCodeList: [],
      suppliers_list: [],
      rmCodes_list: [],
      pmCodes_list: [],
      rmCode: "",
      rmName: "",
      showCode: "",
      suppliers_id: "",
      supplier_Name: "",
      supplier_Address: "",
      supplier_City: "",
      supplier_Country: "",
      supplier_Email: "",
      supplier_PhoneNumber: "",
      supplier_PersonName: "",

      selectedType: "",

      fieldErrors: {},
      selected: {
        type: "",
      },
    });
  };

  sendRequest = async () => {
    try {
      let { type, showCode, suppliers_id } = this.state;
      const fieldErrors = this.validate({ type, showCode, suppliers_id });
      console.log(fieldErrors);
      this.setState({ fieldErrors: fieldErrors });
      if (Object.keys(fieldErrors).length) return;
      
      const payload2 = {
        MCode: this.state.showCode,
        materialType: this.state.selectedType,
        S_ID: this.state.suppliers_id,
      };

      console.log(payload2);

      const resp = await AddSupplier(payload2);

      if (resp.status === 200) {
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
    if (!fields.type) errors.type = "Select Type First";
    if (!fields.showCode) errors.showCode = "Code Required";
    if (!fields.suppliers_id) errors.suppliers_id = "Select Suppllier";
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

  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>
                Approve Material for Supplier
              </h2>
            </CardHeader>
            <CardBody>
              <CardContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      id=""
                      name="type"
                      fullWidth="true"
                      variant="outlined"
                      error={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.type
                          ? true
                          : false
                      }
                      helperText={
                        this.state.fieldErrors &&
                        this.state.fieldErrors.type
                      }
                      label="Type: "
                      select
                      value={this.state.selected.type}
                      onChange={(event, select) => {
                        this.setState((prevState) => ({
                          selected: {
                            // object that we want to update
                            ...prevState.selected, // keep all other key-value pairs
                            type: event.target.value, // update the value of specific key
                          },
                        }));
                        this.onChangeClear();
                        this.onChangeCodes(event.target.value);
                        this.onChangeClearError(event.target.name);
                      }}
                    >
                      {this.state.type.map((pri) => (
                        <MenuItem key={pri} value={pri}>
                          {pri}
                        </MenuItem>
                      ))}
                    </TextField>
                    
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Select
                      name="showCode"
                      placeholder="Code:"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.showCodeList}
                      value={
                        this.state.showCode
                          ? { RMCode: this.state.showCode }
                          : null
                      }
                      getOptionValue={(option) => option.RMCode}
                      getOptionLabel={(option) => option.RMCode}
                      onChange={(value, select) => {
                        this.setState({
                          showCode: value.RMCode,
                          rmName: value.Material,
                          rmCode:value.RMCode
                        });
                        this.onChangeClearError(select.name);
                      }}
                    />
                    {this.state.fieldErrors && this.state.fieldErrors.showCode && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.showCode}
                      </span>
                    )}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <Select
                      // name="e_material"
                      placeholder="Material:"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.showCodeList}
                      value={
                        this.state.rmName
                          ? { Material: this.state.rmName }
                          : null
                      }
                      getOptionValue={(option) => option.Material}
                      getOptionLabel={(option) => option.Material}
                      onChange={(value, select) => {
                        this.setState({
                          showCode: value.RMCode,
                          rmName: value.Material,
                        });
                        // this.onChangeClearError(select.name);
                      }}
                    />
                    {/* {this.state.fieldErrors &&
                      this.state.fieldErrors.e_material && (
                        <span className="MuiFormHelperText-root Mui-error">
                          {this.state.fieldErrors.e_material}
                        </span>
                      )} */}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Select
                      name="suppliers_id"
                      placeholder="Supplier ID:"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.suppliers_list}
                      value={
                        this.state.suppliers_id
                          ? { S_ID: this.state.suppliers_id }
                          : null
                      }
                      getOptionValue={(option) => option.S_ID}
                      getOptionLabel={(option) => option.S_ID}
                      onChange={(value, select) => {
                        this.setState({
                          suppliers_id: value.S_ID,
                          supplier_Name: value.S_Name,
                          supplier_Address: value.S_Address,
                          supplier_City: value.S_City,
                          supplier_Country: value.S_Country,
                          supplier_Email: value.S_Email,
                          supplier_PhoneNumber: value.contactPersonPhone,
                          supplier_PersonName: value.contactPersonName,
                        });
                        this.onChangeClearError(select.name);
                      }}
                    />
                    {this.state.fieldErrors && this.state.fieldErrors.suppliers_id && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.suppliers_id}
                      </span>
                    )}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Select
                      // name="e_id"
                      placeholder="Supplier Name:"
                      components={{
                        ValueContainer: CustomValueContainer,
                      }}
                      styles={CustomSelectStyle}
                      className="customSelect"
                      classNamePrefix="select"
                      isSearchable={true}
                      options={this.state.suppliers_list}
                      value={
                        this.state.supplier_Name
                          ? { S_Name: this.state.supplier_Name }
                          : null
                      }
                      getOptionValue={(option) => option.S_Name}
                      getOptionLabel={(option) => option.S_Name}
                      onChange={(value, select) => {
                        this.setState({
                          suppliers_id: value.S_ID,
                          supplier_Name: value.S_Name,
                          supplier_Address: value.S_Address,
                          supplier_City: value.S_City,
                          supplier_Country: value.S_Country,
                          supplier_Email: value.S_Email,
                          supplier_PhoneNumber: value.contactPersonPhone,
                          supplier_PersonName: value.contactPersonName,
                        });
                        // this.onChangeClearError(select.name);
                      }}
                    />
                    {/* {this.state.fieldErrors && this.state.fieldErrors.e_id && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.e_id}
                      </span>
                    )} */}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Address:"
                      multiline
                      variant="outlined"
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      value={this.state.supplier_Address}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="City:"
                      variant="outlined"
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      value={this.state.supplier_City}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Country:"
                      variant="outlined"
                      fullWidth="true"
                      InputProps={{ readOnly: true }}
                      value={this.state.supplier_Country}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Supplier Email:"
                      variant="outlined"
                      fullWidth="true"
                      name="supplierEmail"
                      InputProps={{ readOnly: true }}
                      value={this.state.supplier_Email}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Phone Number:"
                      variant="outlined"
                      fullWidth="true"
                      type="tel"
                      name="phoneNumber"
                      value={this.state.supplier_PhoneNumber}
                      InputProps={{ readOnly: true }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="Contact Person Name:"
                      variant="outlined"
                      fullWidth="true"
                      value={this.state.supplier_PersonName}
                      InputProps={{ readOnly: true }}
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
                      startIcon={<DoneAllIcon />}
                      onClick={() => {
                        this.sendRequest();
                      }}
                    >
                      Approve
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
