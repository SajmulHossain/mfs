/* eslint-disable react/prop-types */
import { MdBlock } from "react-icons/md";


const UserRow = ({user}) => {
  const {role, name, income, balance, number} = user || {};
  return (
    <tr className="bg-white border-b border-gray-200">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {name}
      </th>
      <th className="capitalize px-6 py-4">{role}</th>
      <td className="px-6 py-4">
        {balance}
      </td>
      <td className="px-6 py-4">
        {role === 'agent' ? income : 'N/A'}
      </td>
      <td className="px-6 py-4">{number}</td>
      <td className="px-6 py-4">
        <button className="cursor-pointer">
          <MdBlock className="text-red-600" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;