/* eslint-disable react/prop-types */

import { format } from "date-fns";


const TransactionRow = ({data}) => {
  const {userNumber, agentNumber, amount, charge, type, timeStamp} = data || {};
  return (
    <tr>
      <th className="px-2 border border-main">{userNumber}</th>
      <th className="px-2 border border-main">{agentNumber}</th>
      <th className="px-2 border border-main">{amount}</th>
      <th className="px-2 border border-main">{charge.toFixed(2)}</th>
      <th className="px-2 border border-main">{type}</th>
      <th className="px-2 border border-main py-1">{format(new Date(timeStamp), "PP")}</th>
    </tr>
  );
};

export default TransactionRow;