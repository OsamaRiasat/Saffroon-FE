import http from "../http/httpService.js"
import {apiUrl} from "../../config.js"

const data="Account/"
const Endpoint=apiUrl+data

export default{


    methods: {
        login(creds)
        {

            const resp =http.post(Endpoint+"login/",creds).then(function(response){
                console.log("In response ")

                console.log("data" , response.data )
                sessionStorage.setItem("Role",response.data.Role);
                sessionStorage.setItem("token",response.data["Token key"]);
                sessionStorage.setItem("isLogin",true);
                return true


            }).catch((error)=>{
                if (error.response) {
                    // Request made and server responded
                    return ("Error " + (error.response.data)["message"])
                    // alert((error.response.data)["message"]);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    // console.log(error.response.config);
                  } else if (error.request) {
                    // The request was made but no response was received
                    return 'Error' + error.request ;
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    return 'Error ' +error.message;
                  }

            })


            return resp

        },
        logout()
        {
           console.log(sessionStorage.getItem("token"));

            const resp=http.get(Endpoint+"logout/",{ 'headers': { 'Authorization': "Token"+" "+sessionStorage.getItem("token") } }).then(function(response){
                console.log(response.data)
                sessionStorage.removeItem("Role");
                sessionStorage.removeItem("token");
                sessionStorage.setItem("isLogin",false);
                return response.data;

            })
            return resp;
        },
        register(payload)
        {
            try{
                console.log(payload);
                const resp=http.post(Endpoint+"register/",payload).then(function(response){

                    console.log(response);
                    if(response.status === 201)

                    {
                        alert("user Created")
                        return true

                    }
                    alert ("User is Not Created")
                    return false
                })


            }
            catch(err)
            {
                alert (err)
                return false
            }

        },
        changePassword(payload)
        {
            const resp = http.put(Endpoint+"api/changepassword/",payload,{ 'headers': { 'Authorization': "Token"+" "+sessionStorage.getItem("token") } }).then((response)=>
            {
                console.log(response.data)
                sessionStorage.removeItem("Role");
                sessionStorage.removeItem("token");
                sessionStorage.setItem("isLogin",false);
                console.log("response api " + response);
            })
        }


    }

}

