import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, reset } from "../../features/user/userSlice";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";

function Users() {
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    users,
    userIsLoading,
    userError,
    userSuccess,
    userSuccessMessage,
    userErrorMessage,
  } = useSelector((state) => state.user);
  console.log(users);

  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Total Deposits", selector: (row) => row.totalDeposit },
    { name: "Pending Deposit", selector: (row) => row.pendingDeposit },
    {
      name: "Action",
      cell: (row) => (
        <Link
          to={`${row._id}`}
          className="bg-orange-500 text-white px-3 py-2 rounded-md"
        >
          Manage
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (userError) {
      alert(userErrorMessage);
    }
    dispatch(getUsers()).then(() => {
      dispatch(reset());
    });
  }, [userError, dispatch, userErrorMessage]);
  // if (userIsLoading) {
  //   return <OverlayLoaderComponent />;
  // }
  return (
    //replace table loading with a suitable spinner component

    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Platform Users
      </p>
      {userIsLoading ? (
        <OverlayLoaderComponent />
      ) : users ? (
        <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
          <Table tableHeaders={columns} tableDetails={users} />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
}

export default Users;
