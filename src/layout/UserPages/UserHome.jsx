import { MdCreditScore } from "react-icons/md";
import { Link } from "react-router-dom";


const UserHome = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Link
        to="/agent-requests"
        className="btn justify-self-center flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md"
      >
        <MdCreditScore size={60} />
        <span className="font-semibold text-xs">Cash Out</span>
      </Link>

      <div>
        <table className="border border-second w-full">
          <thead>
            <tr>
              <th className="border border-second py-1">Available Money</th>
              <th className="border border-second py-1">Total Cost(1.5%)</th>
              <th className="border border-second py-1">Need Money</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{user?.balance}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;