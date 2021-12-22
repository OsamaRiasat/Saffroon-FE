import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "products/";
const Endpoint = apiUrl + data;
const Endpoint2 = apiUrl + "Production/";

export function PCodeList() {
  console.log("Gettting PCodeList");
  const resp = http.get(Endpoint + "PCode_For_PM_Formulation");
  console.log(resp);
  return resp;
}

export function PNameList() {
  console.log("Gettting PNameList");
  const resp = http.get(Endpoint + "PName_For_PM_Formulation" );
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

export function batchsize(PCode) {
  console.log("Gettting batchsize");
  const resp = http.get(Endpoint + "batchsize/" + PCode );
  console.log(resp);
  return resp;
}
export function RMCodeList() {
  console.log("Gettting RMCodeList");
  const resp = http.get(Endpoint + "PMCodeList");
  console.log(resp);
  return resp;
}

export function RMNameList() {
  console.log("Gettting PMNameList");
  const resp = http.get(Endpoint + "PMNameList");
  console.log(resp);
  return resp;
}

export function RMCodeByName(Name) {
  console.log("Gettting RMCodeByName");
  const resp = http.get(Endpoint2 + "PMCodeByName/" + Name + "/");
  console.log(resp);
  return resp;
}

export function RMNameByRMCode(code) {
  console.log("Gettting RMNameByRMCode");
  const resp = http.get(Endpoint2 + "PMNameByPMCode/" + code + "/");
  console.log(resp);
  return resp;
}

export function RMData(PMCode) {
  console.log("Viewing RMData");
  const resp = http.get(Endpoint2 + "PMData/" + PMCode + "/" );
  console.log(resp);
  return resp;
}

export function RMFormulation(obj) {
  console.log("Posting RMFormulation")
  const resp = http.post(Endpoint + "PM_Formulation/", obj);
  console.log(resp);
  return resp;
}

export function PackSize(pcode) {
  console.log("gettinmg packsizes")
  const resp = http.get(Endpoint2 + "PackSizeList/"+pcode+"/");
  console.log(resp);
  return resp;
}