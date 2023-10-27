import { Link } from "react-router-dom";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Table from "../../components/Table";
import { userDeposits } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { getDepositHistory, reset } from "../../features/deposits/depositSlice";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";
import DepositImageModal from "../../components/Admin/DepositImageModal";
import { useState, useEffect } from "react";

function Deposits() {
  //a useEffect hook to get all deposits
  const [imageUrl, setImageUrl] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [depositDetails, setDepositDetails] = useState(null);
  const dispatch = useDispatch();
  const {
    allDeposits,
    depositIsLoading,
    depositIsSuccess,
    depositIsError,
    depositSuccessMessage,
    depositErrorMessage,
  } = useSelector((state) => state.deposit);

  const columns = [
    { name: "Name", selector: (row) => row.user.name },
    { name: "Email", selector: (row) => row.user.email },
    { name: "Amount", selector: (row) => row.amount },
    {
      name: "Status",
      cell: (row) =>
        row.approved ? (
          <div className="bg-green-500 flex items-center justify-center text-white text-xs p-1 w-[100px] rounded-xl">
            Processed
          </div>
        ) : (
          <div className="bg-yellow-500 text-white flex items-center justify-center w-[100px] text-xs p-1 rounded-xl">
            Pending
          </div>
        ),
    },
    {
      name: "Date Deposited",
      selector: (row) => row.createdAt,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowImage(row._id)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            <EyeIcon className="h-4 w-4 text-white" />
          </button>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md">
            <TrashIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (depositIsError) {
      alert(depositErrorMessage);
    }
    dispatch(getDepositHistory()).then(() => {
      dispatch(reset());
    });
  }, [depositIsError, dispatch, depositErrorMessage]);
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Manage Client Deposits
      </h1>
      {depositIsLoading ? (
        <OverlayLoaderComponent />
      ) : allDeposits ? (
        <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
          <Table tableHeaders={columns} tableDetails={allDeposits} />
        </div>
      ) : (
        <p>No user data available</p>
      )}
      {showImage && (
        <DepositImageModal setShowImage={setShowImage} id={showImage} />
      )}
    </>
  );
}

export default Deposits;

{
  /* <>
<p className="text-gray-700 text-3xl mb-16 font-bold dark:text-white">
  Platform Users
</p>
{userIsLoading ? (
  <OverlayLoaderComponent />
) : users ? (
  <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800">
    <Table tableHeaders={columns} tableDetails={users} />
  </div>
) : (
  <p>No user data available</p>
)}
</> */
}
