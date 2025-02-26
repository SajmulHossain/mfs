import { useQuery } from "@tanstack/react-query";
import Nav from "./Nav";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import AgentReqRow from "./AgentReqRow";


const AgentRequest = () => {
  const axiosSecure = useAxiosSecure();
  
  const {data:requests=[], isLoading, refetch} = useQuery({
    queryKey: ["agent-requests"],
    queryFn:async() => {
      const { data } = await axiosSecure("/agent-requests");
      return data;
    }
  })

   if (isLoading) {
     return (
       <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
         <Loading crud={true} />
       </div>
     );
   }


  return (
    <section>
      <Nav />

      <div className="relative custom-scrollbar overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs text-white bg-main/70 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests?.length ? (
              requests?.map((req) => (
                <AgentReqRow key={req?._id} refetch={refetch} request={req} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AgentRequest;