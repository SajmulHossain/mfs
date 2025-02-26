import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";


const AgentHome = () => {
  return (
    <div className="grid grid-cols-3">
      <Link
        to="/request-money"
        className="btn justify-self-center flex-col gap-0 transition-all duration-200 hover:bg-main/20 p-4 rounded-md"
      >
        <GiReceiveMoney size={60} />
        <span className="font-semibold text-xs mt-1">Request Money</span>
      </Link>

      <Link
        to="/cash-in"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <GiPayMoney size={60} />
        <span className="font-semibold text-xs mt-1">Cash In</span>
      </Link>
      <Link
        to="/withdraws"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <FaMoneyBillTrendUp size={60} />
        <span className="font-semibold text-xs mt-1">Withdraw</span>
      </Link>
    </div>
  );
};

export default AgentHome;