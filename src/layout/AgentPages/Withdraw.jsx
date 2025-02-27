import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import error from "../../utils/errorToast";
import Nav from "../AdminPages/Nav";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post("/withdraws", info);
      if(data?._id) {
        toast.success("Request sent!");
        navigate('/');
      } else {
        error();
      }
    },
  });

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const form = e.target;
    const amount = form.amount.value;
    const pin = form.pin.value;

    if (!pin || !amount) {
      return error("You must fill all inputs!");
    }

    if (isNaN(pin) || pin.length !== 5) {
      return error("PIN should be 5 digits number!");
    }

    if (amount > user?.income) {
      return error("Insufficient Balance!");
    }

    const data = {
      amount,
      pin,
    };


    try {
      await mutateAsync(data);
    } catch (err) {
      error(err?.response?.data?.message);
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Nav />
        <p>Withdrawable amount: {user?.income.toFixed(2)}</p>
      </div>
      <form onSubmit={handleWithdraw} className="max-w-sm mx-auto">
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

export default Withdraw;
