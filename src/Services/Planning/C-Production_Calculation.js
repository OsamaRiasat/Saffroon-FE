import http from "../http/httpService.js"
import { apiUrl } from "../../config.json"


const data = "planning/"
const Endpoint = apiUrl + data

export function ProductionCalculation(planNo) {

    console.log("Gettting PlanMaterialCalculation")
    const resp = http.get(Endpoint + "ProductionCalculation/" + planNo);
    console.log(resp);
    return resp;

}

export function saveProductionPlan(planNo) {
    const resp = http.get(Endpoint + "save_plan/" + planNo);
    return resp;
}

export function deleteProductionPlan(planNo) {
    const resp = http.delete(Endpoint + "DeletePlan/" + planNo);
    return resp;
}



// RM Purchase Order



