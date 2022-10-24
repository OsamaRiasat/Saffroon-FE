import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {



        AcquireCode() {

            console.log("Gettting AcquireProductCode")
            const resp = http.get(Endpoint + "AcquireProductCode/");
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


        Acquirematerial() {
         //materil get use this
            console.log("Gettting Acquirermaterial")
            const resp = http.get(Endpoint + "ProductAcquirermaterial/");
            console.log(resp);
            return resp;

        },

        allStagelist(code) {
            //1st line
            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "ProductStageListOfSpecifications/"+code);
            console.log(resp);
            return resp;

        },


        RMEditSpecificationView(code, stage) {

            console.log("Gettting Acquirespecifications/")
            const resp = http.get(Endpoint + "ProductEditSpecifications/"+code+"/"+stage+"/");
            console.log(resp);
            return resp;

        },

        updateSpecification(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "TempProductSpecifications/", obj);  // Method Post is set intwentially for update Don't Change it
            console.log(resp);
            return resp;

        },
        CodeByName(name) {

            console.log("Gettting CodeByRMName/")
            const resp = http.get(Endpoint + "ProductCodeByProductName/"+name+"/");
            console.log(resp);
            return resp;

        },
        NameByCode(code) {

            console.log("Gettting NameByCode/")
            const resp = http.get(Endpoint + "ProductNameByProductCode/"+code+"/");
            console.log(resp);
            return resp;

        },


    ProductStageListOfSpecifications(code) {
        console.log("Gettting ProductStageListOfSpecifications");
        const resp = http.get(Endpoint + "ProductStageListOfSpecifications/" + code + "/");
        console.log(resp);
        return resp;
      },
    }

}
