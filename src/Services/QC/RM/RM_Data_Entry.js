import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {

        // List of assigned QC No
        RMQCNo() {

            console.log("Gettting RMQCNoList")
            const resp = http.get(Endpoint + "RMQCNo/",{ 'headers': { 'Authorization': "Token"+" "+sessionStorage.getItem("token") } });
            console.log(resp);
            return resp;

        },

        // When QC NO is selected call this service and append tha data accordingly in the whole form
        RMQCNoSample(QCNo) {

            console.log("Gettting AcquireRMCode")
            const resp = http.get(Endpoint + "RMQCNoSample/"+QCNo+"/");
            console.log(resp);
            return resp;

        },

        // look at the swagger for body
        PostRMAnalysis(obj) {

            console.log("Gettting specifications")
            const resp = http.post(Endpoint + "PostRMAnalysis/", obj);
            console.log(resp);
            return resp;

        },


        // you can test Post Function only  by this
        // {
        //     "QCNo": "RM23232",
        //     "workingStd": "USP",
        //     "rawDataReference": "123",
        //     "analysisDateTime": "2021-08-29T05:35:19.945Z",
        //     "retestDate": "2021-08-29T05:35:19.945Z",
        //     "quantityApproved": "223",
        //     "quantityRejected": "0.00",
        //     "remarks": "okay",
        //     "rm_analysis_items": [
        //       {
        //         "parameter": "Taste",
        //           "specification": "sour",
        //         "result": "complies"
        //       }
        //     ]
        //   }

    }

}
