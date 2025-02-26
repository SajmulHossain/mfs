import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import Nav from "../AdminPages/Nav";
import Loading from "../../components/Loading";
import error from "../../utils/errorToast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBalance from "../../hooks/useBalance";

const Cashout = () => {
  const { user } = useAuth();
  const [totalCost, setTotalCost] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { refetch,balance } = useBalance();

  const {isPending, mutateAsync} = useMutation({
    mutationKey: ['cash out'],
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch('/cash-out', info);
      if (data?.success) {
        refetch();
        toast.success("Cash in successful!");
        navigate("/");
      } else {
        error();
      }
    }
  }) ;

  const handleCashout = async e => {
    e.preventDefault();

    const form = e.target;
    const number = form.number.value;
    const amount = form.amount.value;
    const pin = form.pin.value;

    if (!pin || !number || !amount) {
      return error("You must fill all inputs!");
    }

    if (number.length !== 11) {
      return error("Number should be 11 digits");
    }

    if(isNaN(pin)) {
      return error('PIN should be number!');
    }

    if ((+amount + +totalCost) > user?.balance) {
      return error("Insufficient Balance!");
    }

    const data = {
      number,
      amount,
      pin,
    };

    try {
      await mutateAsync(data);
    } catch({response}) {
      error(response?.data?.message);
    }
  }
  return (
    <div>
      <Nav />
      <table className="border border-second w-full mb-4">
        <thead>
          <tr>
            <th className="border border-second py-1">Available Money</th>
            <th className="border border-second py-1">Total Cost(1.5%)</th>
            <th className="border border-second py-1">Need Money</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="border border-second py-1">{balance.toFixed(2)}</td>
            <td className="border border-second py-1">{totalCost.toFixed(2)}</td>
            <td className="border border-second py-1">{(totalCost/.015 + totalCost).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <form onSubmit={handleCashout} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Agent Number
            </label>
            <input
              type="number"
              id="number"
              name="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="iCash Numer"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Amount
            </label>
            <input
              onChange={(e) => setTotalCost(e.target.value*0.015)}
              type="number"
              id="amount"
              name="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Amount"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pin"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your PIN
            </label>
            <input
              type="password"
              id="pin"
              name="pin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="PIN"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="text-white btn bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cash Out {isPending && <Loading crud={true} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cashout;
