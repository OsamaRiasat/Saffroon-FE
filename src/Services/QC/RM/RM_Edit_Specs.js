import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {



        AcquireCode() {

            console.log("Gettting AcquireRMCode")
            const resp = http.get(Endpoint + "AcquireRMCode/");
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


        Acquirematerial() {
         //materil get use this
            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "Acquirermaterial/");
            console.log(resp);
            return resp;

        },


        RMEditSpecificationView(code) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "RMEditSpecifications/"+code);
            console.log(resp);
            return resp;

        },

        updateSpecification(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "TempRMSpecifications/", obj);  // Method Post is set intwentially for update Don't Change it
            console.log(resp);
            return resp;

        },
        CodeByName(name) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "RMCodeByRMNameForViewSpecs/"+name+"/");
            console.log(resp);
            return resp;

        },
        NameByCode(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "RMNameByRMCodeForViewSpecs/"+code+"/");
            console.log(resp);
            return resp;

        },

    }

}
