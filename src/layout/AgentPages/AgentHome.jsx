import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";


const AgentHome = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Link
        to="/users"
        className="btn justify-self-center flex-col gap-0 transition-all duration-200 hover:bg-main/20 p-4 rounded-md"
      >
        <GiReceiveMoney size={60} />
        <span className="font-semibold text-xs">Request Money</span>
      </Link>

      <Link
        to="/cash-in"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <GiPayMoney size={60} />
        <span className="font-semibold text-xs">Cash In</span>
      </Link>
      {/* <button className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
        <BsCashCoin size={60} />
        <span className="font-semibold text-xs">Cash In Request</span>
      </button> */}
    </div>
  );
};

export default AgentHome;