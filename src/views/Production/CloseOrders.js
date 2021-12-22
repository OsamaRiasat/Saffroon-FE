import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";
import { toast, ToastContainer } from "react-toastify";
import { PlanItems, PlanStatus } from "../../Services/Production/Close_Order";
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../variables/genericVariables";

export default class CloseOrders extends Component {
  async componentDidMount() {
    const data = (await PlanItems()).data;
    console.log(data);
    this.setState({
      orders: data,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      ordersstatus: ["Close Order", "Cancel Order"],
      orderstatus: "",
      orders: [],
      order: "",
      orderstatussend: "",
      canSave: false,
      selectedRow: [],

      selectedOrder: "",
      selectedPcode: "",
      selectedpackSize: "",
      fieldErrors: {},
    };
  }

  getOrderNo = () => {
    const line = this.state.selectedRow - 1;
    console.log(line);
    if (line !== "" && line > -1) {
      this.setState({
        selectedOrder: this.state.orders[line].planNo,
        selectedPcode: this.state.orders[line].ProductCode,
        selectedpackSize: this.state.orders[line].PackSize,
      });
    }
  };

  validate = (fields) => {
    const errors = {};
    if (!fields.selectedOrder) errors.selectedOrder = "Select Order Required";
    if (!fields.orderstatus) errors.orderstatus = "Order Status Required";
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

  // Submit Form
  changeStatus = async () => {
    try {
      let { selectedOrder, orderstatus } = this.state;
      const fieldErrors = this.validate({ selectedOrder, orderstatus });
      this.setState({ fieldErrors: fieldErrors });
      if (Object.keys(fieldErrors).length) return;
      const payload = {
        planNo: this.state.selectedOrder,
        ProductCode: this.state.selectedPcode,
        PackSize: this.state.selectedpackSize,
        status: this.state.orderstatussend, //CANCELLED
      };
      console.log(payload);
      const data = await PlanStatus(payload);
      if (data.status === 200) {
        toast.success("Request Sent !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // alert("Order Status Chnaged");
        const data = (await PlanItems()).data;
        console.log(data);
        this.setState({
          orders: data,
          selectedRow: "",
          selectedOrder: "",
          orderstatus: "",
          fieldErrors: {},
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Exception : Order status not chnaged !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert("Exception : Order status not chnaged !!!")
    }
  };

  render() {
    const products_array = [];
    for (let i = 0; i < this.state.orders.length; ++i) {
      // {
      //   "planNo": 4,
      //   "ProductCode": "BS",
      //   "Product": "Dysmorin Tablet 50 mg",
      //   "PackSize": "1x10",
      //   "requiredPacks": 200000,
      //   "achievedPacks": 0,
      //   "pendingPacks": 176000,
      //   "status": "OPEN"

      const {
        planNo,
        ProductCode,
        Product,
        PackSize,
        requiredPacks,
        achievedPacks,
        pendingPacks,
        status,
      } = this.state.orders[i];
      let temp = {
        id: i + 1,
        orderno: planNo,
        date: "",
        pname: Product,
        pcode: ProductCode,
        packsize: PackSize,
        reqpacks: requiredPacks,
        packed: achievedPacks,
        pending: pendingPacks,
        status: status,
      };
      products_array.push(temp);
    }
    const columns = [
      {
        field: "orderno",
        headerName: "Order No",
        width: 140,
        editable: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 130,
        editable: true,
      },
      {
        field: "pname",
        headerName: "Product",
        width: 150,
        editable: true,
      },
      {
        field: "pcode",
        headerName: "Product Code",
        width: 150,
        editable: true,
      },
      {
        field: "packsize",
        headerName: "Pack Size",
        width: 170,
        editable: true,
      },
      {
        field: "reqpacks",
        headerName: "Required Packs", //reqired Packs
        width: 180,
        editable: true,
      },
      {
        field: "packed",
        headerName: "Packed", // achived
        width: 150,
        editable: true,
      },
      {
        field: "pending",
        headerName: "Pending",
        width: 260,
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        editable: true,
      },
    ];
    console.log(this.state);
    return (
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GridContainer md={12}>
          <Card style={{ marginLeft: "15px", minwidth: "960" }}>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>Close Orders</h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <Card>
                  <CardHeader color="info">
                    <h4>Order Details</h4>
                  </CardHeader>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          id=""
                          fullWidth="true"
                          variant="outlined"
                          label="Order No:"
                          name="selectedOrder"
                          value={this.state.selectedOrder}
                          InputProps={{ readOnly: true }}
                          error={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.selectedOrder
                              ? true
                              : false
                          }
                          helperText={
                            this.state.fieldErrors &&
                            this.state.fieldErrors.selectedOrder
                          }
                          onChange={(event) => {
                            this.onChangeClearError(event.target.name);
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <Select
                          name="orderstatus"
                          placeholder="Select Order Status"
                          components={{
                            ValueContainer: CustomValueContainer,
                          }}
                          styles={CustomSelectStyle}
                          className="customSelect"
                          classNamePrefix="select"
                          isSearchable={true}
                          options={this.state.ordersstatus.map((t) => ({
                            value: t,
                            label: t,
                          }))}
                          value={
                            this.state.orderstatus
                              ? { label: this.state.orderstatus }
                              : null
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          onChange={(value, select) => {
                            this.setState({
                              orderstatus: value.value,
                            });
                            if (value.value === "Close Order") {
                              this.setState({
                                orderstatussend: "CLOSED",
                              });
                            } else {
                              this.setState({
                                orderstatussend: "CANCELLED",
                              });
                            }
                            this.onChangeClearError(select.name);
                          }}
                        />
                        {this.state.fieldErrors &&
                          this.state.fieldErrors.orderstatus && (
                            <span className="MuiFormHelperText-root Mui-error">
                              {this.state.fieldErrors.orderstatus}
                            </span>
                          )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          // disabled={!this.state.canSave}
                          onClick={() => {
                            this.changeStatus();
                          }}
                        >
                          Save Changes
                        </Button>
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
                              console.log(event);
                              if (event.length === 1) {
                                this.setState({
                                  canSave: true,
                                  fieldErrors: {
                                    ...this.state.fieldErrors,
                                    selectedOrder: "",
                                  },
                                });
                              } else {
                                this.setState({ canSave: false });
                              }
                              this.setState(
                                {
                                  selectedRow: event[0],
                                },
                                () => {
                                  this.getOrderNo();
                                }
                              );
                              if (event.length === 0) {
                                this.setState({
                                  selectedRow: "",
                                  selectedOrder: "",
                                });
                              }
                            }}
                          />
                        </div>
                      </GridContainer>
                    </GridItem>
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
