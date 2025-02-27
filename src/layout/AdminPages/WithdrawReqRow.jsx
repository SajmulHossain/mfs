/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import error from "../../utils/errorToast";
import Loading from "../../components/Loading";

const WithdrawReqRow = ({ request, refetch }) => {
  const { name, agentNumber, amount, _id } = request || {};
  const axiosSecure = useAxiosSecure();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["withdraw-approval"],
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch(`/withdraw/${_id}`, info);
      if (data?.success) {
        toast.success("Operation Successful!");
        refetch();
      } else {
        error();
      }
    },
  });

  const handleReject = async () => {
    try {
      await mutateAsync({ status: "rejected" });
    } catch (err) {
      error(err?.response?.data.message);
    }
  };

  const handleApprove = async () => {
    try {
      await mutateAsync({ status: "approved" });
    } catch (err) {
      error(err?.response?.data.message);
    }
  };
  return (
    <tr className="bg-white border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {name}
      </th>
      <td className="px-6 py-4">{agentNumber}</td>
      <td className="px-6 py-4">{amount}</td>
      <td className="space-x-2 ">
        {isPending ? (
          <div className="flex justify-center">
            <Loading crud={true} />
          </div>
        ) : (
          <>
            <button className="cursor-pointer" onClick={handleApprove}>
              <FcAcceptDatabase className="text-main" size={20} />
            </button>
            <button className="cursor-pointer" onClick={handleReject}>
              <MdBlock color="red" size={20} />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default WithdrawReqRow;
