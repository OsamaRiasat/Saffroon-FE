import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter";
import CardBody from "../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid, GridToolbarContainer,GridToolbarDensitySelector } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BackupIcon from "@material-ui/icons/Backup";
import PrintIcon from "@material-ui/icons/Print";
import Select from "react-select";
import {
  CustomToolbar
} from "../../variables/genericVariables";
import ProductDetail from "../../Services/QA/View_Product";

export default class ViewProduct extends Component {
  async componentDidMount() {
    const prodList = (await ProductDetail.methods.ProductDetail()).data;
    console.log("Getting list of Raw Materials", prodList);
    this.setState({
      cart: prodList,
    });
    this.handleMakeLists();
  }

  // Composition: "xsxs"
  // GenericName: "hoop"
  // MRP: 1200
  // PackSize: "1x10"
  // ProductCode: "POO"
  // RenewalDate: "15-10-2021"
  // ShelfLife: "2.00"
  // dosageForm: "Tablet"
  // product: "Duopo3"
  // registrationNo: "45454"

  handleMakeLists = () => {
    //Product Code
    var prodCode = this.state.cart.map((item) => {
      return {
        prodCode: item.ProductCode,
      };
    });
    prodCode = prodCode.filter(
      (v, i, a) => a.findIndex((t) => t.prodCode === v.prodCode) === i
    );
    console.log("ProductCode List", prodCode);
    this.setState({
      prodCodes_List: prodCode,
    });

    //Registration No
    var regno = this.state.cart.map((item) => {
      return {
        regno: item.registrationNo,
      };
    });
    regno = regno.filter(
      (v, i, a) => a.findIndex((t) => t.regno === v.regno) === i
    );
    console.log("reg no ", regno);
    this.setState({
      regNo_List: regno,
    });

    //Product Size
    var productSize = this.state.cart.map((item) => {
      return {
        productSize: item.PackSize,
      };
    });
    productSize = productSize.filter(
      (v, i, a) => a.findIndex((t) => t.productSize === v.productSize) === i
    );
    console.log("productSize", productSize);
    this.setState({
      packSize_List: productSize,
    });

    //Product Name
    var productName = this.state.cart.map((item) => {
      return {
        productName: item.product,
      };
    });
    productName = productName.filter(
      (v, i, a) => a.findIndex((t) => t.productName === v.productName) === i
    );
    console.log("productName_List", productName);
    this.setState({
      productName_List: productName,
    });

    //Shelf Life
    var shelf = this.state.cart.map((item) => {
      return {
        shelf: item.ShelfLife,
      };
    });
    shelf = shelf.filter(
      (v, i, a) => a.findIndex((t) => t.shelf === v.shelf) === i
    );
    console.log(" shelf", shelf);
    this.setState({
      shelf_List: shelf,
    });

    //Dosage Form
    var dose = this.state.cart.map((item) => {
      return {
        dose: item.dosageForm,
      };
    });
    dose = dose.filter(
      (v, i, a) => a.findIndex((t) => t.dose === v.dose) === i
    );
    console.log(" dose", dose);
    this.setState({
      dose_List: dose,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      cart: [],

      prodCodes_List: [],
      regNo_List: [],
      packSize_List: [],
      productName_List: [],
      shelf_List: [],
      dose_List: [],

      sprod: "",
      sregNo: "",
      spackSize: "",
      sproductName: "",
      sshelf: "",
      sdosage: "",
    };
  }

  handleGetData = async () => {
    console.log(
      "Get Data",
      this.state.sprod,
      this.state.sregNo,
      this.state.sproductName,
      this.state.sshelf,
      this.state.sdosage
    );
    const data = (
      await ProductDetail.methods.ProductDetail(
        this.state.sproductName,
        this.state.sprod,
        this.state.sregNo,
        this.state.sshelf,
        this.state.sdosage
      )
    ).data;
    console.log("datadata", data);
    this.setState(
      {
        cart: data,
      },
      () => {
        this.handleMakeLists();
      }
    );
  };

  resetField = async () => {
    this.setState({
      sprod: "",
      sregNo: "",
      spackSize: "",
      sproductName: "",
      sshelf: "",
      sdosage: "",
    });
    const data = (await ProductDetail.methods.ProductDetail()).data;
    console.log(data);
    this.setState({
      cart: data,
    });
    this.handleMakeLists();
  };

  render() {
    const products_array = [];

    var count = 0;
    for (let i = 0; i < this.state.cart.length; ++i) {
      count = count + 1;
      let temp = {
        id: count,
        pcode: this.state.cart[i].ProductCode,
        product: this.state.cart[i].product,
        regno: this.state.cart[i].registrationNo,
        dosageform: this.state.cart[i].dosageForm,
        genericname: this.state.cart[i].GenericName,
        composititon: this.state.cart[i].Composition,
        shelflife: this.state.cart[i].ShelfLife,
        packsize: this.state.cart[i].PackSize,
        mrp: this.state.cart[i].MRP,
        renewaldate: this.state.cart[i].RenewalDate,
      };
      products_array.push(temp);
    }

    const columns = [
      {
        field: "pcode",
        headerName: "Poduct Code",
        width: 170,
        editable: true,
      },
      {
        field: "product",
        headerName: "Product",
        width: 140,
        editable: true,
      },
      {
        field: "regno",
        headerName: "Registration No",
        width: 180,
        editable: true,
      },
      {
        field: "dosageform",
        headerName: "Dosage Form",
        width: 170,
        editable: true,
      },
      {
        field: "genericname",
        headerName: "Generic Name",
        width: 170,
        editable: true,
      },
      {
        field: "composititon",
        headerName: "Composition",
        width: 170,
        editable: true,
      },
      {
        field: "shelflife",
        headerName: "Shelf-Life",
        width: 180,
        editable: true,
      },
      {
        field: "packsize",
        headerName: "Pack Size",
        width: 150,
        editable: true,
      },
      {
        field: "mrp",
        headerName: "MRP",
        width: 130,
        editable: true,
      },
      {
        field: "renewaldate",
        headerName: "Renewal Date",
        width: 200,
        editable: true,
      },
    ];
    return (
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2 style={{ textAlign: "center" }}>View Product</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    placeholder="Registration No:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.regNo_List}
                    value={
                      this.state.sregNo ? { regno: this.state.sregNo } : null
                    }
                    getOptionValue={(option) => option.regno}
                    getOptionLabel={(option) => option.regno}
                    onChange={(value) => {
                      this.setState({ sregNo: value.regno }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    placeholder="Product Code:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.prodCodes_List}
                    value={
                      this.state.sprod ? { prodCode: this.state.sprod } : null
                    }
                    getOptionValue={(option) => option.prodCode}
                    getOptionLabel={(option) => option.prodCode}
                    onChange={(value) => {
                      this.setState({ sprod: value.prodCode }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    placeholder="Product Name:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.productName_List}
                    value={
                      this.state.sproductName
                        ? { productName: this.state.sproductName }
                        : null
                    }
                    getOptionValue={(option) => option.productName}
                    getOptionLabel={(option) => option.productName}
                    onChange={(value) => {
                      this.setState({ sproductName: value.productName }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    placeholder="Shelf Life:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.shelf_List}
                    value={
                      this.state.sshelf ? { shelf: this.state.sshelf } : null
                    }
                    getOptionValue={(option) => option.shelf}
                    getOptionLabel={(option) => option.shelf}
                    onChange={(value) => {
                      this.setState({ sshelf: value.shelf }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Select
                    placeholder="Dosage Form:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.dose_List}
                    value={
                      this.state.sdosage ? { dose: this.state.sdosage } : null
                    }
                    getOptionValue={(option) => option.dose}
                    getOptionLabel={(option) => option.dose}
                    onChange={(value) => {
                      this.setState({ sdosage: value.dose }, () => {
                        console.log("Happening:" + this.state.sdosage);
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <Button color="primary" onClick={this.resetField}>
                    Reset
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth="true"
                    startIcon={<PrintIcon />}
                  >
                    Print
                  </Button>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <div style={{ height: 450, width: "100%" }}>
                      <DataGrid
                        components={{
                          Toolbar: CustomToolbar,
                        }}
                        rows={products_array}
                        columns={columns}
                        // checkboxSelection
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
