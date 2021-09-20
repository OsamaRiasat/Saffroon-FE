import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        
        CodeList() {

            console.log("Gettting PMCodeList")
            const resp = http.get(Endpoint + "PMCodeList/");
            console.log(resp);
            return resp;
        
        },

        CodeByName(code) {

            console.log("Gettting CodeByPMName/")
            const resp = http.get(Endpoint + "PMCodeByPMName/"+code+"/");
            console.log(resp);
            return resp;
        
        },

        MaterialList() {

            console.log("Gettting MaterialList")
            const resp = http.get(Endpoint + "PMaterialList/");
            console.log(resp);
            return resp;
        
        },

        NameByCode(code) {
            //1st line 
            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "PMNameByPMCode/"+code+"/");
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
            const resp = http.get(Endpoint + "PMParameters/");
            console.log(resp);
            return resp;
        
        },
        
        
        
        AcquireCode() {

            console.log("Gettting AcquirePMCode")
            const resp = http.get(Endpoint + "AcquirePMCode/");
            console.log(resp);
            return resp;
        
        },


        Acquirematerial() {

            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "PMAcquirermaterial/");
            console.log(resp);
            return resp;
        
        },

        Acquirespecifications(code) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "PMAcquirespecifications/"+code);
            console.log(resp);
            return resp;
        
        },

        postSpecifications(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "PMspecifications/", obj);
            console.log(resp);
            return resp;
        
        },
        //qccuire
        CodeByNameforaccuire(name) {

            console.log("Gettting CodeByRMName/"+name)
            const resp = http.get(Endpoint + "PMCodeByPMNameForViewSpecs/"+name+"/");
            console.log(resp);
            return resp;
        
        },
        NameByCodeforaccuire(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "PMNameByPMCodeForViewSpecs/"+code+"/");
            console.log(resp);
            return resp;
        
        },
        
    }   

}
