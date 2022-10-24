import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "products/";   // Its products intentially
const Endpoint = apiUrl + data;

export function PCodeList() {
  const resp = http.get(Endpoint + "PCodeList/");
  return resp;
}

export function PNameList() {
  const resp = http.get(Endpoint + "PNameList/" );
  return resp;
}

export function PCodeByPname(PName) {
  const resp = http.get(Endpoint + "PCodeByPname/" + PName + "/");
  return resp;
}

export function PnameByPCode(PCode) {
  const resp = http.get(Endpoint + "PnameByPCode/" + PCode + "/");
  return resp;
}

export function RMCodeList() {
  const resp = http.get(Endpoint + "RMCodeList/");
  return resp;
}

export function RMNameList() {
  const resp = http.get(Endpoint + "RMNameList/");
  return resp;
}

export function RMCodeByName(Name) {
  const resp = http.get(Endpoint + "RMCodeByName/" + Name + "/");
  return resp;
}

export function RMNameByRMCode(code) {
  const resp = http.get(Endpoint + "RMNameByRMCode/" + code + "/");
  return resp;
}

export function RMData(RMCode) {
  const resp = http.get(Endpoint + "RMData/" + RMCode + "/" );
  return resp;
}

export function RMFormulation(obj) {
  const resp = http.post(Endpoint + "RMFormulation/", obj);
  return resp;
}
