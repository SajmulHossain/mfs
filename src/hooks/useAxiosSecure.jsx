import axios from "axios";


export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_url,
  withCredentials: true,
})


const useAxiosSecure = () => {
  console.log('kire');
};

export default useAxiosSecure;