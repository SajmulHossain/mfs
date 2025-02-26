

import {
  MdOutlineManageAccounts,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Link to='/users' className="btn justify-self-center flex-col gap-0 transition-all duration-200 hover:bg-main/20 p-4 rounded-md">
        <MdOutlineManageAccounts size={60} />
        <span className="font-semibold text-xs">Manage Users</span>
      </Link>

      <Link to='/agent-requests' className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
        <MdOutlineRealEstateAgent size={60} />
        <span className="font-semibold text-xs">Agent Request</span>
      </Link>
      <button className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
        <BsCashCoin size={60} />
        <span className="font-semibold text-xs">Cash In Request</span>
      </button>
    </div>
  );
};

export default AdminHome;