import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"


const data="inventory/"
const Endpoint=apiUrl+data

export function GRNoList(){
  const resp = http.get(Endpoint+"GRNoListForPrint/");
  return resp;
}

export function  RMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"RMRecievingDetailByGRNoForPrint/"+GRNo);
  return resp;
}

