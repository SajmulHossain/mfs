import axios from "axios";
import { useEffect } from "react";


export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_url,
  withCredentials: true,
})


const useAxiosSecure = () => {
  useEffect(() => {
    if(localStorage.getItem('user')) {
      axiosSecure.interceptors.response.use(
        (res) => {
          return res;
        },
        async (error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            await axiosSecure("/logout");
            localStorage.removeItem("user");
          }

          return Promise.reject(error);
        }
      );
    }
  },[])

  return axiosSecure;
};

export default useAxiosSecure;