import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function HighestBDNo() {
  console.log("Getting HighestBDNo");
  const resp = http.get(Endpoint + "HighestBDNo/");
  console.log(resp);
  return resp;
}

export function ProductCode() {
  console.log("Getting ProductCode");
  const resp = http.get(Endpoint + "ProductCode/");
  console.log(resp);
  return resp;
}
export function NameByCode(code) {

  console.log("Gettting NameByCode/")
  const resp = http.get(Endpoint + "ProductNameByProductCode/"+code+"/");
  console.log(resp);
  return resp;

}

export function BatchNo(PCode) {
  console.log("GetttingBatchNo");
  const resp = http.get(Endpoint + "BatchNo/"+PCode+"/");
  console.log(resp);
  return resp;
}

export function BatchDetail(batchNo) {
  console.log("Getting BatchDetail");
  const resp = http.get(Endpoint + "BatchDetail/"+batchNo+"/");
  console.log(resp);
  return resp;
}

export function BatchDeviation(obj) {
  console.log("Posting NCR")
  const resp = http.post(Endpoint + "BatchDeviation/", obj);
  console.log(resp);
  return resp;
}
