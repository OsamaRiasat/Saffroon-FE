import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="inventory/"
const Endpoint=apiUrl+data

export function GRNoList(){
  const resp = http.get(Endpoint+"PMGRNoList/");
  //console.log("RMHighestGRNo"+resp.data)
  return resp
}

export function  PMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"PMRecievingDetailByGRNo/"+GRNo);
  return resp
}

export function PMBinCard(data) {
  const resp = http.post(Endpoint + "PMBinCard/", data);
  return resp;
}
// RM IGP RMIGP/
