import useAuth from "../../hooks/useAuth";
import error from "../../utils/errorToast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import Nav from "../AdminPages/Nav";


const CashIn = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['cash in'],
    mutationFn: async (info) => {
      const {data} = await axiosSecure.patch("/cash-in", info);
      if(data?.success) {
        toast.success("Cash in successful!");
        navigate('/');
      } else {
        error();
      }
    }
  })

  const handleCashIn = async e => {
    e.preventDefault();

    const form = e.target;
    const number = form.number.value;
    const amount = form.amount.value;
    const pin = form.pin.value;



    if(!pin || !number || !amount) {
      return error('You must fill all inputs!');
    }

    if(number.length !== 11) {
      return error('Number should be 11 digits')
    }

    if (isNaN(pin)) {
      return error("PIN should be number!");
    }


    if(amount > user?.balance) {
      return error('Insufficient Balance!');
    }

    const data = {
      number, amount, pin
    }

    try {
      await mutateAsync(data);
    } catch({response}) {
      error(response?.data?.message);
    }
  }
  return (
    <div>
      <Nav />
      <form onSubmit={handleCashIn} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Receiver Number
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
            Agent PIN
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
          Submit {isPending && <Loading crud={true} />}
        </button>
      </form>
    </div>
  );
};

export default CashIn;