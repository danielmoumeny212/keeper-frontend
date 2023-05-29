import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const exceptedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
    if (!exceptedError){
      console.log("logging the error" , error);

    }

    return Promise.reject(error);

});


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete, 
  put: axios.put,

};