import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "Production/";
const Endpoint = apiUrl + data;

export function PCodeList() {
  console.log("Gettting PCodeList");
  const resp = http.get(Endpoint + "PCodeList/");
  console.log(resp);
  return resp;
}

export function PNameList() {
  console.log("Gettting PNameList");
  const resp = http.get(Endpoint + "PNameList/" );
  console.log(resp);
  return resp;
}

export function PCodeByPname(PName) {
  console.log("Gettting PNameList");
  const resp = http.get(Endpoint + "PCodeByPname/" + PName + "/");
  console.log(resp);
  return resp;
}

export function PnameByPCode(PCode) {
  console.log("Gettting PNameList");
  const resp = http.get(Endpoint + "PnameByPCode/" + PCode + "/");
  console.log(resp);
  return resp;
}

export function RMCodeList() {
  console.log("Gettting RMCodeList");
  const resp = http.get(Endpoint + "PMCodeList/");
  console.log(resp);
  return resp;
}

export function RMNameList() {
  console.log("Gettting PMNameList");
  const resp = http.get(Endpoint + "PMNameList/");
  console.log(resp);
  return resp;
}

export function RMCodeByName(Name) {
  console.log("Gettting RMCodeByName");
  const resp = http.get(Endpoint + "PMCodeByName/" + Name + "/");
  console.log(resp);
  return resp;
}

export function RMNameByRMCode(code) {
  console.log("Gettting RMNameByRMCode");
  const resp = http.get(Endpoint + "PMNameByPMCode/" + code + "/");
  console.log(resp);
  return resp;
}

export function RMData(PMCode) {
  console.log("Viewing RMData");
  const resp = http.get(Endpoint + "PMData/" + PMCode + "/" );
  console.log(resp);
  return resp;
}

export function RMFormulation(obj) {
  console.log("Posting RMFormulation")
  const resp = http.post(Endpoint + "AddPMFormulation/", obj);
  console.log(resp);
  return resp;
}

export function PackSize(pcode) {
  console.log("gettinmg packsizes")
  const resp = http.get(Endpoint + "PackSizeList/"+pcode+"/");
  console.log(resp);
  return resp;
}