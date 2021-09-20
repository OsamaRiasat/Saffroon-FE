import React, { Component } from 'react'
import Login from './login.js'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import adminLayout from '../layouts/Admin.js'
import ChangePassword from "../views/ChnagePassword"
import table from "../views/TableList.js"
import BlockAnalyst from '../views/QC/AnalystBlocking/BlockAnalyst.js'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    
                    <Route path='/saffron'  component={adminLayout}/>
                    <Route path='/login'  component ={Login} />
                    {/* <Route path='/qc/dashboard'  component ={BlockAnalyst} /> */}
                    <Route path='/changePassword' render={props=>{ 
                     console.log(sessionStorage.getItem('isLogin'))   
                    if(sessionStorage.getItem('isLogin') !==  "true" )
                    {
                        console.log("Login")
                        return <Redirect to="/login" /> 
                    } 
                    console.log("change");
                    return <ChangePassword />  }}></Route>
                    <Redirect from="*" to= "/login"/>
                </Switch>
            </div>
        );
    }
}
export default withRouter((Main));