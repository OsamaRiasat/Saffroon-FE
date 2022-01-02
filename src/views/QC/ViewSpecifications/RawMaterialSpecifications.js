import React, { Component } from "react";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import PrintIcon from "@material-ui/icons/Print";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DataGrid , GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid";
import RMSpecs from "../../../Services/QC/RM/RM_View_Specs.js"
import MenuItem from '@material-ui/core/MenuItem';
import Select from "react-select";
import {
  CustomValueContainer,
  CustomSelectStyle,
} from "../../../variables/genericVariables";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}



export default class RawMaterialSpecifications extends Component {
  async componentDidMount() {
    const material = (await RMSpecs.methods.MaterialListOfSpecifications()).data;
    console.log("Material",material);
    this.setState({
      mcodes: material,
    });
    const rmcode = (await RMSpecs.methods.CodeListOfSpecifications()).data;
    console.log("RMCOde",rmcode);
    this.setState({
      rmcodes: rmcode,
    });
  }
constructor(props){
  super(props);
  this.state = {
    show: false,
    rmcodes: [],
    mcodes: [],
    specs:[],
    rmcode: "",
    mcode: "",
    fdata: "",
    sdata: "",
  };

}
  

  handlegetSpecs = async (code) => {
    const details = (await RMSpecs.methods.ViewSpecifications(code)).data;
    this.setState({
      fdata: details["FirstData"],
      sdata: details["SecondData"],
      specs:details["list"]
    });

  };

  handlegetcodebyname = async (mname) => {
    const rmcode = (await RMSpecs.methods.CodeByName(mname)).data["RMCode"];
    console.log("code by name ", rmcode);
    this.setState({
      rmcode:rmcode
    })
    this.handlegetSpecs(this.state.rmcode);
  };

  handlegetnamebycode = async (code) => {
    const name = (await RMSpecs.methods.NameByCode(code));
    console.log("Name by Code", name);
    this.setState({
      mcode:name.data["Material"]
    })

  };
  // // handlesetmcode=(newValue)=>{
  // //   console.log(newValue)
  // //   this.setState({ mcode: newValue })
    

  // }

  render(){
    // const materialProps = {
    //   options: this.state.mcodes,
    //   getOptionLabel: (option) => option.Material,
    // };

    // const rmcodeProps = {
    //   options: this.state.rmcodes,
    //   getOptionLabel: (option) => option.RMCode,
    // };

    const products_array = [];
    var count=0;
    for (let i = 0; i < this.state.specs.length; ++i) {
      count=count+1;
      let temp = {
        id:count,
        sr: count,
        parameter:this.state.specs[i].paramater,
        specifications:this.state.specs[i].specification,
      };
      products_array.push(temp);
    }

    const columns = [
      {
        field: "sr",
        headerName: "Sr.",
        width: 110,
        
      },
      {
        field: "parameter",
        headerName: "Parameter",
        width: 210,
        
      },
      {
        field: "specifications",
        headerName: "Specification",
        width: 500,
        
      },
    ];
    console.log(this.state);
    return (
      <div style={{marginTop:50}}>
        {/* <input type="text"  onChange={this.getData}></input> */}
        <GridContainer md={12}>
          <Card>
            <CardHeader color="primary">
              <h2> Raw Material Specification </h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <CardM style={{ marginLeft: 15, minWidth: 960 }}>
                  <CardContent>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={8}>
                        {/* <TextField
                       
                       select
                       label="Material Code"
                       
                       fullWidth="true"
                       
                       value={this.state.mcode}
                       w
                       //onChange={}
                       // helperText="_____________________________"
                       // variant="outlined"
                       onChange={(event) => {
                         this.setState({ mcode:event.target.value});
                         this.handlegetcodebyname(event.target.value);
                        
                         
                       }}
                     >
                       {this.state.mcodes.map((mcode) => (
                         <MenuItem key={mcode.Material} value={mcode.Material}>
                           {mcode.Material}
                         </MenuItem>
                       ))}
                     </TextField> */}

<Select
                    name="Material"
                    placeholder="Material"
                    components={{
                      ValueContainer: CustomValueContainer,
                    }}
                    styles={CustomSelectStyle}
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.mcodes.map((t) => ({
                      value: t.Material,
                      label: t.Material,
                    }))}
                    // options = {Object.entries(this.state.mcodes)
                    //   .map( ([key, value]) => `My key is ${key} and my value is ${value}`)}
                    value={
                      this.state.mcode ? { label: this.state.mcode } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value, select) => {
                      this.setState({ mcode: value.value });
                      this.handlegetcodebyname(value.value);
                      // this.onChangeClearError(select.name);
                      // this.setState({ fieldErrors: "" });
                    }}
                  />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      {/* <TextField
                       
                        select
                        label="RMCode"
                        
                        fullWidth="true"
                        
                        value={this.state.rmcode}
                        
                        //onChange={}
                        // helperText="_____________________________"
                        // variant="outlined"
                        onChange={(event) => {
                          this.setState({ rmcode:event.target.value});
                          this.handlegetSpecs(event.target.value);
                          this.handlegetnamebycode(event.target.value);
                          
                        }}
                      >
                        {this.state.rmcodes.map((rmcode) => (
                          <MenuItem key={rmcode.RMCode} value={rmcode.RMCode}>
                            {rmcode.RMCode}
                          </MenuItem>
                        ))}
                        
                      </TextField> */}
                      
                  <Select
                    name="RMCode"
                    placeholder="RMCode"
                    components={{
                      ValueContainer: CustomValueContainer,
                    }}
                    styles={CustomSelectStyle}
                    className="customSelect"
                    classNamePrefix="select"
                    isSearchable={true}
                    options={this.state.rmcodes.map((t) => ({
                      value: t.RMCode,
                      label: t.RMCode,
                    }))}
                    // options = {Object.entries(this.state.rmcodes)
                    //   .map( ([key, value]) => `My key is ${key} and my value is ${value}`)}
                   
                    value={
                      this.state.rmcode ? { label: this.state.rmcode } : null
                    }
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.label}
                    onChange={(value, select) => {
                      // this.setState({ rmcode: value.value });
                      // this.handlegetcodebyname(value.value);
                      // this.onChangeClearError(select.name);
                      // this.setState({ fieldErrors: "" });
                      this.setState({ rmcode:value.value});
                      this.handlegetSpecs(value.value);
                      this.handlegetnamebycode(value.value);
                    }}
                  />
                       
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          className=""
                          color="primary"
                          startIcon={<PrintIcon />}
                        >
                          Print Sheet
                        </Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <h4>{this.state.fdata}</h4>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <h4>{this.state.sdata}</h4>
                      </GridItem>
                    </GridContainer>

                    <GridItem xs={12} sm={12} md={12}>
                      <GridContainer>
                        <div style={{ height: 450, width: "100%" }}>
                          <DataGrid
                            rows={products_array}
                            // rows={this.state.movies}
                            columns={columns}
                            components={{
                              Toolbar: CustomToolbar,
                            }}
                            disableSelectionOnClick
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
