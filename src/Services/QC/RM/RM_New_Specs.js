import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        
        CodeList() {

            console.log("Gettting RMCodeList")
            const resp = http.get(Endpoint + "RMCodeList/");
            console.log(resp);
            return resp;
        
        },

        CodeByName(code) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "RMCodeByRMName/"+code+"/");
            console.log(resp);
            return resp;
        
        },

        MaterialList() {

            console.log("Gettting MaterialList")
            const resp = http.get(Endpoint + "RMaterialList/");
            console.log(resp);
            return resp;
        
        },

        NameByCode(code) {
            //1st line 
            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "RMNameByRMCode/"+code+"/");
            console.log(resp);
            return resp;
        
        },

        Reference() {

            console.log("Gettting Reference")
            const resp = http.get(Endpoint + "RMReference/");
            console.log(resp);
            return resp;
        
        },

        Parameters() {

            console.log("Gettting Parameters")
            const resp = http.get(Endpoint + "RMParameters/");
            console.log(resp);
            return resp;
        
        },
        
        
        
        AcquireCode() {

            console.log("Gettting AcquireRMCode")
            const resp = http.get(Endpoint + "AcquireRMCode/");
            console.log(resp);
            return resp;
        
        },


        Acquirematerial() {

            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "Acquirermaterial/");
            console.log(resp);
            return resp;
        
        },

        Acquirespecifications(code) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "RMAcquirespecifications/"+code);
            console.log(resp);
            return resp;
        
        },

        postSpecifications(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "RMspecifications/", obj);
            console.log(resp);
            return resp;
        
        },
        //qccuire
        CodeByNameforaccuire(name) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "RMCodeByRMNameForViewSpecs/"+name+"/");
            console.log(resp);
            return resp;
        
        },
        NameByCodeforaccuire(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "RMNameByRMCodeForViewSpecs/"+code+"/");
            console.log(resp);
            return resp;
        
        },
        
    }   

}
