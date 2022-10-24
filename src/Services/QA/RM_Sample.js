import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;

// export function GRNOList() {
//   const resp = http.get(Endpoint + "GRNOList/");
//   return resp;
// }
export function RawMaterialListFromSpecifications() {
  const resp = http.get(Endpoint + "RawMaterialListFromSpecifications/");
  return resp;
}
export function SuppliersList() {
  const resp = http.get(Endpoint + "SuppliersList");
  return resp;
}

export function GetQcNo() {
  const resp = http.get(Endpoint + "GetQcNo/");
  return resp;
}


export function is_GRN_NO_Unique(GRN_No) {
  const resp = http.get(Endpoint + "is_GRN_NO_Unique/"+GRN_No);
  return resp;
}

// {
//   "QCNo": "string",
//   "deliveredBy": "string",
//   "receivedBy": "string",
//   "RMCode": "string",
//   "quantityReceived": "string",
//   "batchNo": "string",
//   "S_ID": 0,
//   "MFG_Date": "2022-08-09",
//   "EXP_Date": "2022-08-09",
//   "containersReceived": 0
// }
export function Sample(obj) {
  const resp = http.post(Endpoint + "RMSample/", obj);
  return resp;
}
