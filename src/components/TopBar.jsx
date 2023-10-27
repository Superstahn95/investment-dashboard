import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  CreditCardIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function TopBar({ showNav, setShowNav }) {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      className={`fixed bg-gray-200 dark:bg-slate-900  w-full h-16 flex justify-between items-center transition-all duruation-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16 flex justify-between items-center w-full ">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer dark:text-white"
          onClick={() => setShowNav(!showNav)}
        />
        <div className="flex space-x-1  items-center pr-4 md:pr-16">
          <div className="flex items-center space-x-2">
            <button onClick={() => setTheme("light")}>
              <SunIcon className="text-sky-600 h-8 w-8 dark:text-white" />
            </button>
            <button onClick={() => setTheme("dark")}>
              <MoonIcon className="text-gray-700 h-8 w-8 dark:text-sky-600" />
            </button>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                <div>
                  <img
                    src="https://images.pexels.com/photos/17392773/pexels-photo-17392773/free-photo-of-fer-vintage.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    className="w-8 h-8 rounded-full md:mr-4 border-2 border-white shadow-sm"
                    alt=""
                  />
                </div>
                <span className="hidden md:block font-medium text-gray-700 dark:text-white ">
                  {user?.name}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      href="#"
                      className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                    <Link
                      href="#"
                      className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Billing
                    </Link>
                  </Menu.Item> */}
                  <Menu.Item>
                    <Link
                      onClick={handleLogout}
                      className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                      Logout
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
