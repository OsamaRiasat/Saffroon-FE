import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"


const data="inventory/"
const Endpoint=apiUrl+data

export function PMHighestIGPNO(){
  const resp = http.get(Endpoint+"PMHighestIGPNO");
  console.log("PMHighestIGPNO"+resp.data)
  return resp
}

export function PMPurchaseOrderPONOsWithPendingStatus(){
  const resp = http.get(Endpoint+"PMPurchaseOrderPONOsWithPendingStatus/");
  console.log("PMHighestIGPNO"+resp.data)
  return resp
}

export function PMPurchaseOrderItemsCodesForReceiving(PONo){
  const resp = http.get(Endpoint+"PMPurchaseOrderItemsCodesForReceiving/"+PONo);
  console.log("PMPurchaseOrderItemsCodesForReceiving"+resp.data)
  return resp
}

export function PMPurchaseOrderDetails(PONo,PMCode){
  const resp = http.get(Endpoint+"PMPurchaseOrderDetails/"+PONo+"/"+PMCode);
  console.log("PMPurchaseOrderDetails"+resp.data)
  return resp
}

export function PMIGP(data){
  const resp = http.post(Endpoint+"PMIGP",data);
  return resp
}
