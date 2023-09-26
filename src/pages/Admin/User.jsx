import { useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
function User() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const getUserDetails = async () => {
    try {
      const response = await axios.get(url);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  useEffect(() => {
    getUserDetails();
  }, []);
  console.log(user);
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white dark:bg-slate-800 pt-7 px-4 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700 font-bold text-2xl dark:text-white">
            {user.name}
          </h2>
          {/* button div */}
          <div className="flex items-center space-x-1">
            <Link
              to={"/users"}
              className="inline-flex w-full justify-center items-center text-white capitalize bg-orange-500 px-3 py-2 rounded-md"
            >
              back
            </Link>
            <Menu as={"div"} className="relative">
              <Menu.Button
                className={
                  "inline-flex w-full justify-center items-center text-white capitalize bg-orange-500 px-3 py-2 rounded-md"
                }
              >
                Actions
                <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform scale-95"
                enterTo="transform scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform scale-95"
                leaveTo="transform scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 z-[99] mt-2 origin-top-right bg-white dark:bg-slate-800 rounded shadow-sm">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg-orange-100 "
                        } dark:text-white  hover:text-black dark:hover:text-black p-2`}
                        href="/account-settings"
                      >
                        Credit/Debit
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && "bg-orange-100  "
                        } p-2 hover:text-black dark:hover:text-black dark:text-white`}
                        href="/account-settings"
                      >
                        Delete {user.name}
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {/* details div */}
        <div className="grid grid-cols-3 gap-5 border border-black/40 dark:border-white my-4 p-4 text-gray-600 dark:text-white">
          <div>
            <p>Account Balance</p>
            <p>$0.00</p>
          </div>
          <div>
            <p>Profit</p>
            <p>$0.00</p>
          </div>
          <div>
            <p>Inv. Funds and Returns</p>
            <p>$0.00</p>
          </div>
          <div>
            <p>Inv. Plans</p>
            <p>No investment plan</p>
          </div>
          <div>
            <p>User account status</p>
            <p className="bg-green-400 text-white rounded-2xl w-fit py-1 px-2">
              Active
            </p>
          </div>
        </div>
        {/* user information */}
        <div>
          <h2 className="text-gray-700 uppercase  text-xl dark:text-white">
            User Information
          </h2>
          <table className="w-full text-gray-600 border border-black/40 dark:border-white dark:text-white my-4">
            <tbody>
              {/* can be converted into an object loop if you get what i mean */}
              <tr className="border-b">
                <td className="p-2 border-r ">Full Name</td>{" "}
                <td>{user.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r ">Email Address</td>{" "}
                <td>{user.email}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r ">Phone Number</td>{" "}
                <td>{user.phone}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border-r ">Username</td>{" "}
                <td>{user.username}</td>
              </tr>
              <tr>
                <td className="p-2 border-r ">Website</td>{" "}
                <td>{user.website}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
