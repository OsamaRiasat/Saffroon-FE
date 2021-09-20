import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.json" 

const data="QualityControl/"
const Endpoint=apiUrl+data 

export default{
    
 
    methods: {
        
        
        
        AcquireCode() {

            console.log("Gettting AcquirePMCode")
            const resp = http.get(Endpoint + "AcquirePMCode/");
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


        Acquirematerial() {
         //materil get use this
            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "PMAcquirermaterial/");
            console.log(resp);
            return resp;
        
        },

        
        RMEditSpecificationView(code) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "PMEditSpecifications/"+code);
            console.log(resp);
            return resp;
        
        },
    
        updateSpecification(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "TempPMSpecifications/", obj);  // Method Post is set intwentially for update Don't Change it
            console.log(resp);
            return resp;
        
        },
        CodeByName(name) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "PMCodeByPMNameForViewSpecs/"+name+"/");
            console.log(resp);
            return resp;
        
        },
        NameByCode(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "PMNameByPMCodeForViewSpecs/"+code+"/");
            console.log(resp);
            return resp;
        
        },
        
    }   

}
