import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"


const data="inventory/"
const Endpoint=apiUrl+data

export function RMHighestGRNo() {
  const resp = http.get(Endpoint+"HighestGRNo/");
  return resp
}

export function IGPNoList(){
  const resp = http.get(Endpoint+"IGPNoList/");
  return resp
}

export function RMRecievingDetail(IGPNo){
  const resp = http.get(Endpoint+"RMRecievingDetail/"+IGPNo);
  return resp
}


export function UpdateRMRecieving(id,data){
  const resp = http.put(Endpoint+"UpdateRMRecieving/"+id+"/",data);
  return resp
}

// RM IGP RMIGP/
