import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { FaBars } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import { IoLinkSharp, IoNotificationsOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import useBalance from "../hooks/useBalance";
import toast from "react-hot-toast";

const CommonLayout = () => {
  const { user, loggingOut, logout } = useAuth();
  const [sidebarOn, setSidebarOn] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { balance, isLoading: balanceLoading } = useBalance();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axiosSecure("/notifications");
      return data;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAmount(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showAmount]);
  return (
    <section className="relative p-4 hide-scrollbar">
      <div className="flex justify-between relative items-center border-b pb-4 border-second">
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

          {balanceLoading ? (
            <div className="w-8 h-4 animate-pulse">
              <p className="bg-main/50"></p>
            </div>
          ) : (
            <button
              onClick={() => setShowAmount(true)}
              className={`bg-main w-fit btn rounded-md ${
                user?.role === "admin" ? "hidden" : "flex"
              } px-2 py-1 text-white h-auto max-w-lg transition-all duration-300 cursor-pointer ${
                showAmount ? "blur-none" : "blur-sm"
              }`}
            >
              <TbCoinTaka /> {balance.toFixed(2)}
            </button>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <p className="font-bold text-right">{user?.name}</p>
          <button onClick={() => setShowNotification(!showNotification)}>
            <IoNotificationsOutline size={24} />
          </button>
        </div>

        <div
          className={`absolute right-0 top-10 w-[250px] min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar bg-second/70 p-2 rounded-md text-white ${
            showNotification ? "block" : "hidden"
          }`}
        >
          <p className="font-semibold border-b">Notifications</p>
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[150px]">
              <Loading crud={true} />
            </div>
          ) : notifications?.length ? (
            <div className="py-2 space-y-2">
              {notifications.map((notice) => (
                <div
                  key={notice?._id}
                  className="bg-main/70 rounded-md px-4 py-2"
                >
                  <div className="flex justify-between items-center">
                    <p>{notice?.message}</p>
                    {notice?.route && (
                      <Link to={notice?.route}>
                        <IoLinkSharp />
                      </Link>
                    )}
                  </div>
                  <p className="font-light text-xs">
                    {formatDistanceToNowStrict(
                      new Date(notice?.timeStamp || new Date())
                    )}{" "}
                    ago
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[150px]">
              <p>No notifications found...</p>
            </div>
          )}
        </div>
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
                onClick={() => {
                  setSidebarOn(false);
                  logout();
                  toast.success("Logout Successful!");
                }}
                disabled={loggingOut}
                className="flex items-center gap-2 w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                <span className="flex gap-4 items-center">
                  Log Out {loggingOut && <Loading crud={true} />}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CommonLayout;
