import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"


const data="inventory/"
const Endpoint=apiUrl+data

export function GRNoList(){
  const resp = http.get(Endpoint+"GRNoFor_PM_Return_Note");
  return resp;
}

export function  RMRecievingDetailByGRNo(GRNo){
  const resp = http.get(Endpoint+"PMRecievingDetailByGRNo/"+GRNo);
  return resp;
}

export function RM_Returned(data) {
	const resp = http.get(Endpoint + "PM_Destructed/"+ data);
	return resp;
}
