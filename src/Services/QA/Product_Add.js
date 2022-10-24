import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function ListOfDosageForms() {
  const resp = http.get(Endpoint + "ListOfDosageForms/");
  return resp;
}

export function AddProduct(obj) {
  const resp = http.post(Endpoint + "AddProduct/", obj);
  return resp;
}
