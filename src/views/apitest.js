import React, { Component } from "react";
import {getRMDemandHighestDNo, RawMaterialNames ,RawMaterialCodes,RawMaterialSearchByRMCode,RawMaterialSearchByName,RMDemands} from "../Services/Inventory/inventory.js";
import IGP from "../Services/Inventory/RM_IGP.js";
import postGRN from "../Services/Inventory/Post_GRN.js";
import Post_GRN from "../Services/Inventory/Post_GRN.js";
class Products extends Component{
async componentDidMount() {
    

//  Post GRN Testing
    const GRNoList=await Post_GRN.methods.GRNoList();
    console.log(GRNoList.data);

    const details=await Post_GRN.methods.RMRecievingDetailByGRNo(1);
    console.log(details.data);

   const ok=await  Post_GRN.methods.RMBinCard(
      {
        
        "GRNo": 1,

      });
      console.log("RmBinCard :"+ok.data)    
  }
  render()
  {
    return(
        <h2>Hi</h2>
    )
  }
}

export default Products;