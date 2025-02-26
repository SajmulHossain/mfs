import { MdCreditScore } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { Link } from "react-router-dom";


const UserHome = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Link
        to="/cash-out"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <MdCreditScore size={60} />
        <span className="font-semibold text-xs">Cash Out</span>
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

export default UserHome;