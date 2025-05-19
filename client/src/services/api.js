import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config.js";
import { getToken, getType } from "../utils/common-utils.js";

const API_URL = "https://tasktrek-2wlv.onrender.com";

axios.defaults.baseURL = API_URL;

const axoisInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, form-data", 
    'Access-Control-Allow-Origin' : '*'
  },
});

axoisInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params){
      config.params =  config.TYPE.params;
    }
    else if(config.TYPE.query){
      config.url = config.url + '/' + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axoisInstance.interceptors.response.use(
  function (response) {
    // stop global loader here
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

////////
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};


const processError = (error)=>{
        if(error.response){
          console.log('ERROR IN RESPONSE : ', error.toJSON())
            return {
                isError : true,
                msg :  error.response.data,
                code : error.response.status
            }
        }
        else if(error.request){
          console.log('ERROR IN REQUEST : ', error.toJSON())
          return {
              isError : true,
              msg : API_NOTIFICATION_MESSAGES.requestFailure,
              code : ""
          }
        }
        else{
          console.log('ERROR IN NETWORK : ', error)
          return {
              isError : true,
              msg : API_NOTIFICATION_MESSAGES.networkError,
              code : ""
          }
        }
}

const API = {}; 

for(const [key,value] of Object.entries(SERVICE_URLS)){
  API[key] = (body , showUploadProgress, showDownloadProgress) =>
  axoisInstance({
    method : value.method,
    url : value.url,
    data : value.method === 'DELETE' ? {} : body,
     responseType : value.responseType,
     headers : {
      authorization : getToken("accessToken")
     },
     TYPE : getType(value,body),
    onUploadProgress : function(progressEvent){
      if(showUploadProgress){
        let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
        showUploadProgress(percentageCompleted);
      }
    },
    onDownloadProgress : function(progressEvent){
      if(showDownloadProgress){
        let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
        showDownloadProgress(percentageCompleted);
      }
    },
  })
}

export {API};