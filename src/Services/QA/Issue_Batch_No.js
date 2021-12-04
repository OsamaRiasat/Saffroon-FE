import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";   // Its production intentially
const Endpoint = apiUrl + data;

export function PlanNoBIR() {
  const resp = http.get(Endpoint + "PlanNoBIR/");
  return resp;
}

export function PCodeBIR(planNo) {
  const resp = http.get(Endpoint + "PCodeBIR/" + planNo + "/");
  return resp;
}

export function IssueBatchNo(obj) {
  const resp = http.post(Endpoint + "IssueBatchNo/", obj);
  return resp;
}

export function Formulation(obj) {
  const resp = http.post(Endpoint + "Formulation/", obj);
  return resp;
}

export function BPRLog(obj) {
  const resp = http.post(Endpoint + "BPRLog/", obj);
  return resp;
}