import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"

const data="Account/api/"
const Endpoint=apiUrl+data

export function getRoles() {
  const resp = http.get(Endpoint+"roles/",);
  return resp;
}

export function getUsers() {
	const resp = http.get(Endpoint + "users/profile/");
	return resp;
}
