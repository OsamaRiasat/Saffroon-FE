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
import RM_New_Specs from "../../../Services/QC/RM/RM_New_Specs.js";
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
      acc_code: '',
      acc_name: '',
      canChange: true,
      canDelete: true,
      canArrow: true,
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
    this.setState({ code: temp.RMCode })
  }
  async fillName(cod) {
    const temp = (await (RM_New_Specs.methods.NameByCode(cod))).data
    this.setState({ name: temp.Material })
  }
  async fillAccCode(nam) {
    const temp = (await (RM_New_Specs.methods.CodeByNameforaccuire(nam))).data;
    this.setState({ acc_code: temp.RMCode })
    this.fillSpecs(temp.RMCode)
  }
  async fillAccName(cod) {
    const temp = (await (RM_New_Specs.methods.NameByCodeforaccuire(cod))).data
    this.setState({ acc_name: temp.Material })
  }
  async fillSpecs(cod) {
    const temp = (await (RM_New_Specs.methods.Acquirespecifications(cod))).data
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

    const temp= this.state.cart.map(item=>{
      return{
        parameter:item.para,
        specification:item.specs
      }
    })

    const payload ={
      "RMCode": this.state.code,
      "reference": this.state.ref,
      "items": temp,
    }

    console.log(payload);

    const resp = (await RM_New_Specs.methods.postSpecifications(payload));
    console.log(resp);
    alert("Specs Added");
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
      cart:[]
    })


  }
  toggle = () =>
    this.setState((currentState) => ({ show: !currentState.show }));

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
              <h4>New Raw Material Specification </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
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
                            <MenuItem key={cod['RMCode']} value={cod['RMCode']}>
                              {cod['RMCode']}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
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
                            <MenuItem key={nam['Material']} value={nam['Material']}>
                              {nam['Material']}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="REF"
                          variant="outlined"
                          label="Reference "
                          fullWidth="true"
                          select
                          value={this.state.ref}
                          onChange={(event) => {
                            this.setState({ ref: event.target.value })
                          }}
                        >
                          {this.state.references.map((ref) => (
                            <MenuItem key={ref['reference']} value={ref['reference']}>
                              {ref['reference']}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="SOP"
                          variant="outlined"
                          label="SOP/Dmd No"
                          style={{ backgroundColor: "#ebebeb" }}
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="date"
                          fullWidth="true"
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                          label="Date"
                          defaultValue={date}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id="ISSUE"
                          variant="outlined"
                          label="Issue No."
                          fullWidth="true"
                          value={this.state.issue_no}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
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
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="SPECS"
                          label="Specifications"
                          variant="outlined"
                          fullWidth="true"
                          value={this.state.selected.specs}
                          onChange={(event) => {
                            this.setState(prevState => ({
                              selected: {                  // object that we want to update
                                ...prevState.selected,     // keep all other key-value pairs
                                specs: event.target.value  // update the value of specific key
                              }
                            }))
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
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
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="ARM"
                              select
                              label="Material Code:"
                              fullWidth="true"
                              value={this.state.acc_code}
                              onChange={(event) => {
                                this.setState({ acc_code: event.target.value })
                                this.fillAccName(event.target.value);
                                this.fillSpecs(event.target.value);
                              }}
                            >
                              {this.state.acc_codes.map((obj) => (
                                <MenuItem key={obj['RMCode']} value={obj['RMCode']}>
                                  {obj['RMCode']}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="AMC"
                              select
                              label="Material Name:"
                              fullWidth="true"
                              value={this.state.acc_name}
                              onChange={(event) => {
                                this.setState({ acc_name: event.target.value })
                                this.fillAccCode(event.target.value);
                              }}
                            >
                              {this.state.acc_names.map((obj) => (
                                <MenuItem key={obj['Material']} value={obj['Material']}>
                                  {obj['Material']}
                                </MenuItem>
                              ))}
                            </TextField>
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
                              alert("Please fill the form first to add into cart.")
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
