import { MdCreditScore, MdOutlineSendToMobile } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { Link } from "react-router-dom";


const UserHome = () => {
  return (
    <div className="grid grid-cols-3 mt-2">
      <Link
        to="/send-money"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <MdOutlineSendToMobile size={60} />
        <span className="font-semibold text-xs">Send Money</span>
      </Link>
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