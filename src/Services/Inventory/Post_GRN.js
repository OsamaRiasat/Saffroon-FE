import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"


const data="inventory/"
const Endpoint=apiUrl+data

export function GRNoList(){
  const resp = http.get(Endpoint+"GRNoList/");
  return resp;
}

export function  RMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"RMRecievingDetailByGRNo/"+GRNo);
  return resp;
}

export function RMBinCard(data) {
	const resp = http.post(Endpoint + "RMBinCard/", data);
	return resp;
}
// RM IGP RMIGP
