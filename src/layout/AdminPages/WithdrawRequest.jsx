import { useQuery } from "@tanstack/react-query";
import Nav from "./Nav";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import WithdrawReqRow from "./WithdrawReqRow";


const WithdrawRequest = () => {
  const axiosSecure = useAxiosSecure();
  
  const {data:requests, isLoading, refetch} = useQuery({
    queryKey: ['withdraw-requests'],
    queryFn: async() => {
      const { data } = await axiosSecure("/withdraws");
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
    <div>
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
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests?.length ? (
              requests?.map((req) => (
                <WithdrawReqRow
                  key={req?._id}
                  request={req}
                  refetch={refetch}
                />
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
    </div>
  );
};

export default WithdrawRequest;