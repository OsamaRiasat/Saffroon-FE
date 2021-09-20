import http from "../http/httpService.js"
import { apiUrl } from "../../config.json"


const data = "planning/"
const Endpoint = apiUrl + data


export function PlanMaterialCalculation(planNo, isQuarantine, isPIP) {

    console.log("Gettting PlanMaterialCalculation")
    const resp = http.get(Endpoint + "PlanMaterialCalculation/" + planNo + "/" + isQuarantine + "/" + isPIP + "/");
    console.log(resp);
    return resp;

}


// RM Purchase Order



