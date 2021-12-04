import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "products/";   // Its production intentially
const Endpoint = apiUrl + data;

export function ProductCodeListForPackSize() {
  console.log("Getting ProductCodeListForPackSize");
  const resp = http.get(Endpoint + "ProductCodeListForPackSize/");
  console.log(resp);
  return resp;
}

export function ProductData(obj) {
  console.log("getting ProductData")
  const resp = http.get(Endpoint + "ProductData/"+ obj+"/");
  console.log(resp);
  return resp;
}

export function AddPackSize(obj) {
    console.log("Adding AddPackSize")
    const resp = http.post(Endpoint + "AddPackSize/", obj);
    console.log(resp);
    return resp;
}