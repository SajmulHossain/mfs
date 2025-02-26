import { ImCross } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { MdOutlinePendingActions } from "react-icons/md";
import toast from "react-hot-toast";


const BlockAgent = () => {
  const { user, logout } = useAuth();
  return (
    <section className="layout p-4">
      {user?.agentStatus === "pending" ? (
        <div>
          <div className="flex justify-center mt-10">
            <MdOutlinePendingActions
              className="animate-pulse"
              color="blue"
              size={100}
            />
          </div>
          <p className="text-center font-semibold text-2xl mt-10 text-second">
            <span className="text-main">Mr. {user?.name}</span> your agent
            request is pending. Please wait for Admin apporval.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mt-10">
            <ImCross color="red" size={100} />
          </div>
          <p className="text-center font-semibold text-2xl mt-10 text-red-700">
            <span className="text-main">Mr. {user?.name}</span> your agent
            request has been denied by Admin. Please try to contact with Admin
          </p>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            logout();
            toast.success("Logout Successful!");
          }}
          className="btn border rounded-md px-4 py-2 hover:bg-main hover:text-white font-semibold"
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default BlockAgent;