/* eslint-disable react/prop-types */

import { FcAcceptDatabase } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import Swal from "sweetalert2";


const AgentReqRow = ({request}) => {
  const {name, number} = request || {};

  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "The agent will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('nothing');
      }
    });
  }
  return (
    <>
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {name}
        </th>
        <td className="px-6 py-4">{number}</td>
        <td className="space-x-2">
          <button>
            <FcAcceptDatabase className="text-main" size={20} />
          </button>
          <button onClick={handleReject}>
            <MdBlock color="red" size={20} />
          </button>
        </td>
      </tr>

    </>
  );
};

export default AgentReqRow;