import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";


export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_url,
  withCredentials: true,
})


const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      return res
    }, async error => {
      if(error.response?.status === 401 || error.response?.status === 403) {
        const { data } = await axiosSecure("/logout");
        if (data?.success) {
          toast.success("Logout Successful!");
        } else {
          error();
        }
      }

      return Promise.reject(error)
    })
  },[])

  return axiosSecure;
};

export default useAxiosSecure;