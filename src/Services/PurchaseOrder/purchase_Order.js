import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "inventory/"; // Its production intentially
const Endpoint = apiUrl + data;

export default {
	methods: {
		highestPurchaseOrderNo() {
			const resp = http.get(Endpoint + "RMPurchaseOrderHighestPONo/");
			return resp;
		},

		demandNumberList() {
			const resp = http.get(Endpoint + "RMDemandsDNosWithPendingStatus/");
			return resp;
		},

    suppliersData() {
      const resp = http.get(apiUrl + "suppliers/suppliers");
      return resp;
    },

    supplierApprovedMaterial(data) {
      const resp = http.get(Endpoint + "SupplierApprovedMaterials/" + data);
      return resp;
    },

    materialCodes(data) {
      const resp = http.get(Endpoint + "RMPurchaseOrderListOfMaterialCodesForForm/" + data.SID + "/" + data.DNo);
      return resp;
    },

    material(data) {
      const resp = http.get(Endpoint + "RMPurchaseOrderListOfMaterialsForForm/" + data.SID + "/" + data.DNo);
      return resp;
    },

    materialByCode(data) {
      const resp = http.get(Endpoint + "RawMaterialSearchByRMCode/" + data + "/");
      return resp;
    },

    postPurchaseOrder(data) {
      const resp = http.post(Endpoint + "RMPurchaseOrder/", data);
      return resp;
    }
	},
};