import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardM from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Table from "../../../components/Table/Table.js";

import Analyst from "../../../Services/QC/Analyst/Analyst.js"


const styles = {
  input: {
    display: "none",
  },
};

const classes = makeStyles(styles);

class AddUser extends React.Component {
  async componentDidMount() {
    const data = (await Analyst.methods.AllAnalyst()).data;
    console.log(data);
    this.setState({
      analysts:data,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      analysts: [
        {
          id: 1,
          username: "Akif",

          status: "Block",
        },
        {
          id: 2,
          username: "Ali",

          status: "UnBlock",
        },
        {
          id: 3,
          username: "afaq",

          status: "Block",
        },

        {
          id: 6,
          username: "arif",

          status: "Block",
        },
        
      ],

      analyst: "",
    };
  }

  //  handleRegister= async()=>{
  //    const payload=
  //     {

  //       "username": this.state.username,
  //       "role": this.state.role,
  //       "password": this.state.password,

  //     }

  //    const resp = await auth.methods.register(payload);
  //    this.setState({
  //      username:"",
  //      role:"",
  //      password:""
  //    })
  //    this.handleShowUsers();
  //  }
  //  handleShowUsers=async ()=>{
  //   const resp = (await account.methods.getUsers()).data;
  //   console.log(resp)
  //   let count = 0
  //   var refiedUsers= resp.map((user)=>{
  //     count+=1;
  //     return [count,user.username , user.role];

  //   });

  //   this.setState({
  //     users:refiedUsers,
  //   })

  //  }
  makeAnalystsIterateable = () => {
    var refiedanalysts = this.state.analysts.map((analyst) => {
      return [analyst.id, analyst.username, analyst.status];
    });
    return refiedanalysts;
  };
  showBlockButton = (id) => {
    const data = this.state.analysts.find((e) => e.id === id);
    console.log("analyst data ", data);

    if (id === "" || data.status === "UnBlock")
      return (
        <Button
          className="StyledButton"
          style={{ backgroundColor: "#b50000" }}
          onClick={() => {
            this.handleChnageStatus(id) 
          }}
          color="primary"
        >
          Block
        </Button>
      );
    else if (data.status === "Blocked") {
      return (
        <Button
          className="StyledButton"
          style={{ backgroundColor: "rgb(12, 128, 34)" }}
          onClick={() => {
            this.handleChnageStatus(id) 
          }}
          color="primary"
        >
          Unlock
        </Button>
      );
    }
  };
  handleGetAllUsers=async ()=>{
    const data = (await Analyst.methods.AllAnalyst()).data;
    console.log(data);
    this.setState({
      analysts:data,
    })
  }
  handleChnageStatus = async (id) => {
    try {
      
      // console.log("Handle Chage status")
      // var data = [...this.state.analysts]
      // console.log(data)
      // data.map((e) => {
      //   if (e.id === id) {
      //     if (e.status === "Block") {
            
      //       e.status = "UnBlock"
      //     }
      //     else if (e.status === "UnBlock") {
      //       e.status = "Block";
      //     }
      //   }
      // });
      // console.log("After Status Chnage ", data);
      // this.setState({
      //   analysts:data
      // })
      var data = await Analyst.methods.BlockAnalyst(id);
      console.log(data);
      this.handleGetAllUsers();
    } catch (err) {
      alert("Some thing Went Wrong ");
      console.log(err);
    }
  };
  render() {
    console.log("analyst", this.state.analyst);
    const columns = ["Sr#", "Name", "Status"];

    console.log(this.state.users);
    return (
      <div style={{ marginTop: 50 }}>
        <GridContainer md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h2>Block Analyst </h2>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <Card md={6} style={{ maxWidth: 450, marginLeft: 30 }}>
                    <CardHeader color="primary">
                      <p
                        className={classes.cardCategoryWhite}
                        style={{ fontWeight: "bold" }}
                      >
                        Fill the form to Block Analyst
                      </p>
                    </CardHeader>
                    <GridItem md={12}>
                      <GridContainer>
                        <GridItem md={9} style={{ marginTop: 30 }}>
                          <TextField
                            label="Analyst Name"
                            fullWidth="true"
                            select
                            variant="outlined"
                            value={this.state.analyst}
                            onChange={(event) => {
                              this.setState({
                                analyst: event.target.value,
                              });
                            }}
                          >
                            {this.state.analysts.map((analyst) => (
                              <MenuItem
                                key={analyst.id}
                                value={analyst.id}
                              >
                                {analyst.username}
                              </MenuItem>
                            ))}
                          </TextField>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem md={4} style={{ marginTop: 10 }}>
                          {this.showBlockButton(this.state.analyst)}
                          
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </Card>

                  <GridItem xs={12} sm={12} md={6}>
                    <Card>
                      <CardHeader color="primary">
                        {/* <h4 className={classes.cardTitleWhite}>All Users</h4> */}
                        <p
                          className={classes.cardCategoryWhite}
                          style={{ fontWeight: "bold" }}
                        >
                          Analysts
                        </p>
                      </CardHeader>
                      <CardBody>
                        <Table
                          heightpx="350px"
                          tableHeaderColor="primary"
                          tableHead={columns}
                          tableData={this.makeAnalystsIterateable()}
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

               
              </CardBody>

              <CardFooter className="center"></CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default AddUser;
