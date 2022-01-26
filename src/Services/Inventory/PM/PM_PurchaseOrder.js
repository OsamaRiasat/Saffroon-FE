import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 


const data = "inventory/"; 
const Endpoint = apiUrl + data;

export function highestPurchaseOrderNo() {
  const resp = http.get(Endpoint + "PMPurchaseOrderHighestPONo/");
  return resp;
}

export function demandNumberList() {
  const resp = http.get(Endpoint + "PMDemandsDNosWithPendingStatus/");
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
  const resp = http.get(Endpoint + "PMDemandedItems/" + DNo);
  return resp;
}

export function materialCodes(data) {
  const resp = http.get(Endpoint + "PMPurchaseOrderListOfMaterialCodesForForm/" + data.SID + "/" + data.DNo);
  return resp;
}

export function material(data) {
  const resp = http.get(Endpoint + "PMPurchaseOrderListOfMaterialsForForm/" + data.SID + "/" + data.DNo);
  return resp;
}

export function materialByCode(data) {
  const resp = http.get(Endpoint + "PackingMaterialSearchByPMCode/" + data + "/");
  return resp;
}

export function postPurchaseOrder(data) {
  const resp = http.post(Endpoint + "PMPurchaseOrder/", data);
  return resp;
}