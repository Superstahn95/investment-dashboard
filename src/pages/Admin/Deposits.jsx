import { Link } from "react-router-dom";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import DepositsTable from "../../components/Admin/DepositsTable";
import Table from "../../components/Table";
import { userDeposits } from "../../assets/data";
import { useState } from "react";

function Deposits() {
  const [deposits, setDeposits] = useState(userDeposits);
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Amount", selector: (row) => row.amount },
    {
      name: "Status",
      cell: (row) =>
        row.approved ? (
          <div className="bg-green-500 text-white text-sm p-1 rounded-xl">
            Processed
          </div>
        ) : (
          <div className="bg-yellow-500 text-white text-sm p-1 rounded-xl">
            Pending
          </div>
        ),
    },
    {
      name: "Date Deposited",
      selector: (row) => row.createdAt.toLocaleString(),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
            <EyeIcon className="h-4 w-4 text-white" />
          </button>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md">
            <TrashIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white">
        Manage Client Deposits
      </h1>
      <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800">
        <Table tableHeaders={columns} tableDetails={deposits} />
      </div>
    </>
  );
}

export default Deposits;
