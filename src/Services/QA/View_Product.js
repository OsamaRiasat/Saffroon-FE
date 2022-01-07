import http from "../http/httpService.js"
import {apiUrl} from "../../config.json" 

const data="QualityAssurance/"
const Endpoint=apiUrl+data 

export default{
    
    
    methods: {
        
        ProductDetail(Product="",ProductCode="",RegistrationNo="", ShelfLife="",dosageForm="") {
            
            const resp = http.get(Endpoint+ "ProductDetail/?ProductCode__Product="+Product+"&"+"ProductCode="+ProductCode+"&"+"ProductCode__RegistrationNo=" +RegistrationNo+"&"+"ProductCode__ShelfLife=" +ShelfLife+"&"+"ProductCode__dosageForm__dosageForm="+dosageForm);
            // const resp = http.get(Endpoint+ "RMDataAnalysis?RMAnalysisID__QCNo__IGPNo__RMCode__Material="+MaterialName+"&"+"RMAnalysisID__QCNo__IGPNo__batchNo=" +batchNo+"&"+"RMAnalysisID__QCNo__QCNo=" +QCNo+"&"+"parameter=" +parameter+"&"+"RMAnalysisID__QCNo__IGPNo__S_ID__S_Name=" +SuplierName);
            console.log(resp);
            return resp;
        },
    }   
}
