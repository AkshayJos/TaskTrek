import axios from "axios";

export const clearTokens = () => {
  document.cookie = "accessToken=; Path=/;";
  document.cookie = "refreshToken=; Path=/;";
};


// export const getRefreshedToken = async () => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; refreshToken=`);
//   let refreshToken;
  
//   if (parts.length === 2) {
//     refreshToken =  `Bearer ${parts.pop().split(";").shift()}`;
//   }
  
//   try {
//     const response = await axios.get(`http://localhost:8000/getValidate/:${refreshToken}`)
//     if (response.data) {
//       document.cookie = `accessToken=${response.data.accessToken}; path=/`;
//       document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;
//     }
//   } 
//   catch (error) {
//   }
// };

export const getToken = (name) => {
  // getRefreshedToken();
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return `Bearer ${parts.pop().split(";").shift()}`;
  }

  return null;
};

export const addElipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "...." : str;
};

export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }

  return {};
};
