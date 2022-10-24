import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function BRPCode() {
  console.log("Getting BRPCode");
  const resp = http.get(Endpoint + "BRPCode/");
  console.log(resp);
  return resp;
}

export function BRBatchNo(PCode) {
  console.log("GetttingBatchNo");
  const resp = http.get(Endpoint + "BRBatchNo/"+PCode+"/");
  console.log(resp);
  return resp;
}

export function BRBatchDetail(batchNo) {
  console.log("Getting BRBatchDetail");
  const resp = http.get(Endpoint + "BRBatchDetail/"+batchNo+"/");
  console.log(resp);
  return resp;
}

export function BRDetail(obj) {
  console.log("Posting BRDetail")
  const resp = http.post(Endpoint + "BRDetail/", obj);
  console.log(resp);
  return resp;
}
