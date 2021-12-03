import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export default {
	methods: {
		AddRawMaterial(obj) {
			console.log("Adding AddRawMaterial");
			const resp = http.post(Endpoint + "AddRawMaterial/", obj);
			console.log(resp);
			return resp;
		},

		addPackingMaterial(obj) {
			console.log("Adding AddRawMaterial");
			const resp = http.post(Endpoint + "AddPackingMaterial/", obj);
			console.log(resp);
			return resp;
		},
	},
};
