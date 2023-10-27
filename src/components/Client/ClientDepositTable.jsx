import { useEffect, useState } from "react";
import { userDepositHistory } from "../../assets/data";
import Table from "../Table";

import OverlayLoaderComponent from "../OverlayLoaderComponent";

function ClientDepositTable({ allDeposits }) {
  //   const [deposit, setDeposit] = useState(userDepositHistory);
  // i should be firing off a useEffect hook here to fetch the data

  const columns = [
    { name: "Amount", selector: (row) => `$${row.amount}`, sortable: true },
    { name: "Payment Mode", selector: (row) => "Express" },
    {
      name: "Status",
      cell: (row) =>
        row.approved ? (
          <div className="bg-green-500 flex items-center justify-center text-white text-xs p-1 w-[100px] rounded-xl">
            Processed
          </div>
        ) : (
          <div className="bg-yellow-500 flex items-center justify-center text-white text-xs p-1 w-[100px] rounded-xl">
            Pending
          </div>
        ),
    },
    {
      name: "Date Created",
      selector: (row) => row.createdAt,
      sortable: true,
    },
  ];
  // row.createdAt.toLocaleString()
  return (
    <>
      <Table tableHeaders={columns} tableDetails={allDeposits} />
    </>
  );
}

export default ClientDepositTable;
