import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "inventory/"; // Its production intentially
const Endpoint = apiUrl + data;

export function highestPurchaseOrderNo() {
  const resp = http.get(Endpoint + "RMPurchaseOrderHighestPONo/");
  return resp;
}

export function demandNumberList() {
  const resp = http.get(Endpoint + "RMDemandsDNosWithPendingStatus/");
  return resp;
}

export function suppliersData() {
  const resp = http.get(apiUrl + "suppliers/suppliers");
  return resp;
}

export function supplierApprovedMaterial(data) {
  const resp = http.get(Endpoint + "SupplierApprovedMaterials/" + data);
  return resp;
}

export function DemandedMaterialsByDemandNo(DNo) {
  const resp = http.get(Endpoint + "RMDemandedItems/" + DNo);
  return resp;
}

export function materialCodes(data) {
  const resp = http.get(Endpoint + "RMPurchaseOrderListOfMaterialCodesForForm/" + data.SID + "/" + data.DNo);
  return resp;
}

export function material(data) {
  const resp = http.get(Endpoint + "RMPurchaseOrderListOfMaterialsForForm/" + data.SID + "/" + data.DNo);
  return resp;
}

export function materialByCode(data) {
  const resp = http.get(Endpoint + "RawMaterialSearchByRMCode/" + data + "/");
  return resp;
}

export function postPurchaseOrder(data) {
  const resp = http.post(Endpoint + "RMPurchaseOrder/", data);
  return resp;
}