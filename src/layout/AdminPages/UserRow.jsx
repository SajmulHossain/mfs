/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import error from "../../utils/errorToast";
import Loading from "../../components/Loading";

const UserRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { role, name, income, balance, number, isDisabled } = user || {};

  const { mutateAsync: block, isPending: blocking } = useMutation({
    mutationKey: ["block"],
    mutationFn: async (info) => {
      const { data } = await axiosSecure.patch(`/user/${number}`, info);
      if (data?.modifiedCount) {
        toast.success("Blocked Successful!");
        refetch();
      } else {
        error();
      }
    },
  });

  const handleBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `${isDisabled ? "Unblock the user!" : "Block the user!"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await block({ isDisabled: !isDisabled });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <tr className="bg-white border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Link
          to={`/user/details/${number}`}
          state={name}
          className="hover:text-second hover:underline"
        >
          {name}
        </Link>
      </th>
      <th className="capitalize px-6 py-4">{role}</th>
      <td className="px-6 py-4">{balance.toFixed(2)}</td>
      <td className="px-6 py-4">
        {role === "agent" ? income.toFixed(2) : "N/A"}
      </td>
      <td className="px-6 py-4">{number}</td>
      <td className="px-6 py-4">
        {blocking ? (
          <div className="flex justify-center items-center">
            <Loading crud={true} />
          </div>
        ) : isDisabled ? (
          <button onClick={handleBlock}>
            <CgUnblock size={20} className="text-main" />
          </button>
        ) : (
          <button onClick={handleBlock}>
            <MdBlock className="text-red-600" size={20} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
