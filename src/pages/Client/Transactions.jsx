import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ClientDepositTable from "../../components/Client/ClientDepositTable";
import ClientWithdrawalTable from "../../components/Client/ClientWithdrawalTable";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  getIndividualDepositHistory,
  reset,
} from "../../features/deposits/depositSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Transactions() {
  const dispatch = useDispatch();
  const {
    depositIsLoading,
    depositIsSuccess,
    allDeposits,
    depositIsError,
    depositErrorMessage,
  } = useSelector((state) => state.deposit);
  console.log(allDeposits);
  useEffect(() => {
    //i have to make my api call to my backend here
    dispatch(getIndividualDepositHistory());
  }, []);
  //the goal is to have a deposit and withdrawal tab
  //the deposit tab should contain a deposits table and the withdrawal tab should contain a withdrawal table

  console.log(depositIsLoading);
  console.log(allDeposits);

  if (depositIsLoading) {
    return <OverlayLoaderComponent />;
  }

  return (
    <div>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Transaction Records
      </h1>
      <div className="grid  bg-white min-h-[256px] shadow-sm dark:bg-slate-800  mb-16">
        <div className="w-full    px-2 py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-4 rounded-xl bg-blue-900/20 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 dark:text-white",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-orange-300 shadow text-gray-700 dark:text-white"
                      : " hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Deposits
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 dark:text-white",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-orange-100  shadow text-gray-700 dark:text-white"
                      : " hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Transactions
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel>
                {allDeposits && (
                  <ClientDepositTable allDeposits={allDeposits} />
                )}
              </Tab.Panel>
              <Tab.Panel>Withdrawal table</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
