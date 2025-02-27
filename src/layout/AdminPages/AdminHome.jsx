import {
  MdOutlineManageAccounts,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TbCoinTaka } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: states = {}, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data } = await axiosSecure("/states");
      return data || {};
    },
  });

  return (
    <div>
      <div
        className={`border border-main p-2 rounded-md ${
          isLoading ? "animate-pulse gap-1" : "gap-2"
        } flex justify-between`}
      >
        {isLoading ? (
          <>
            <div className="bg-main w-full rounded-md"></div>
            <div className="h-16 w-[1px] bg-main"></div>
            <div className="bg-main w-full rounded-md"></div>
          </>
        ) : (
          <>
            <div className="w-full">
              <p className="font-semibold">Total Income</p>
              <p className="mt-1 flex items-center gap-1">
                <TbCoinTaka /> {states?.income.toFixed(2)}
              </p>
            </div>

            <div className="w-[1px] bg-main"></div>
            <div className="w-full">
              <p className="font-semibold">
                Total Money{" "}
                <span className="text-xs font-normal">in system</span>
              </p>
              <p className="mt-1 flex items-center gap-1">
                <TbCoinTaka />
                {states?.totalMoney.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 mt-2">
        <Link
          to="/users"
          className="btn justify-self-center flex-col gap-0 transition-all duration-200 hover:bg-main/20 p-4 rounded-md"
        >
          <MdOutlineManageAccounts size={60} />
          <span className="font-semibold text-xs">Manage Users</span>
        </Link>

        <Link
          to="/agent-requests"
          className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
        >
          <MdOutlineRealEstateAgent size={60} />
          <span className="font-semibold text-xs">Agent Request</span>
        </Link>
        <Link to='/money-requests' className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
          <BsCashCoin size={60} />
          <span className="font-semibold text-xs">Money Request</span>
        </Link>

        <Link
          to="/withdraw-requests"
          className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
        >
          <FaMoneyBillTrendUp size={60} />
          <span className="font-semibold text-xs mt-1">Withdraw Request</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
