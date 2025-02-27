import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useBalance from "../../hooks/useBalance";
import error from "../../utils/errorToast";
import Nav from "../AdminPages/Nav";
import Loading from "../../components/Loading";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const SendMoney = () => {
  const { user } = useAuth();
  const {balance, refetch:loadBalance} = useBalance();
  const [money, setMoney] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['send-money'],
    mutationFn: async(info) => {
      const { data } = await axiosSecure.patch("/send-money", info);
      if(data?.success) {
        loadBalance();
        toast.success("Send Money Successful!")
        navigate('/transactions');
      } else {
        error();
      }
    }
  })

   const handleSendMoney = async e => {
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

    if(amount <= 0) {
      return error("Amount cannot be 0 or negative");
    }

    if(isNaN(pin)) {
      return error('PIN should be number!');
    }

    if ((+amount + +money) > user?.balance) {
      return error("Insufficient Balance!");
    }

    const data = {
      number,
      amount,
      pin,
    };

    try {
      await mutateAsync(data);
    } catch (err) {
      error(err?.response?.data?.message);
    }
   }  

  return (
    <div>
      <Nav />
      <h3 className="font-semibold mb-2">Send Money:</h3>
      <table className="border border-second w-full mb-4">
        <thead>
          <tr>
            <th className="border border-second py-1">Available Money</th>
            <th className="border border-second py-1">
              Charge <span className="text-xs font-normal">(over 100tk)</span>
            </th>
            <th className="border border-second py-1">Need Money</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="border border-second py-1">{balance.toFixed(2)}</td>
            <td className="border border-second py-1">
              {money > 100 ? +money + 5 : 0}
            </td>
            <td className="border border-second py-1">
              {money > 100 ? +money + 5 : money}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <form onSubmit={handleSendMoney} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              User Number
            </label>
            <input
              type="number"
              id="number"
              name="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="iCash Number"
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
              onChange={(e) => setMoney(e.target.value)}
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
            Send Money {isPending && <Loading crud={true} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;