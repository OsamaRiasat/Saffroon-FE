import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its products intentially
const Endpoint = apiUrl + data;




// export function GRNOList() {
//   const resp = http.get(Endpoint + "GRNOList/");
//   return resp;
// }
export function PackingMaterialListFromSpecifications() {
  const resp = http.get(Endpoint + "PackingMaterialListFromSpecifications/");
  return resp;
}
export function SuppliersList() {
  const resp = http.get(Endpoint + "SuppliersList");
  return resp;
}

export function GetQcNo() {
  const resp = http.get(Endpoint + "PackingMaterialGetQcNo/");
  return resp;
}


export function is_GRN_NO_Unique(GRN_No) {
  const resp = http.get(Endpoint + "is_GRN_NO_Unique_PM/"+GRN_No);
  return resp;
}

export function Sample(obj) {
  const resp = http.post(Endpoint + "PMSample/", obj);
  return resp;
}
