import React, { Component } from "react";
import {getRMDemandHighestDNo, RawMaterialNames ,RawMaterialCodes,RawMaterialSearchByRMCode,RawMaterialSearchByName,RMDemands} from "../Services/Inventory/inventory.js";

import { GRNoList, RMRecievingDetailByGRNo, RMBinCard } from '../Services/Inventory/Post_GRN';

class Products extends Component{
async componentDidMount() {
    

//  Post GRN Testing
    const GRNoListData=await GRNoList();
    console.log(GRNoListData.data);

    const details=await RMRecievingDetailByGRNo(1);
    console.log(details.data);

   const ok=await  RMBinCard(
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