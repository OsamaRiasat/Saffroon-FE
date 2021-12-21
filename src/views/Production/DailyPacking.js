import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PrintIcon from "@material-ui/icons/Print";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import Daily_Packing from "../../Services/Production/Daily_Packing.js";
import { ContactSupportOutlined } from "@material-ui/icons";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  PlanNo,
  ProductByPlanNo,
  WhenProductIsSelected,
  PackingLog,
} from "../../Services/Production/Daily_Packing";

function insertAt(array, index, data) {
  if (index !== 0) {
    index = index - 1;
  }
  console.log("Add in Cart ", array, index, data);
  array.splice(index, 0, data);
}

export default class DailyPacking extends Component {
  async componentDidMount() {
    const plans = (await PlanNo()).data;
    console.log(plans);
    this.setState({
      plans: plans,
    });
  }
  getPcodes = async (planno) => {
    const pcodes = (await ProductByPlanNo(planno)).data;
    console.log(pcodes);
    this.setState({
      pcodes: pcodes,
    });
  };
  getAutoFill = async (pcode) => {
    const data = (await WhenProductIsSelected(pcode)).data;
    console.log(data);
    this.setState({
      dosage: data.DosageForm,
      packsizes: data.PackSizes,
      batches: data.batchNosList,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      selected: {
        id: "",
        orderno: "", //planno
        date: "",
        product: "", //pcode
        batchno: "", //batch
        quantity: "", //packsno
        packsize: "",
      },

      plans: [],
      plan: "",
      pcodes: [],
      pcode: "",
      packsizes: [],
      packsize: "",
      batches: [],
      batch: "",
      dosage: "",
      packsno: "",
      isrepack: false,
      candelete: false,
      canpost: false,
      selectedRows: [],
      fieldErrors: {},
    };
  }

  validate = (fields) => {
    const errors = {};
    if (!fields.orderno) errors.orderno = "Plan No Required";
    if (!fields.selected.product) errors.product = "Product No Required";
    if (!fields.selected.packsize) errors.packsize = "Pack Size Required";
    if (!fields.selected.batchno) errors.batchno = "Batch No Required";
    if (!fields.selected.quantity) errors.quantity = "Product Code Required";
    return errors;
  };
  onChangeClearError = (name) => {
    let data = {
      ...this.state.fieldErrors,
      [name]: "",
    };
    console.log("data packing", data);
    console.log(Object.entries(data));
    this.setState({
      fieldErrors: data,
    });
  };

  clearafteradd = () => {
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,

        product: "",
        batchno: "",
        quantity: "",
        packsize: "",
        fieldErrors: {},
      },
      orderno: "",
    }));
    this.setState({
      dosage: "",
    });
  };

  addCart = () => {
    const fieldErrors = this.validate(this.state);
    this.setState({ fieldErrors: fieldErrors });
    if (Object.keys(fieldErrors).length) return;

    return new Promise((resolve) => {
      this.setState(
        {
          cart: [...this.state.cart, this.state.selected],
        },
        () => {
          resolve();
          this.iscanpost();
          this.clearafteradd();
        }
      );
    }).catch((err) => {
      console.log("Update cart Exception : ", err);
      alert("Something Went Wrong !! ");
    });
  };
  delete = () => {
    console.log("delete");
    // var array = [...this.state.cart];
    // for (let x = 0; x < this.state.selectedRows.length; ++x) {
    //   var index = -1;
    //   for (let i = 0; i < this.state.cart.length; ++i) {

    //     console.log(this.state.cart[i].id +"=="+this.state.selectedRows[x])
    //     if (this.state.cart[i].id === this.state.selectedRows[x]) {
    //       index = i;

    //       break;
    //     }
    //   }

    //   if (index !== -1) {
    //     array.splice(index, 1);
    //     this.setState({ cart: array });
    //   }
    // }
    var array = [...this.state.cart];
    console.log(array);
    array.splice(this.state.selectedRows[0] - 1, 1);
    console.log(array);
    this.setState(
      {
        cart: array,
      },
      () => {
        this.iscanpost();
      }
    );
  };
  postData = async () => {
    // {
    //     "items": [
    //       {
    //         "batchNo": "string",
    //         "packSize": "string",
    //         "noOfPacks": 0,
    //         "isRepack": true
    //       }
    //     ]
    // }

    try {
      const temp = this.state.cart.map((item) => {
        return {
          batchNo: item.batchno,
          packSize: item.packsize,
          noOfPacks: item.quantity,
          isRepack: this.state.isrepack,
        };
      });
      const payload = {
        items: temp,
      };
      console.log(payload);

      const resp = await PackingLog(payload);
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
        this.cleardata();
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
      }
      // if (resp.status === 201) {
      //   alert("Report Posted");
      //   this.cleardata();
      // } else {
      //   alert("Request Rejected !!!");
      // }
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
      // alert("SOmething Went Wrong !!!");
    }
  };
  iscanpost = () => {
    if (this.state.cart.length > 0) {
      this.setState(
        {
          canpost: true,
        },
        () => {
          return true;
        }
      );
    } else {
      this.setState(
        {
          canpost: false,
        },
        () => {
          return false;
        }
      );
    }
  };
  cleardata = () => {
    this.clearafteradd();
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        orderno: "",
      },
    }));
    this.setState({
      cart: [],
      canpost: false,
    });
  };

  render() {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    console.log(this.state);
    const products_array = [];
    var count = 0;
    for (let i = 0; i < this.state.cart.length; ++i) {
      count = count + 1;
      // id:'',
      //     orderno:'', //planno
      //     date:'',
      //     product:'', //pcode
      //     batchno:'',//batch
      //     quantity:"" , //packsno
      //     packsize:'',
      const { id, orderno, product, batchno, quantity, packsize } =
        this.state.cart[i];
      let temp = {
        id: count,
        order: orderno,
        date: date,
        product: product,
        batchno: batchno,
        quantity: quantity,
        packsize: packsize,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "order", // binds with object key in list of rows ... name must be same and only one time is bind allow
        headerName: "Order No", // optional if not given then fielsd is used as header name by default
        width: 140,
      },
      {
        field: "date",
        headerName: "Date",
        width: 130,
      },
      {
        field: "product",
        headerName: "Product",
        width: 235,
      },
      {
        field: "batchno",
        headerName: "Batch No",
        width: 150,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 150,
      },
      {
        field: "packsize",
        headerName: "Pack Size",
        width: 150,
      },
    ];

    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>Daily Packing</h2>
            </CardHeader>
            <CardBody>
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

                <GridItem xs={12} sm={12} md={4}>
                  <Select
                    name="orderno"
                    placeholder="Select Plan"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.plans}
                    value={
                      this.state.orderno ? { planNo: this.state.orderno } : null
                    }
                    getOptionValue={(option) => option.planNo}
                    getOptionLabel={(option) => option.planNo}
                    onChange={(value, select) => {
                      this.setState(
                        {
                          orderno: value.planNo,
                          product: "",
                          packsize: "",
                          batchNo: "",
                          noOfPacks: "",
                        },
                        () => {
                          this.getPcodes(value.planNo);
                        }
                      );
                      this.onChangeClearError(select.name);
                    }}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.orderno && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.orderno}
                    </span>
                  )}
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    name="product"
                    placeholder="Select Product"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.pcodes}
                    value={
                      this.state.selected.product
                        ? { ProductCode: this.state.selected.product }
                        : null
                    }
                    getOptionValue={(option) => option.ProductCode}
                    getOptionLabel={(option) => option.ProductCode}
                    onChange={(value, select) => {
                      this.setState(
                        (prevState) => ({
                          selected: {
                            ...prevState.selected, // object that we want to update
                            product: value.ProductCode,
                          },
                        }),
                        () => {
                          this.getAutoFill(value.ProductCode);
                        }
                      );
                      this.onChangeClearError(select.name);
                    }}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.product && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.product}
                    </span>
                  )}
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    name="packsize"
                    placeholder="Select Pack Sizes"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.packsizes}
                    value={
                      this.state.selected && this.state.selected.packsize
                        ? { PackSize: this.state.selected.packsize }
                        : null
                    }
                    getOptionValue={(option) => option.PackSize}
                    getOptionLabel={(option) => option.PackSize}
                    onChange={(value, select) => {
                      this.setState((prevState) => ({
                        selected: {
                          ...prevState.selected, // object that we want to update
                          packsize: value.PackSize,
                        },
                      }));
                      this.onChangeClearError(select.name);
                      this.onChangeClearError(select.name);
                    }}
                  />
                  {this.state.fieldErrors &&
                    this.state.fieldErrors.packsize && (
                      <span className="MuiFormHelperText-root Mui-error">
                        {this.state.fieldErrors.packsize}
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
                    value={this.state.dosage}
                    label={"Category: "}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <Select
                    name="batchno"
                    placeholder="Select Batch No"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.batches}
                    value={
                      this.state.selected && this.state.selected.batchno
                        ? { batchNo: this.state.selected.batchno }
                        : null
                    }
                    getOptionValue={(option) => option.batchNo}
                    getOptionLabel={(option) => option.batchNo}
                    onChange={(value, select) => {
                      this.setState((prevState) => ({
                        selected: {
                          ...prevState.selected, // object that we want to update
                          batchno: value.batchNo,
                        },
                      }));
                      this.onChangeClearError(select.name);
                    }}
                  />
                  {this.state.fieldErrors && this.state.fieldErrors.batchno && (
                    <span className="MuiFormHelperText-root Mui-error">
                      {this.state.fieldErrors.batchno}
                    </span>
                  )}
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    id=""
                    variant="outlined"
                    label="Quantity:"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth="true"
                    value={this.state.selected.quantity}
                    name="quantity"
                    error={
                      this.state.fieldErrors && this.state.fieldErrors.quantity
                        ? true
                        : false
                    }
                    helperText={
                      this.state.fieldErrors && this.state.fieldErrors.quantity
                    }
                    onChange={(event) => {
                      this.setState((prevState) => ({
                        selected: {
                          ...prevState.selected, // object that we want to update
                          quantity: event.target.value,
                        },
                      }));
                      this.onChangeClearError(event.target.name);
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Repacking"
                    value={this.state.isrepack}
                    checked={this.state.isrepack}
                    onChange={(event) => {
                      this.setState({
                        isrepack: !this.state.isrepack,
                      });
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      this.addCart();
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    disabled={!this.state.candelete}
                    onClick={() => {
                      this.delete();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    disabled={!this.state.canpost}
                    onClick={() => {
                      this.postData();
                    }}
                  >
                    Post
                  </Button>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <div style={{ height: 450, width: "100%" }}>
                      <DataGrid
                        rows={products_array}
                        columns={columns}
                        checkboxSelection
                        onSelectionModelChange={(event) => {
                          console.log("Event raised by Data Grid ", event);
                          this.setState({ selectedRows: event }); // return id of selected row

                          if (event.length === 1) {
                            this.setState({ candelete: true });
                          } else {
                            this.setState({ candelete: false });
                          }
                        }}
                        disableSelectionOnClick
                      />
                    </div>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
}
