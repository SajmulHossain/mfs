import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdBlock } from "react-icons/md";


const Users = () => {
  const axiosSecure = useAxiosSecure();

  const {data:users=[], isLoading}  = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const {data} = await axiosSecure('/users');
      console.log(data);
      return data;
    }
  })

  return (
    <section>
      <div className="relative custom-scrollbar overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs text-white bg-main/70 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th>Role</th>
              <th scope="col" className="px-6 py-3">
                Balance/Income
              </th>
              <th scope="col" className="px-6 py-3">
                Block
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id} className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user?.name}
                </th>
                <th className="capitalize px-6 py-4">{user?.role}</th>
                <td className="px-6 py-4">
                  {user?.role === "agent" ? user?.income || 0 : user?.balance}
                </td>
                <td className="px-6 py-4">
                  <button className="cursor-pointer">
                    <MdBlock className="text-red-600" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;