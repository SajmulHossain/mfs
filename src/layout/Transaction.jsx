import { useQuery } from "@tanstack/react-query";
import Nav from "./AdminPages/Nav";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import TransactionRow from "./TransactionRow";

const Transaction = () => {
  const axiosSecure = useAxiosSecure();
  const {data:transactions=[], isLoading} = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await axiosSecure("/transactions");
      return data || [];
    }
  })
  return (
    <div>
      <Nav />
      <h3 className="font-semibold underline underline-offset-2">
        All Transactions
      </h3>

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
            ):transactions.map(data => <TransactionRow key={data?._id} data={data} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;