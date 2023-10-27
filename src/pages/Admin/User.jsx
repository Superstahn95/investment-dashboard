import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, reset } from "../../features/user/userSlice";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";
import UserDetails from "../../components/Admin/UserDetails";
import UserInfo from "../../components/Admin/UserInfo";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";
import FundingModal from "../../components/Admin/FundingModal";
function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
  };
  const {
    singleUser,
    users,
    userIsLoading,
    userError,
    userSuccess,
    userSuccessMessage,
    userErrorMessage,
  } = useSelector((state) => state.user);
  useEffect(() => {
    // setLoading(true);
    if (!users) {
      dispatch(getUser());
      setUser(singleUser);
      setLoading(false);
    } else {
      //we can actually set an action in our redux store to get this done
      setUser(users.filter((user) => user._id === id)[0]);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (userError) {
      //i'll be handling this in a better way
      toast.error(userErrorMessage, toastifyConfig);
    }
    if (userSuccess || userSuccessMessage) {
      toast.success(userSuccessMessage, toastifyConfig);
      console.log("Run once");
    }
    dispatch(reset());
    console.log("after dispatching");
  }, [userError, userSuccess, userSuccessMessage, userErrorMessage, dispatch]);

  console.log(user);
  console.log(users);
  console.log(id);
  console.log(singleUser);

  if (loading) {
    return <OverlayLoaderComponent />;
  }
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white dark:bg-slate-800 py-10 px-4 ">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700 font-bold text-2xl dark:text-white">
            {user?.name}
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
                        onClick={setShowModal(true)}
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
                        Delete {user?.name}
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {/* details div */}
        <UserDetails
          balance={user.approvedBalance}
          invFunds={user.investedFundsAndReturns}
          profit={user.investedFundsAndReturns - user.totalDeposit}
        />

        {/* user information */}
        <UserInfo
          email={user.email}
          name={user.name}
          number={user.number}
          registered={user.createdAt}
          username={user.username}
        />
      </div>
      {showModal && <FundingModal closeModal={closeModal} />}
    </>
  );
}

export default User;
