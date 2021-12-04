import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

export function PSPCode() {
const resp = http.get(Endpoint + "PSPCode/");
return resp;
}

export function PSBatchNo(Pcode) {
  const resp = http.get(Endpoint + "PSBatchNo/" + Pcode + "/");
  return resp;
}

export function PSBatchDetail(batchNo) {
  const resp = http.get(Endpoint + "PSBatchDetail/" + batchNo + "/");
  return resp;
}

export function AllUsers() {
  const resp = http.get(Endpoint + "AllUsers/");
  return resp;
}

export function ProductSample(obj) {
  const resp = http.post(Endpoint + "ProductSample/", obj);
  return resp;
}