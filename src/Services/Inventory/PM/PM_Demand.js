import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 


const data="inventory/"
const Endpoint=apiUrl+data 


// RM Demand Form
export function getPMDemandHighestDNo()
{
    console.log("Gettting PMDemandProducts")
     const resp=http.get(Endpoint+"PMDemandHighestDNo/");
     console.log(resp);
     return resp;
     
}

export function PackingMaterialNames()
{
    console.log("Gettting PackingMaterialNames")
     const resp=http.get(Endpoint+"viewset/PackingMaterialNames/");
     console.log(resp);
     return resp;
    
}

export function PackingMaterialCodes()
{
    console.log("Gettting PackingMaterialCodes")
     const resp=http.get(Endpoint+"viewset/PackingMaterialCodes/");
     console.log(resp);
     return resp;
    
}

export function PackingMaterialSearchByPMCode(pmCode)
{
    
    console.log("Gettting PackingMaterialbyCode")
     const resp=http.get(Endpoint+"PackingMaterialSearchByPMCode/"+pmCode+"/");
     console.log(resp);
     return resp;
    
}
export function PackingMaterialSearchByName(pmName)
{
    
    console.log("Gettting PackingMaterialSearchByName")
     const resp=http.get(Endpoint+"PackingMaterialSearchByName/"+pmName);
     console.log(resp);
     return resp;
    
}
export function PlanNosList()
{
     console.log("Gettting PlanNosList")
     const resp=http.get(Endpoint+"PlanNosList");
     console.log(resp);
     return resp;
    
}

export function Demanded_Materials_Through_PlanNo(planNo)
{    
    console.log("Gettting Demanded_Materials_Through_PlanNo")
     const resp=http.get(Endpoint+"Demanded_Packing_Materials_Through_PlanNo"+planNo);
     console.log(resp);
     return resp;
    
}
export function PMDemands(pmdemand)
{
    
    console.log("Gettting PMDemands")
     const resp=http.post(Endpoint+"PMDemands/",pmdemand);
     console.log(resp);
     return resp;
    
}


// RM Purchase Order



