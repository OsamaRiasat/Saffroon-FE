import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export function GRNoList(){
  const resp = http.get(Endpoint+"PMGRNoListForPrint/");
  return resp;
}
    
export function  RMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"PMRecievingDetailByGRNoForPrint/"+GRNo);
  return resp;
}

