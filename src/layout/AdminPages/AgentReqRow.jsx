/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import error from "../../utils/errorToast";
import Loading from "../../components/Loading";

const AgentReqRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { name, number, _id } = request || {};

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["agent-status"],
    mutationFn: async (status) => {
      const { data } = await axiosSecure.patch(`/agent-status/${_id}`, status);
      if (data?.modifiedCount) {
        toast.success("Operation Successfull!");
        refetch();
      } else {
        error();
      }
    },
  });

  const handleApprove = async () => {
    try {
      await mutateAsync({ agentStatus: "approved" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "The agent will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync({ agentStatus: "rejected" });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return (
    <>
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {name}
        </th>
        <td className="px-6 py-4">{number}</td>
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
    </>
  );
};

export default AgentReqRow;
