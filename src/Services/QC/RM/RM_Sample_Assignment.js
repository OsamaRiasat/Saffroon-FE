import http from "../../http/httpService.js"
import {apiUrl} from "../../../config.js"

const data="QualityControl/"
const Endpoint=apiUrl+data

export default{


    methods: {



        RMSamples() {

            console.log("Gettting RMSamples")
            const resp = http.get(Endpoint + "RMSamples/");
            console.log(resp);
            return resp;

        },


        Analysts() {

            console.log("Gettting Analysts")
            const resp = http.get(Endpoint + "Analysts/");
            console.log(resp);
            return resp;

        },



        AssignAnalyst(QCNo,payload) {
            // {
            //     "analyst": 1
            //   }

            console.log("Gettting AssignAnalyst/")
            const resp = http.put(Endpoint + "AssignAnalyst/"+QCNo+"/",payload).catch((err)=>{
                console.log(err);
                alert("Not Assigned Due to some error");
                return false
            });
            console.log(resp);
            return resp;

        },
        AnalystSample(id){
            console.log("Analyst Samole", id)
            const resp = http.get(Endpoint+"AnalystSample/"+id+"/")
            console.log(resp);
            return resp;
        }


    }

}
