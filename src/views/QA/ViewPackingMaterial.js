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
import { DataGrid } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BackupIcon from "@material-ui/icons/Backup";
import PrintIcon from "@material-ui/icons/Print";
import RMDetail from "../../Services/QA/View_Packing_Material";
import Select from "react-select";

export default class ViewRawMaterial extends Component {
  async componentDidMount() {
    const rmList = (await RMDetail.methods.RMDetail()).data;
    console.log("Getting list of Raw Materials", rmList);
    this.setState({
      cart: rmList,
    });
    this.handleMakeLists();
  }

  constructor(props) {
    super(props);
    this.state = {
      cart: [],

      scode: "",
      smaterial: "",
      sunit: "",
      stype: "",

      materials: [],
      PMCodes: [],
      units: [],
      categories: [],
    };
  }

  handleMakeLists = () => {
    //PMCode
    var PMCode = this.state.cart.map((item) => {
      return {
        PMCode: item.PMCode,
      };
    });
    PMCode = PMCode.filter(
      (v, i, a) => a.findIndex((t) => t.PMCode === v.PMCode) === i
    );
    console.log("datadata parameter", PMCode);
    this.setState({
      PMCodes: PMCode,
    });

    //Material
    var material = this.state.cart.map((item) => {
      return {
        material: item.Material,
      };
    });
    console.log("datadata 1", material);
    material = material.filter(
      (v, i, a) => a.findIndex((t) => t.material === v.material) === i
    );
    console.log("datadata 2", material);
    this.setState({
      materials: material,
    });

    //Unit
    var unit = this.state.cart.map((item) => {
      return {
        unit: item.Units,
      };
    });
    unit = unit.filter(
      (v, i, a) => a.findIndex((t) => t.unit === v.unit) === i
    );
    console.log("datadata parameter", unit);
    this.setState({
      units: unit,
    });

    //Category
    var category = this.state.cart.map((item) => {
      return {
        category: item.Type,
      };
    });
    category = category.filter(
      (v, i, a) => a.findIndex((t) => t.category === v.category) === i
    );
    console.log("datadata parameter", category);
    this.setState({
      categories: category,
    });
  };

  handleGetData = async () => {
    console.log(
      "Get Data",
      this.state.smaterial,
      this.state.scode,
      this.state.sunit,
      this.state.stype
    );
    const data = (
      await RMDetail.methods.RMDetail(
        this.state.scode,
        this.state.smaterial,
        this.state.sunit,
        this.state.stype
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
    this.setState({ scode: "", smaterial: "", sunit: "", stype: "" });
    const data = (await RMDetail.methods.RMDetail()).data;
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
        PMCode: this.state.cart[i].PMCode,
        material: this.state.cart[i].Material,
        unit: this.state.cart[i].Units,
        type: this.state.cart[i].Type,
      };
      products_array.push(temp);
    }

    const columns = [
      {
        field: "PMCode",
        headerName: "PM Code",
        width: 200,
        editable: true,
      },
      {
        field: "material",
        headerName: "Material",
        width: 320,
        editable: true,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 180,
        editable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 180,
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
              <h2 style={{ textAlign: "center" }}>View Packing Material</h2>
            </CardHeader>
            <CardBody style={{ marginLeft: 15, minWidth: 960 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    placeholder="PMCode:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.PMCodes}
                    value={
                      this.state.scode ? { PMCode: this.state.scode } : null
                    }
                    getOptionValue={(option) => option.PMCode}
                    getOptionLabel={(option) => option.PMCode}
                    onChange={(value) => {
                      this.setState({ scode: value.PMCode }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    name="material"
                    placeholder="Material:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.materials}
                    value={
                      this.state.smaterial
                        ? { material: this.state.smaterial }
                        : null
                    }
                    getOptionValue={(option) => option.material}
                    getOptionLabel={(option) => option.material}
                    onChange={(value) => {
                      this.setState({ smaterial: value.material }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    placeholder="Unit:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.units}
                    value={this.state.sunit ? { unit: this.state.sunit } : null}
                    getOptionValue={(option) => option.unit}
                    getOptionLabel={(option) => option.unit}
                    onChange={(value) => {
                      this.setState({ sunit: value.unit }, () => {
                        this.handleGetData();
                      });
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Select
                    placeholder="Category:"
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.categories}
                    value={
                      this.state.stype ? { category: this.state.stype } : null
                    }
                    getOptionValue={(option) => option.category}
                    getOptionLabel={(option) => option.category}
                    onChange={(value) => {
                      this.setState({ stype: value.category }, () => {
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
                        rows={products_array}
                        columns={columns}
                        checkboxSelection
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
