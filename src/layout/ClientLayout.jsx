import React, { useEffect, useState, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import {
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  SunIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CircleStackIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";

function ClientLayout() {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }
  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  const clientLinks = [
    { link: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, to: "/" },
    {
      link: "Deposit",
      icon: <ArrowDownTrayIcon className="h-5 w-5" />,
      to: "/deposit",
    },
    {
      link: "Withdraw",
      icon: <ArrowUpTrayIcon className="h-5 w-5" />,
      to: "/withdrawal",
    },
    {
      link: "Invest Funds",
      icon: <CircleStackIcon className="h-5 w-5" />,
      to: "/buy-plan",
    },
    {
      link: "Transactions",
      icon: <CreditCardIcon className="h-5 w-5" />,
      to: "/transactions",
    },
    {
      link: "Profile",
      icon: <IdentificationIcon className="h-5 w-5" />,
      to: "/profile",
    },
  ];
  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-900 pb-10">
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} navigationLinks={clientLinks} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ClientLayout;
