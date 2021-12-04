import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export function PMHighestGRNo(){
  const resp = http.get(Endpoint+"PMHighestGRNo/");
  return resp
}

export function IGPNoList(){
  const resp = http.get(Endpoint+"PMIGPNoList/");
  return resp
}
      
export function PMRecievingDetail(IGPNo){
  const resp = http.get(Endpoint+"PMRecievingDetail/"+IGPNo);
  return resp
}

export function UpdateRMRecieving(id,data){
  const resp = http.put(Endpoint+"UpdatePMRecieving/"+id+"/",data);
  return resp
}
// RM IGP RMIGP/