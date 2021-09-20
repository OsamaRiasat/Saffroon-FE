import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export default {

  methods:{  
    

    GRNoList(){
      const resp = http.get(Endpoint+"GRNoList/");
      //console.log("RMHighestGRNo"+resp.data)
      return resp
    },
    
    RMRecievingDetailByGRNo(GRNo){
        const resp = http.get(Endpoint+"RMRecievingDetailByGRNo/"+GRNo);
        
        return resp
      },
      RMBinCard(data){
        const resp = http.post(Endpoint+"RMBinCard/",data);
        return resp
      }


      
    // RMHighestGRNo(){
    //   const resp = http.get(Endpoint+"HighestGRNo/");
    //   //console.log("RMHighestGRNo"+resp.data)
    //   return resp
    // },


    // IGPNoList(){
    //     const resp = http.get(Endpoint+"IGPNoList/");
        
    //     return resp
    //   },
      
    //   RMRecievingDetail(IGPNo){
    //     const resp = http.get(Endpoint+"RMRecievingDetail/"+IGPNo);
        
    //     return resp
    //   },
      

    //   UpdateRMRecieving(id,data){
    //     const resp = http.put(Endpoint+"UpdateRMRecieving/"+id+"/",data);
    //     return resp
    //   }
      


      
    //   ,
    //   RMPurchaseOrderItemsCodesForReceiving(PONo){
    //     const resp = http.get(Endpoint+"RMPurchaseOrderItemsCodesForReceiving/"+PONo);
    //     console.log("RMPurchaseOrderItemsCodesForReceiving"+resp.data)
    //     return resp
    //   }
    //   ,
    //   RMPurchaseOrderDetails(PONo,RMCode){
    //     const resp = http.get(Endpoint+"RMPurchaseOrderDetails/"+PONo+"/"+RMCode);
    //     console.log("RMPurchaseOrderDetails"+resp.data)
    //     return resp
    //   }
    //   ,
    //   RMIGP(data){
    //     const resp = http.post(Endpoint+"RMIGP",data);
    //     return resp
    //   }


}



}


// RM IGP RMIGP/


