import http from "../http/httpService.js";
import { apiUrl } from "../../config.json";

const data = "QualityAssurance/";   // Its production intentially
const Endpoint = apiUrl + data;

export function AddRawMaterial(obj) {
	const resp = http.post(Endpoint + "AddRawMaterial/", obj);
	return resp;
}

export function addPackingMaterial(obj) {
	const resp = http.post(Endpoint + "AddPackingMaterial/", obj);
	return resp;
}