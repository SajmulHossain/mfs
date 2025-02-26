import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useBalance = () => {
  const axiosSecure = useAxiosSecure();

  const {data:balance=0, isLoading, refetch} = useQuery({
    queryKey:['balance'],
    queryFn: async() => {
      const { data } = await axiosSecure('/balance');
      return data?.balance;
    }
  })
  return {balance, isLoading, refetch}
};

export default useBalance;