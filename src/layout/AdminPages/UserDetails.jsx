import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import TransactionRow from "../TransactionRow";
import Nav from "./Nav";


const UserDetails = () => {
  const { number } = useParams();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();

  const {data:transactions=[], isLoading} = useQuery({
    queryKey: ['transcations', number],
    queryFn: async () => {
      const { data } = await axiosSecure(`/states/${number}`);
      return data || [];
    }
  })


  return (
    <div>
      <Nav />
      {state && (
        <h3>
          All Transactions of <span className="font-semibold">{state}</span>
        </h3>
      )}
      <div className="overflow-x-auto custom-scrollbar mt-2">
        <table className="w-full border border-second">
          <thead className="bg-main text-white">
            <tr>
              <th className="px-4 py-1 border border-main">User Number</th>
              <th className="px-4 py-1 border border-main">Agent Number</th>
              <th className="px-4 py-1 border border-main">Amount</th>
              <th className="px-4 py-1 border border-main">Charge</th>
              <th className="px-4 py-1 border border-main">Type</th>
              <th className="px-4 py-1 border border-main">Time</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-600">
            {!transactions?.length ? (
              <tr>
                <td colSpan={6} className="py-2 border border-main">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <Loading crud={true} />
                    </div>
                  ) : (
                    "No Data Found"
                  )}
                </td>
              </tr>
            ) : (
              transactions.map((data) => (
                <TransactionRow key={data?._id} data={data} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;