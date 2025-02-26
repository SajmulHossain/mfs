import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Users = () => {
  const axiosSecure = useAxiosSecure();

  const {data:users, isLoading}  = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const {data} = await axiosSecure('/users');
      return data;
    }
  })

  return (
    <section>
      
    </section>
  );
};

export default Users;