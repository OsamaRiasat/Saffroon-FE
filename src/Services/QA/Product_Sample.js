import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/"; // Its products intentially
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

export function stagesList(PCode) {
  const resp = http.get(Endpoint + "stagesList/" + PCode );
  return resp;
}

// All users are function here is return only QAs
export function AllUsers() {
  const resp = http.get(Endpoint + "QAs");
  return resp;
}

export function Sample(obj) {
  const resp = http.post(Endpoint + "ProductSample/", obj);
  return resp;
}
