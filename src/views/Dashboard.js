import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import auth from "../Services/auth/login";
import Table from "../components/Table/Table.js";

import { getRoles, getUsers } from '../Services/Account/misc';


const styles={
  
    input: {
      display: 'none',
    },
  
}

const classes=makeStyles(styles);


class AddUser extends React.Component {
   async componentDidMount(){
  
    const data= (await getRoles()).data
    var usersdata= this.handleShowUsers();
    
   
    console.log(data);
    this.setState({
      roles:data,
      
    })

   }

   constructor(props){
     super(props);
     this.state={
      username:"",
      password:"",
      roles:[],
      role:'',
      email:'',
      users:[]
     }
   }
   handleRegister= async()=>{
     const payload=
      {
        
        "username": this.state.username,
        "role": this.state.role,
        "password": this.state.password,
       
        
      }

     const resp = await auth.methods.register(payload);
     this.setState({
       username:"",
       role:"",
       password:""
     })
     this.handleShowUsers();
   }
   handleShowUsers=async ()=>{
    const resp = (await getUsers()).data;
    console.log(resp)
    let count = 0
    var refiedUsers= resp.map((user)=>{
      count+=1;
      return [count,user.username , user.role];
      
    });

    
    this.setState({ 
      users:refiedUsers,
    })
    
   }
    render() {
      const columns = ["Sr#" , "Name" , "Role"];
     
      console.log(this.state.users)
        return (
            <div style={{marginTop:50}}>
                <GridContainer md={12}  >
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h2 >Add User  </h2>
                        </CardHeader>
                        <CardBody>
                          
                          <GridContainer>
                           
                          <Card md={6} style={{maxWidth:450 , marginLeft:30}}> 
                          <CardHeader color="primary">
                                  
                                  <p className={classes.cardCategoryWhite}  style={{fontWeight:"bold"}}>
                                    Fill the form to add new User
                                  </p>
                          </CardHeader>
                          <GridItem md={12}>
                          
                          <GridContainer>
                              <GridItem md={12} style={{marginTop:45}}>
                              <TextField 
                              label="Username" 
                              fullWidth="true" 
                              variant="outlined"
                              
                              value={this.state.username}
                              onChange={
                                (event)=>{
                                  this.setState({
                                    username:event.target.value
                                  })
                                  
                                }
                              }
                              ></TextField>

                              </GridItem>
                              </GridContainer>
                              <GridContainer>
                              <GridItem  md={12}>
                              <TextField 
                              label="Password"  
                              fullWidth="true" 
                              variant="outlined"
                              type="password"
                              value={this.state.password}
                              onChange={
                                (event)=>{
                                  this.setState({
                                    password:event.target.value
                                   
                                  })
                                  
                                }
                              }>

                              </TextField>

                              </GridItem>
                              </GridContainer>
                              <GridContainer>
                              <GridItem md={9}>
 
                              <TextField 
                              label="Role" 
                              fullWidth="true" 
                              select 
                              variant="outlined"
                              value={this.state.role}
                              onChange={
                                (event)=>{
                                  this.setState({
                                    role:event.target.value
                                  })
                                                               }
                              }>
                              
                              {this.state.roles.map((role) => (
                                <MenuItem key={role.Role} value={role.Role}>
                                  {role.Role}
                                </MenuItem>
                              ))}
                              </TextField>
                              

                              </GridItem>
                              <GridItem md={1}>
                                <input accept="image/*" style={{display:"none"}}  id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary"  style={{backgroundColor:"#9128ac " , color:"white"}}  aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                  </IconButton>
                                </label>
                              </GridItem>
                              </GridContainer>
                              <GridContainer>                              
                                <GridItem md={4} style={{marginTop:30}}>
                                <Button className="StyledButton" onClick={() => {
                                    this.handleRegister()
                                }} color="primary">Add</Button>
                              </GridItem>
                            </GridContainer>

                            
                              </GridItem>
                              </Card>
                            
                            
                          
                           
                            <GridItem xs={12} sm={12} md={6}>
                              <Card>
                                <CardHeader color="primary">
                                  {/* <h4 className={classes.cardTitleWhite}>All Users</h4> */}
                                  <p className={classes.cardCategoryWhite} style={{fontWeight:"bold"}}>
                                    All Users
                                  </p>
                                </CardHeader>
                                <CardBody>
                                  <Table
                                    heightpx="350px"
                                    tableHeaderColor="primary"
                                    tableHead={columns}
                                   
                                    tableData={this.state.users}
                                   
                                  />
                                </CardBody>
                              </Card>
                            </GridItem>
                          
                          </GridContainer>
                          
                           {/* <GridContainer justify = "center">
                           <GridItem xs={12} sm={12} md={12}>
                              <Card>
                                
                                <CardBody>
                                  <GridContainer>
                                    <div style={{ height: 450, width: '100%' }}>
                                      <DataGrid
                                        rows={products_array}
                                        columns={columns}
                                        
                                        onSelectionModelChange={(event) => {
                                          this.setState({ selectedRows: event })

                                          if (event.length === 1) {
                                            this.setState({ canChange: false })
                                            this.setState({ canDelete: false })
                                          }
                                          else {
                                            this.setState({ canChange: true })
                                            this.setState({ canDelete: true })
                                          }
                                        }}
                                        
                                      />
                                      
                                    </div>
                                  </GridContainer>                
                                  </CardBody>
                              </Card>
                        </GridItem>
                        </GridContainer> */}
                        </CardBody>

                        <CardFooter className="center">
                            
                        </CardFooter>
                    </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default AddUser