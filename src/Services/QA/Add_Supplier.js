import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "suppliers/"; // Its production intentially
const Endpoint = apiUrl + data;

export function ProductCodeListForPackSize() {
  console.log("Getting ProductCodeListForPackSize");

  return;
}

export function AddSupplierService(obj) {
  console.log("Adding AddSupplier");
  const resp = http.post(Endpoint + "AddSupplier", obj);
  console.log(resp);
  return resp;
}
