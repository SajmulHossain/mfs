import { TbLock } from "react-icons/tb";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";


const Disabled = () => {
  const {logout, user } = useAuth();
  return (
    <section className="layout p-4">
      <div className="flex justify-center mt-10">
        <TbLock size={100} color="red" />
      </div>
      <p className="text-center font-semibold text-2xl mt-10 text-red-700">
        <span className="text-main">Mr. {user?.name}</span> your account has
        been disabled! Please try to contact with Admin.
      </p>

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

export default Disabled;