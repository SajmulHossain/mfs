/* eslint-disable react/prop-types */

import { format } from "date-fns";


const TransactionRow = ({data}) => {
  const {transactionId, recieverNumber, senderNumber, amount, charge, type, timeStamp } =
    data || {};

  return (
    <tr>
      <td className="px-2 border border-main">{transactionId}</td>
      <th className="px-2 border border-main">{senderNumber}</th>
      <th className="px-2 border border-main">{recieverNumber}</th>
      <th className="px-2 border border-main">{amount}</th>
      <th className="px-2 border border-main">{charge.toFixed(2)}</th>
      <th className="px-2 border border-main capitalize">{type}</th>
      <th className="px-2 border border-main py-1">
        {format(new Date(timeStamp), "PP")}
      </th>
    </tr>
  );
};

export default TransactionRow;