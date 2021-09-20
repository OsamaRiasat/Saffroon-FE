import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        
        CodeList() {

            console.log("Gettting ProductCodeList")
            const resp = http.get(Endpoint + "ProductCodeList/");
            console.log(resp);
            return resp;
        
        },

        CodeByName(code) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "ProductCodeByProductName/"+code+"/");
            console.log(resp);
            return resp;
        
        },

        MaterialList() {

            console.log("Gettting ProductList")
            const resp = http.get(Endpoint + "ProductList/");
            console.log(resp);
            return resp;
        
        },

        NameByCode(code) {
            //1st line 
            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "ProductNameByProductCode/"+code+"/");
            console.log(resp);
            return resp;
        
        },
        newStagelist(code) {
            //1st line 
            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "newStagelist/"+code);
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
            const resp = http.get(Endpoint + "ProductParameters/");
            console.log(resp);
            return resp;
        
        },
        
        
        
        AcquireCode() {

            console.log("Gettting AcquireProductCode")
            const resp = http.get(Endpoint + "AcquireProductCode/");
            console.log(resp);
            return resp;
        
        },


        Acquirematerial() {

            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "ProductAcquirermaterial/");
            console.log(resp);
            return resp;
        
        },
        ProductStageListOfSpecifications(code) {
            console.log("Gettting ProductStageListOfSpecifications");
            const resp = http.get(Endpoint + "ProductStageListOfSpecifications/" + code );
            console.log(resp);
            return resp;
          },

        Acquirespecifications(code,stage) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "ProductAcquirespecifications/"+code+"/"+stage+"/");
            console.log(resp);
            return resp;
        },

        postSpecifications(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "Productspecifications/", obj);
            console.log(resp);
            return resp;
        
        },
        //qccuire
        CodeByNameforaccuire(name) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "ProductCodeByProductNameForViewSpecs/"+name+"/");
            console.log(resp);
            return resp;
        
        },
        NameByCodeforaccuire(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "ProductNameByProductCodeForViewSpecs/"+code+"/");
            console.log(resp);
            return resp;
        
        },
        
    }   

}
