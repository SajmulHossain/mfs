import { FaBars } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { MdOutlineManageAccounts, MdOutlineRealEstateAgent } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const AdminLayout = () => {
  const { user,loggingOut, logout } = useAuth();
  const [showAmount, setShowAmount] = useState(false);
  const [sidebarOn, setSidebarOn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAmount(false);
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  },[showAmount])

  return (
    <section className="layout relative hide-scrollbar">
      <div className="flex justify-between items-center border-b pb-4 border-second">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOn(true)}
            className="text-white bg-second/90 hover:bg-second focus:ring-4 focus:ring-second font-medium rounded-lg text-sm px-3 py-2.5"
            type="button"
            data-drawer-target="drawer-disable-body-scrolling"
            data-drawer-show="drawer-disable-body-scrolling"
            data-drawer-body-scrolling="false"
            aria-controls="drawer-disable-body-scrolling"
          >
            <FaBars />
          </button>

          <button
            onClick={() => setShowAmount(true)}
            className={`bg-main w-fit rounded-md px-2 py-1 text-white h-auto max-w-lg transition-all duration-300 cursor-pointer ${
              showAmount ? "blur-none" : "blur-sm"
            }`}
          >
            {user?.balance}
          </button>
        </div>
        <p className="font-bold">{user?.name}</p>
      </div>

      <div
        id="drawer-disable-body-scrolling"
        className={`absolute top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          sidebarOn ? "" : "-translate-x-full"
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-disable-body-scrolling-label"
      >
        <h5
          id="drawer-disable-body-scrolling-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={() => setSidebarOn(false)}
          data-drawer-hide="drawer-disable-body-scrolling"
          aria-controls="drawer-disable-body-scrolling"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
  
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => logout()}
                  disabled={loggingOut}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Log Out {loggingOut && <Loading />}
                  </span>
                </button>
              </li>
            </ul>
          </div>
       
      </div>

      {/* main section */}
      <div className="flex justify-between flex-wrap">
        <button className="btn flex-col gap-0 transition-all duration-200 hover:bg-main/20 p-4 rounded-md">
          <MdOutlineManageAccounts size={60} />
          <span className="font-semibold text-xs">Manage Users</span>
        </button>

        <button className="btn flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
          <MdOutlineRealEstateAgent size={60} />
          <span className="font-semibold text-xs">Agent Request</span>
        </button>
        <button className="btn flex-col transition-all duration-200 gap-0 hover:bg-main/20 p-4 rounded-md">
          <BsCashCoin size={60} />
          <span className="font-semibold text-xs">Cash In Request</span>
        </button>
      </div>
    </section>
  );
};

export default AdminLayout;
