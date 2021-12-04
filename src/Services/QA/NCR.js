import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function AllUsers() {
  const resp = http.get(Endpoint + "AllUsers/");
  return resp;
}

export function HighestNCR() {
  const resp = http.get(Endpoint + "HighestNCR/");
  return resp;
}
    
export function CategoriesList() {
  const resp = http.get(Endpoint + "CategoriesList/" );
  return resp;
}

export function SubCategories(category) {
  const resp = http.get(Endpoint + "SubCategories/"+category+"/");
  return resp;
}

export function ProductCode() {
  const resp = http.get(Endpoint + "ProductCode/");
  return resp;
}

export function BatchNo(PCode) {
  const resp = http.get(Endpoint + "BatchNo/"+PCode+"/");
  return resp;
}

export function NCR(obj) {
  const resp = http.post(Endpoint + "NCR/", obj);
  return resp;
}
export function NCRNoList() {
  const resp = http.get(Endpoint + "NCRNoList/");
  return resp;
}

export function NCRDetail(NCRNo) {
  const resp = http.get(Endpoint + "NCRDetail/"+NCRNo+"/");
  return resp;
}