import React from 'react';
import {Route , Redirect} from "react-router-dom";

const ProtectedRoute=({path , component : Component , render , role, ...rest})=>{
    return (
        <Route 
        path={path} 
        render={props =>{
                if(sessionStorage.getItem("isLogin") !== "true"  || sessionStorage.getItem("Role") !== role ) 
                return <Redirect to="/login" />; 
                    return <Component  />;
               
                  
            }}
        />

    );
}
export default ProtectedRoute;