import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { TbTransactionDollar } from "react-icons/tb";
import { Link } from "react-router-dom";

const AgentHome = () => {
  return (
    <div className="grid grid-cols-3 mt-2">
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
      <Link
        to="/transactions"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <TbTransactionDollar size={60} />
        <span className="font-semibold text-xs">Transactions</span>
      </Link>
    </div>
  );
};

export default AgentHome;
