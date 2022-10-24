import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"

const data="inventory/"
const Endpoint=apiUrl+data

export function RMHighestIGPNO(){
  const resp = http.get(Endpoint+"RMHighestIGPNO");
  return resp
}

export function RMPurchaseOrderPONOsWithPendingStatus(){
  const resp = http.get(Endpoint+"RMPurchaseOrderPONOsWithPendingStatus/");
  return resp
}

export function RMPurchaseOrderItemsCodesForReceiving(PONo){
  const resp = http.get(Endpoint+"RMPurchaseOrderItemsCodesForReceiving/"+PONo);
  return resp
}

export function RMPurchaseOrderDetails(PONo,RMCode){
  const resp = http.get(Endpoint+"RMPurchaseOrderDetails/"+PONo+"/"+RMCode);
  return resp
}

export function RMIGP(data){
  const resp = http.post(Endpoint+"RMIGP",data);
  return resp
}
// RM IGP RMIGP
