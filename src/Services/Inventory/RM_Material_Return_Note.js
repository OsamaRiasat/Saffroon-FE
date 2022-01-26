import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 

export function GRNoList(){
  const resp = http.get(Endpoint+"GRNoFor_RM_Return_Note");
  return resp;
}
    
export function  RMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"RMRecievingDetailByGRNo/"+GRNo);
  return resp;
}

export function RM_Returned(data) {
	const resp = http.get(Endpoint + "RM_Returned/"+ data);
	return resp;
}
