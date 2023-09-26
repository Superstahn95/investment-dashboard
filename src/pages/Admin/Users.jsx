import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/users";
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Username", selector: (row) => row.username },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    {
      name: "Action",
      cell: (row) => (
        <Link
          to={`${row.id}`}
          className="bg-orange-500 text-white px-3 py-2 rounded-md"
        >
          Manage
        </Link>
      ),
    },
  ];
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    //replace table loading with a suitable spinner component
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold dark:text-white">
        Platform Users
      </p>
      {isLoading ? (
        <div>Table loading</div>
      ) : (
        <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800">
          <Table tableHeaders={columns} tableDetails={users} />
        </div>
      )}
    </>
  );
}

export default Users;
