import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RM_New_Specs from "../../../Services/QC/Product/Product_New_Specs.js";
import Select from "react-select";
import { toast } from "react-toastify";

import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

export default class RMNewSpecifications extends Component {

  async componentDidMount() {
    const cl = (await (RM_New_Specs.methods.CodeList())).data;
    this.setState({ codes: cl });

    const cn = (await (RM_New_Specs.methods.MaterialList())).data;
    this.setState({ names: cn });

    const re = (await (RM_New_Specs.methods.Reference())).data;
    this.setState({ references: re });

    const pa = (await (RM_New_Specs.methods.Parameters())).data;
    this.setState({ parameters: pa });
    const ac = (await (RM_New_Specs.methods.AcquireCode())).data;
    this.setState({ acc_codes: ac });
    const am = (await (RM_New_Specs.methods.Acquirematerial())).data;
    this.setState({ acc_names: am });
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      cart: [],
      codes: [],
      names: [],
      stages:[],
      stage:'',
      code: '',
      name: '',
      ref: '',
      references: [],
      selectedRows: [],
      issue_no: 1,
      parameters: [],
      selected: {
        para: '',
        specs: '',
      },
      acc_codes: [],
      acc_names: [],
      acc_stages:[],
      acc_code: '',
      acc_name: '',
      acc_stage:'',
      canChange: true,
      canDelete: true,
      canArrow: true,
       fieldErrors:{},

    }
  }

 

  clearForm = () => {
    this.setState(prevState => ({
      selected: {                   // object that we want to update
        ...prevState.selected,    // keep all other key-value pairs

        para: '',
        specs: '',
      }
    }))
    this.setState({
      // code: '',
      // name: '',
      // acc_name: '',
      // acc_code: '',
      // ref: '',
      show: false,
    })
  }
  async updateCart() {
    return new Promise(resolve => {
      this.setState({
        cart: [...this.state.cart, this.state.selected]
      }, () => resolve());
    })
  }

  async fillCode(nam) {
    const temp = (await (RM_New_Specs.methods.CodeByName(nam))).data;
    this.setState({ code: temp.ProductCode },()=>{
      this.getStages(this.state.code)
    })
  }
  async fillName(cod) {
    const temp = (await (RM_New_Specs.methods.NameByCode(cod))).data
    this.setState({ name: temp.Product },()=>{
      this.getStages(cod);
    })
  }
  async fillAccCode(nam) {
    console.log("code NAme --",nam, this.state.acc_name);
    const temp = (await (RM_New_Specs.methods.CodeByNameforaccuire(nam))).data;
    console.log("temp",temp);
    this.setState({ acc_code: temp.ProductCode },()=>{
      this.getAccStages(this.state.acc_code)
    })
    this.fillSpecs(temp.PMCode)
  }
  async fillAccName(cod) {

    const temp = (await (RM_New_Specs.methods.NameByCodeforaccuire(cod))).data
    this.setState({ acc_name: temp.Product },()=>{
      this.getAccStages(cod)
    })
  }
  async fillSpecs(stage) {
    const temp = (await (RM_New_Specs.methods.Acquirespecifications(this.state.acc_code,stage))).data
    this.setState({ cart: [] })
    const temp_array = []
    for (let i = 0; i < temp.length; ++i) {
      const t = {
        para: temp[i].parameter,
        specs: temp[i].specification,
      }
      temp_array.push(t)
    }
    this.setState({ cart: temp_array })
  }

  handlePostData =async()=>{
    let { code, name,stage, ref } = this.state;
    // let { para, specs } = this.state.selected;
    const fieldErrors = this.validateSave({ code, name,stage, ref });
    this.setState({ fieldErrors: fieldErrors });
    if (Object.keys(fieldErrors).length) return;

    const temp= this.state.cart.map(item=>{
      return{
        parameter:item.para,
        specification:item.specs
      }
    })

    const payload ={
      "stage": this.state.stage,
      "ProductCode": this.state.code,
      "reference":this.state.ref,
      "items": temp,
    }

    console.log(payload);

    const resp = (await RM_New_Specs.methods.postSpecifications(payload));
    console.log(resp);
   // alert("Specs Added");
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
    // alert("Request Sent !!");
    this.clearForm();
  } else {
    toast.error("Request Not sent", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // alert("Request Not sent");
  }
  // alert("Specs Added");
  this.setState(prevState => ({
    selected: {                   // object that we want to update
      ...prevState.selected,    // keep all other key-value pairs
      para: '',
      specs: '',
    }
  }))
  this.setState({
    code: '',
    name: '',
    acc_name: '',
    acc_code: '',
    ref: '',
    show: false,
    cart: []
  })

  }
  getStages=async (code)=>{
    const stages= (await RM_New_Specs.methods.newStagelist(code) ).data;
    this.setState({
      stages:stages
    })
  }
  getAccStages=async (code)=>{
    const stages= (await RM_New_Specs.methods.ProductStageListOfSpecifications(code) ).data;
    this.setState({
      acc_stages:stages
    })
  }
  toggle = () =>
    this.setState((currentState) => ({ show: !currentState.show }));
  

  
  validateSave = (fields) => {
    const errors = {};
    if (!fields.code) errors.code = "Material Code Required";
    if (!fields.name) errors.name = "Material Name Required";
    if (!fields.stage) errors.stage = "Stage Required";
    if (!fields.ref) errors.ref = "Reference Required";
      // if (!fields.para) errors.para = "Parameter Required";
      // if (!fields.specs) errors.specs = "Specification Required";
    return errors;
  };
  validateAdd = (fields) => {
    const errors = {};
    // if (!fields.code) errors.code = "Material Code Required";
     // if (!fields.name) errors.name = "Material Name Required";
    // if (!fields.ref) errors.ref = "Reference Required";
    if (!fields.para) errors.para = "Parameter Required";
    if (!fields.specs) errors.specs = "Specification Required";
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
    var today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    const products_array = []
    for (let i = 0; i < this.state.cart.length; ++i) {
      let temp = {
        id: i + 1,
        parameter: this.state.cart[i].para,
        specifications: this.state.cart[i].specs,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "parameter",
        headerName: "Parameter",
        width: 210,
      },
      {
        field: "specifications",
        headerName: "Specification",
        width: 400,
      },
    ];
    return (
      <div>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>New Product Specification </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                      <Select
                          name="code"
                          placeholder="Product Code"
                          components={{
                            ValueContainer:CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          label="Product Code"
                          isSearchable={true}
                          options={this.state.codes}
                          value={
                            this.state.code ? { ProductCode: this.state.code } : null
                          }
                          getOptionValue={(option) => option.ProductCode}
                          getOptionLabel={(option) => option.ProductCode}
                          onChange={(value, select) => {
                            this.setState({ code: value.ProductCode })
                            this.fillName(value.ProductCode);
                            console.log(value, select.name);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors && this.state.fieldErrors.code && (
                          <span className="MuiFormHelperText-root Mui-error">
                            {this.state.fieldErrors.code}
                          </span>
                        )}
                        {/* <TextField
                          id="MC"
                          select
                          label="Material Code:"
                          fullWidth="true"
                          value={this.state.code}
                          onChange={(event) => {
                            this.setState({ code: event.target.value })
                            this.fillName(event.target.value);
                          }}
                        >
                          {this.state.codes.map((cod) => (
                            <MenuItem key={cod['ProductCode']} value={cod['ProductCode']}>
                              {cod['ProductCode']}
                            </MenuItem>
                          ))}
                        </TextField> */}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                      <Select
                          name="name"
                          placeholder="Product Name"
                          className="customSelect"
                          classNamePrefix="select"
                          components={{
                            ValueContainer:CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          isSearchable={true}
                          options={this.state.names}
                          value={
                            this.state.name ? { Product: this.state.name } : null
                          }
                          getOptionValue={(option) => option.Product}
                          getOptionLabel={(option) => option.Product}
                          onChange={(value, select) => {
                            this.setState({ name: value.Product })
                            this.fillCode(value.Product);
                            console.log(value, select.name);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors && this.state.fieldErrors.name && (
                          <span className="MuiFormHelperText-root Mui-error">
                            {this.state.fieldErrors.name}
                          </span>
                        )}
                        {/* <TextField
                          id="RM"
                          select
                          label="Material Name:"
                          fullWidth="true"
                          value={this.state.name}
                          onChange={(event) => {
                            this.setState({ name: event.target.value });
                            this.fillCode(event.target.value);
                          }}
                        >
                          {this.state.names.map((nam) => (
                            <MenuItem key={nam['Product']} value={nam['Product']}>
                              {nam['Product']}
                            </MenuItem>
                          ))}
                        </TextField> */}
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                      <Select
                          name="stage"
                          placeholder="Stage"
                          components={{
                            ValueContainer:CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.stages}
                          value={
                            this.state.stage ? { stage: this.state.stage } : null
                          }
                          getOptionValue={(option) => option.stage}
                          getOptionLabel={(option) => option.stage}
                          onChange={(value, select) => {
                            this.setState({ stage : value.stage })
                            // this.fillName(value.reference);
                            console.log(value, select.name);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors && this.state.fieldErrors.stage && (
                          <span className="MuiFormHelperText-root Mui-error">
                            {this.state.fieldErrors.stage}
                          </span>
                        )}
                        {/* <TextField
                          id="stage"
                          select
                          label="Stage"
                          fullWidth="true"
                          value={this.state.stage}
                          onChange={(event) => {
                            this.setState({ stage: event.target.value });
                            // this.fillCode(event.target.value);
                          }}
                        >
                          {this.state.stages.map((nam) => (
                            <MenuItem key={nam['stage']} value={nam['stage']}>
                              {nam['stage']}
                            </MenuItem>
                          ))}
                        </TextField> */}
                        
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                      <Select
                          name="ref"
                          placeholder="Reference"
                          components={{
                            ValueContainer:CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.references}
                          value={
                            this.state.ref ? { reference: this.state.ref } : null
                          }
                          getOptionValue={(option) => option.reference}
                          getOptionLabel={(option) => option.reference}
                          onChange={(value, select) => {
                            this.setState({ ref: value.reference })
                            // this.fillName(value.reference);
                            console.log(value, select.name);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors && this.state.fieldErrors.ref && (
                          <span className="MuiFormHelperText-root Mui-error">
                            {this.state.fieldErrors.ref}
                          </span>
                        )}
                      </GridItem>
                      
                    </GridContainer>

                    <GridContainer>
                      <GridItem md={1}></GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="SOP"
                          variant="outlined"
                          label="SOP/Dmd No"
                          style={{ backgroundColor: "#ebebeb" }}
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Date"
                          defaultValue={date}
                        />
                      </GridItem>

                      <GridItem xs={8} sm={8} md={3}>
                        <TextField
                          id="ISSUE"
                          variant="outlined"
                          label="Issue No"
                          fullWidth="true"
                          value={this.state.issue_no}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                      
                      </GridContainer>

                    <GridContainer> 
                      <GridItem xs={12} sm={12} md={6}>
                      <Select
                          name="para"
                          placeholder="Parameter"
                          className="customSelect"
                          classNamePrefix="select"
                          components={{
                            ValueContainer:CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          isSearchable={true}
                          options={this.state.parameters}
                          value={
                            this.state.selected.para ? { parameter: this.state.selected.para } : null
                          }
                          getOptionValue={(option) => option.parameter}
                          getOptionLabel={(option) => option.parameter}
                          onChange={(value, select) => {
                            this.setState(
                              (prevState) => ({
                                selected: {
                                  ...prevState.selected,
                                  para: value.parameter,
                                }
                              }))
                            console.log("jan", value, select.name);
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors && this.state.fieldErrors.para && (
                          <span className="MuiFormHelperText-root Mui-error">
                            {this.state.fieldErrors.para}
                          </span>
                        )}
                        {/* <TextField
                          id="PARA"
                          select
                          label="Parameter:"
                          fullWidth="true"
                          value={this.state.selected.para}
                          onChange={(event) => {
                            this.setState(prevState => ({
                              selected: {                  // object that we want to update
                                ...prevState.selected,     // keep all other key-value pairs
                                para: event.target.value  // update the value of specific key
                              }
                            }))
                          }}
                        >
                          {this.state.parameters.map((par) => (
                            <MenuItem key={par['parameter']} value={par['parameter']}>
                              {par['parameter']}
                            </MenuItem>
                          ))}
                        </TextField> */}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                      <TextField
                          id="SPECS"
                          label="Specifications"
                          variant="outlined"
                          fullWidth="true"
                          name="specs"
                          value={this.state.selected.specs}
                          error={
                            this.state.fieldErrors &&
                              this.state.fieldErrors.specs
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.specs
                          }
                          onChange={(event) => {
                            this.setState(prevState => ({
                              selected: {                  // object that we want to update
                                ...prevState.selected,     // keep all other key-value pairs
                                specs: event.target.value  // update the value of specific key
                              }
                            }))
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      {/* <GridItem xs={12} sm={12} md={2}>
                        <Button
                          className=""
                          startIcon={<ImportExportIcon />}
                          onClick={this.toggle}
                          color="primary"
                        >
                          Acquire Specifications
                        </Button>
                      </GridItem> */}
                    </GridContainer>
                   {
                   //button
                   }
                    <GridContainer>
                      <GridItem md={4}></GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                        <Button
                          className=""
                          startIcon={<ImportExportIcon />}
                          onClick={this.toggle}
                          color="primary"
                        >
                          Acquire Specifications
                        </Button>
                      </GridItem>
                    </GridContainer>

                    {this.state.show && (
                      <div id="hide">
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={5}>
                          <Select
                              name="acc_code"
                              placeholder="Material Code"
                              className="customSelect"
                              classNamePrefix="select"
                              components={{
                                ValueContainer:CustomValueContainer,
                              }}
                              styles={CustomSelectStyle}
                              isSearchable={true}
                              options={this.state.acc_codes}
                              value={
                                this.state.acc_code ? { ProductCode: this.state.acc_code } : null
                              }
                              getOptionValue={(option) => option.ProductCode}
                              getOptionLabel={(option) => option.ProductCode}
                              onChange={(value, select) => {
                                this.setState({ acc_code: value.ProductCode })
                                this.fillAccName(value.ProductCode);
                              }}
                            />
                            {/* <TextField
                              id="ARM"
                              select
                              label="Material Code:"
                              fullWidth="true"
                              value={this.state.acc_code}
                              onChange={(event) => {
                                this.setState({ acc_code: event.target.value })
                                this.fillAccName(event.target.value);
                                
                              }}
                            >
                              {this.state.acc_codes.map((obj) => (
                                <MenuItem key={obj['ProductCode']} value={obj['ProductCode']}>
                                  {obj['ProductCode']}
                                </MenuItem>
                              ))}
                            </TextField> */}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                          <Select
                              name="acc_name"
                              placeholder="Product Name"
                              className="customSelect"
                              classNamePrefix="select"
                              components={{
                                ValueContainer:CustomValueContainer,
                              }}
                              styles={CustomSelectStyle}
                              isSearchable={true}
                              options={this.state.acc_names}
                              value={
                                this.state.acc_name ? { Product: this.state.acc_name } : null
                              }
                              getOptionValue={(option) => option.Product}
                              getOptionLabel={(option) => option.Product}
                              onChange={(value) => {
                                this.setState({ acc_name: value.Product })
                                this.fillAccCode(value.Product);
                              }}
                            />
                            {/* <TextField
                              id="AMC"
                              select
                              label="Material Name"
                              fullWidth="true"
                              value={this.state.acc_name}
                              onChange={(event) => {

                                this.setState({ acc_name: event.target.value },()=>{
                                  this.fillAccCode(this.state.acc_name)
                                })
                                
                              }}
                            >
                              {this.state.acc_names.map((obj) => (
                                <MenuItem key={obj['Product']} value={obj['Product']}>
                                  {obj['Product']}
                                </MenuItem>
                              ))}
                            </TextField> */}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <Select
                              name="Acc_stage"
                              placeholder="Stage"
                              className="customSelect"
                              classNamePrefix="select"
                              components={{
                                ValueContainer:CustomValueContainer,
                              }}
                              styles={CustomSelectStyle}
                              isSearchable={true}
                              options={this.state.acc_stage}
                              value={
                                this.state.Acc_stage ? { stage: this.state.Acc_stage } : null
                              }
                              getOptionValue={(option) => option.stage}
                              getOptionLabel={(option) => option.stage}
                              onChange={(value) => {
                                this.setState({ Acc_stage: value.stage })
                                this.fillAccCode(value.stage);
                              }}
                            />
                            
                            {/* <TextField
                              id="Acc_stage"
                              select
                              label="Stage"
                              fullWidth="true"
                              value={this.state.acc_stage}
                              onChange={(event) => {

                                this.setState({ acc_stage: event.target.value },()=>{
                                  // this.fillAccCode(this.state.acc_stage)
                                  this.fillSpecs(event.target.value);
                                })
                                
                              }}
                            >
                              {this.state.acc_stages.map((obj) => (
                                <MenuItem key={obj['stage']} value={obj['stage']}>
                                  {obj['stage']}
                                </MenuItem>
                              ))}
                            </TextField> */}
                          </GridItem>
                        </GridContainer>
                      </div>
                    )}

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                      <Button
                          className=""
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={() => {
                            let present = false;
                            for (let i = 0; i < this.state.cart.length; ++i) {
                              if (this.state.cart[i].paramter === this.state.selected.para) {
                                present = true;
                                break;
                              }
                            }
                            if (this.state.selected.para == '' || this.state.ref == '' ||
                              this.state.selected.specs == '' ||
                              this.state.code == '' || this.state.name == '') {
                              // let { code, name, ref } = this.state;
                              let { para, specs } = this.state.selected;
                              const fieldErrors = this.validateAdd({ para, specs });
                              this.setState({ fieldErrors: fieldErrors });
                              if (Object.keys(fieldErrors).length) return;
                              // alert("Please fill the form first to add into cart.")
                            }
                            else if (present === true) {
                              alert("This Parameter is already present in cart.")
                            }
                            else {

                              this.updateCart();
                              this.clearForm();
                            }
                          }}
                        > Add </Button>
                        <Button
                          className=""
                          startIcon={<SaveIcon />}
                          onClick={() => {
                            this.handlePostData();
                          }}
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          className=""
                          startIcon={<EditIcon />}
                          onClick={() => {
                            var array = [...this.state.cart];
                            var index = -1;
                            for (let i = 0; i < this.state.cart.length; ++i) {
                              if (products_array[i].id === this.state.selectedRows[0]) {
                                index = i;
                                break;
                              }
                            }

                            if (index !== -1) {

                              let temp = {
                                para: this.state.cart[index].para,
                                specs: this.state.cart[index].specs,
                              }

                              this.setState({ selected: temp });
                              array.splice(index, 1);
                              this.setState({ cart: array });
                            }
                          }}
                          color="primary"
                          disabled={this.state.canChange}
                        >
                          Change
                        </Button>
                        <Button
                          className=""
                          startIcon={<DeleteOutlineIcon />}
                          onClick={() => {
                            var array = [...this.state.cart];
                            for (let x = 0; x < this.state.selectedRows.length; ++x) {
                              var index = -1;
                              for (let i = 0; i < this.state.cart.length; ++i) {

                                if (products_array[i].id === this.state.selectedRows[x]) {
                                  index = i;
                                  break;
                                }
                              }

                              if (index !== -1) {
                                array.splice(index, 1);
                                this.setState({ cart: array });
                              }
                            }
                          }}
                          color="secondary"
                          disabled={this.state.canDelete}
                        >
                          Delete
                        </Button>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<ArrowUpwardIcon />}
                          disabled={this.state.canArrow}
                          onClick={() => {
                            var array = [...this.state.cart];
                            for (
                              let x = 0;
                              x < this.state.selectedRows.length;
                              ++x
                            ) {
                              var index = -1;
                              for (
                                let i = 0;
                                i < products_array.length;
                                ++i
                              ) {
                                if (
                                  products_array[i].id ===
                                  this.state.selectedRows[x]
                                ) {
                                  index = i;
                                  break;
                                }
                              }

                              if (index > 0) {
                                let t = array[index];
                                array[index] = array[index - 1];
                                array[index - 1] = t;
                                this.setState({ cart: array });
                              }
                            }
                          }}
                        ></Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={this.state.canArrow}
                          startIcon={<ArrowDownwardIcon />}
                          onClick={() => {
                            var array = [...this.state.cart];
                            for (
                              let x = 0;
                              x < this.state.selectedRows.length;
                              ++x
                            ) {
                              var index = -1;
                              for (
                                let i = 0;
                                i < products_array.length;
                                ++i
                              ) {
                                if (
                                  products_array[i].id ===
                                  this.state.selectedRows[x]
                                ) {
                                  index = i;
                                  break;
                                }
                              }

                              if (
                                index !== -1 &&
                                index < products_array.length - 1
                              ) {
                                let t = array[index];
                                array[index] = array[index + 1];
                                array[index + 1] = t;
                                this.setState({ cart: array });
                              }
                            }
                          }}
                        ></Button>
                      </GridItem>
                    </GridContainer>

                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        <div style={{ height: 450, width: "100%" }}>
                          <DataGrid
                            rows={products_array}
                            columns={columns}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={(event) => {
                              this.setState({ selectedRows: event })

                              if (event.length === 1) {
                                this.setState({ canChange: false })
                                this.setState({ canDelete: false })
                                this.setState({ canArrow: false })
                              }
                              else {
                                this.setState({ canChange: true })
                                this.setState({ canDelete: true })
                                this.setState({ canArrow: true })
                              }
                            }}
                          />
                        </div>
                      </GridContainer>
                    </GridItem>
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
