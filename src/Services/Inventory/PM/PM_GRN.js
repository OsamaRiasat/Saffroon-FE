import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export default {

  methods:{  
    PMHighestGRNo(){
      const resp = http.get(Endpoint+"PMHighestGRNo/");
      //console.log("RMHighestGRNo"+resp.data)
      return resp
    },


    IGPNoList(){
        const resp = http.get(Endpoint+"PMIGPNoList/");
        
        return resp
      },
      
      PMRecievingDetail(IGPNo){
        const resp = http.get(Endpoint+"PMRecievingDetail/"+IGPNo);
        
        return resp
      },
      

      UpdateRMRecieving(id,data){
        const resp = http.put(Endpoint+"UpdatePMRecieving/"+id+"/",data);
        return resp
      }
      


      
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


