import http from "../http/httpService.js";
import { apiUrl } from "../../config.js";

const data = "suppliers/";
const Endpoint = apiUrl + data;

export function ShowSuppliers() {
  console.log("Getting ShowSuppliers");
  const resp = http.get(Endpoint + "ShowSuppliers");
  console.log(resp);
  return resp;
}

export function RawMaterialCodesppliers() {
  console.log("Getting RawMaterialCodes");
  const resp = http.get(Endpoint + "RawMaterials");
  console.log(resp);
  return resp;
}

export function PackingMaterialCodesppliers() {
  console.log("Getting PackingMaterialCodes");
  const resp = http.get(Endpoint + "PackingMaterials");
  console.log(resp);
  return resp;
}

export function AddSupplier(obj) {
  console.log("Adding AddSupplier");
  const resp = http.post(Endpoint + "AddMaterialToSuppliersView", obj);
  console.log(resp);
  return resp;
}
