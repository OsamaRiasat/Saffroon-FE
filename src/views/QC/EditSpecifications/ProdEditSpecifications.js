import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
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
import RM_Edit_Specs from "../../../Services/QC/Product/Product_Edit_Specs.js";

export default class RMEditSpecifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      cart: [],
      sop_no: '',
      codes: [],
      names: [],
      code: '',
      name: '',
      ref: '',
      date: '',
      references: [],
      selectedRows: [],
      issue_no: "",
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
      reason: '',
      stages:[],
      stage:'',
      acc_stages:[],
      acc_stage:'',
    }
  }

  async componentDidMount() {
    const cl = (await (RM_Edit_Specs.methods.AcquireCode())).data;
    this.setState({ codes: cl });

    const cn = (await (RM_Edit_Specs.methods.Acquirematerial())).data;
    this.setState({ names: cn });

    const re = (await (RM_Edit_Specs.methods.Reference())).data;
    this.setState({ references: re });

    const pa = (await (RM_Edit_Specs.methods.Parameters())).data;
    this.setState({ parameters: pa });
    const ac = (await (RM_Edit_Specs.methods.AcquireCode())).data;
    this.setState({ acc_codes: ac });
    const am = (await (RM_Edit_Specs.methods.Acquirematerial())).data;
    this.setState({ acc_names: am });

    // var today = new Date();
    // let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    // this.setState({date: date})
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
    console.log("Fill Name")
    const temp = (await (RM_Edit_Specs.methods.CodeByName(nam))).data;
    this.setState({ code: temp.ProductCode },()=>{
      this.getStages(this.state.code)
    }
    )
    // this.fillSpecs(temp.PMCode)
  }
  async fillName(cod) {
    console.log("Fill Name")
    const temp = (await (RM_Edit_Specs.methods.NameByCode(cod))).data
    this.setState({ name: temp.Product },()=>{
      this.getStages(cod)
    }
    )
  }
  async fillAccCode(nam) {
    console.log("Fill Acc Code ")
    const temp = (await (RM_Edit_Specs.methods.CodeByName(nam))).data;
    this.setState({ acc_code: temp.ProductCode },()=>{
      this.getAccStages(this.state.acc_code)
    })
    // this.fillAccSpecs(temp.RMCode)
  }
  async fillAccName(cod) {
    const temp = (await (RM_Edit_Specs.methods.NameByCode(cod))).data
    this.setState({ acc_name: temp.Product },()=>{
      this.getAccStages(cod);
    })
  }
  async fillSpecs(stage) {
    const temp = (await (RM_Edit_Specs.methods.RMEditSpecificationView(this.state.code,stage))).data
    console.log(temp)
    this.setState({ cart: [] })
    const temp_array = []
    for (let i = 0; i < temp.items.length; ++i) {
      const t = {
        para: temp.items[i].parameter,
        specs: temp.items[i].specification,
      }
      temp_array.push(t)
    }
    this.setState({ cart: temp_array })
    this.setState({code: temp.ProductCode})
    this.setState({sop_no: temp.SOPNo})
    this.setState({date: temp.date})
    this.setState({ref: temp.reference})
    this.setState({ issue_no:temp.version})
  }
  async fillAccSpecs(stage) {
    const temp = (await (RM_Edit_Specs.methods.RMEditSpecificationView(this.state.acc_code,stage))).data
    console.log(temp)
    this.setState({ cart: [] })
    const temp_array = []
    for (let i = 0; i < temp.items.length; ++i) {
      const t = {
        para: temp.items[i].parameter,
        specs: temp.items[i].specification,
      }
      temp_array.push(t)
    }
    this.setState({ cart: temp_array })
  }

  getStages=async (code)=>{
    const stages= (await RM_Edit_Specs.methods.allStagelist(code) ).data;
    this.setState({
      stages:stages
    })
  }
  getAccStages=async (code)=>{
    const stages= (await RM_Edit_Specs.methods.ProductStageListOfSpecifications(code) ).data;
    this.setState({
      acc_stages:stages
    })
  }

  toggle = () =>
    this.setState((currentState) => ({ show: !currentState.show }));

    handlepostData=async()=>{
      console.log("Add");
      const temp= this.state.cart.map(item=>{
        return{
          parameter:item.para,
          specification:item.specs
        }
      })
      const payload={
        "ProductCode": this.state.code,///////////////////////////////
        "SOPNo": this.state.sop_no,
        "reference": this.state.ref,
        "version": this.state.issue_no,
        "stage":this.state.stage,
        "items": temp,
      }

      const resp = (await RM_Edit_Specs.methods.updateSpecification(payload));
    console.log(resp);
    alert("Specs Edited");
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
      reason:'',
      issue_no:'',
      sop_no: '',
      cart:[],
      date: '',
    })
    }
  render() {
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
        width: 300,
      },
    ];
    return (
      <div style={{marginTop:50}}>
        {console.log(this.state)}
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2>Edit Specification-Product </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          select
                          variant="outlined"
                          label="Product Code:"
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
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          select
                          label="Product Name"
                          variant="outlined"
                          fullWidth="true"
                          value = {this.state.name}
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
                          </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={1}>
                        <TextField
                          id="stage"
                          select
                          label="Stage"
                          variant="outlined"
                          fullWidth="true"
                          value={this.state.stage}
                          onChange={(event) => {
                            this.setState({ stage: event.target.value });
                            this.fillSpecs(event.target.value);
                          }}
                        >
                          {this.state.stages.map((nam) => (
                            <MenuItem key={nam['stage']} value={nam['stage']}>
                              {nam['stage']}
                            </MenuItem>
                          ))}
                        </TextField>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
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
                          id=""
                          variant="outlined"
                          label="SOP/Dmd No"
                          value={this.state.sop_no}
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
                          style={{ backgroundColor: "#ebebeb" }}
                          variant="outlined"
                          label="Date"
                          value={this.state.date}
                          //defaultValue={date}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={1}>
                        <TextField
                          id=""
                          variant="outlined"
                          label="Issue No."
                          style={{ backgroundColor: "#ebebeb" }}
                          fullWidth="true"
                          value={this.state.issue_no}
                          InputProps={{ readOnly: true }}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={2}>
                        <TextField
                          id=""
                          select
                          label="Parameter:"
                          variant="outlined"
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
                          id=""
                          style={{ width: "100%" }}
                          label="Specifications"
                          multiline
                          variant="outlined"
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
                              id=""
                              select
                              label="Material Code"
                              fullWidth="true"
                              value = {this.state.acc_code}
                              onChange={(event) => {
                                this.setState({ acc_code: event.target.value });
                                this.fillAccName(event.target.value);
                                // this.fillAccSpecs(event.target.value);
                              }}
                            >
                              {this.state.acc_codes.map((obj) => (
                                <MenuItem key={obj['ProductCode']} value={obj['ProductCode']}>
                                  {obj['ProductCode']}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id=""
                              select
                              label="Material Name"
                              fullWidth="true"
                              value = {this.state.acc_name}
                              onChange={(event) => {
                                this.setState({ acc_name: event.target.value });
                                this.fillAccCode(event.target.value);
                              }}
                            >
                              {this.state.acc_names.map((obj) => (
                                <MenuItem key={obj['Product']} value={obj['Product']}>
                                  {obj['Product']}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              id="Acc_stage"
                              select
                              label="Stage"
                              fullWidth="true"
                              value={this.state.acc_stage}
                              onChange={(event) => {

                                this.setState({ acc_stage: event.target.value },()=>{
                                  // this.fillAccCode(this.state.acc_stage)
                                  this.fillAccSpecs(event.target.value);
                                })

                              }}
                            >
                              {this.state.acc_stages.map((obj) => (
                                <MenuItem key={obj['stage']} value={obj['stage']}>
                                  {obj['stage']}
                                </MenuItem>
                              ))}
                            </TextField>
                          </GridItem>
                        </GridContainer>
                      </div>
                    )}

                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id=""
                        style={{ width: "100%" }}
                        label="Reason of Change"
                        multiline
                        variant="outlined"
                        value={this.state.reason}
                        onChange={(event)=>{
                          this.setState({reason: event.target.value});
                        }}
                      />
                    </GridItem>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        <Button
                          className=""
                          startIcon={<AddCircleOutlineIcon />}
                          color="primary"
                          onClick={() => {
                            let present = false;
                            for (let i = 0; i < this.state.cart.length; ++i) {
                              if (this.state.cart[i].para === this.state.selected.para) {
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
                        >
                          Add
                        </Button>
                        <Button
                          className=""
                          startIcon={<SaveIcon />}
                          onClick={() => {
                            this.handlepostData();
                          }}
                          color="primary"

                        >
                          Save
                        </Button>
                        <Button
                          className=""
                          startIcon={<EditIcon />}
                          color="primary"
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
                          disabled={this.state.canChange}
                        >
                          Change
                        </Button>
                        <Button
                          className=""
                          startIcon={<DeleteOutlineIcon />}
                          color="secondary"
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
                          startIcon={<ArrowDownwardIcon />}
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
