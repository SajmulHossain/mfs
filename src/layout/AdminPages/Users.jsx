import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Nav from "./Nav";
import UserRow from "./UserRow";
import { useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    e.preventDefault();

    const text = e.target.search.value;
    setSearch(text);
  }

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users?search=${search}`);
      return data;
    },
  });

  return (
    <section>
      <Nav />
      <div className="mb-4">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              id="default-search"
              name="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by mobile number"
            />
            <button
              type="submit"
              className="text-white btn absolute end-2.5 bottom-2.5 bg-second/80 cursor-pointer hover:bg-second focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="relative custom-scrollbar overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs text-white bg-main/70 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th>Role</th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Income
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Block
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-4">
                  <div className="flex justify-center items-center">
                    <Loading crud={true} />
                  </div>
                </td>
              </tr>
            ) : users?.length ? (
              users?.map((user) => (
                <UserRow key={user?._id} user={user} refetch={refetch} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
