import ContentWrapper from "../ContentWrapper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

function ClientDashboardHome() {
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  console.log(user);
  console.log(isSuccess);
  const widgets = [
    {
      title: "Account Balance",
      amount: user?.approvedBalance,
      icon: <CurrencyDollarIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-orange-500",
    },
    {
      title: "Total Profit",
      amount: 0,
      icon: <BanknotesIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-green-400",
    },
    {
      title: "Total Deposit",
      amount: user?.totalDeposit,
      icon: <ArrowDownIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Total Withdrawal",
      amount: 0,
      icon: <ArrowUpIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-yellow-400",
    },
    {
      title: "Bonus",
      amount: 0,
      icon: <ArrowUpIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-yellow-400",
    },
    {
      title: "Inv. Funds And Returns",
      amount: user?.investedFundsAndReturns,
      icon: <CreditCardIcon className="text-white h-10 w-10" />,
      iconBgColor: "bg-purple-500",
    },
  ];
  return (
    <>
      {/* this user should be replaced with the name of the logged in user */}
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white">
        {/* was user before */}
        Welcome {user?.name}
      </h1>
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
        Account Summary
      </h2>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        {widgets.map((widget) => (
          <ContentWrapper
            key={widget.title}
            icon={widget.icon}
            iconBgColor={widget.iconBgColor}
            number={widget.amount}
            text={widget.title}
            isMoney
          />
        ))}
      </div>
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
        Active Plans
      </h2>
      {/* Existing plan div */}
      <div className="grid  bg-white h-64 shadow-sm dark:bg-slate-800  mb-16">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="dark:text-white">
            You do not have an active investment plan
          </p>
          <Link className="bg-orange-500 text-white font-bold px-3 py-2 rounded-md ">
            Buy a plan
          </Link>
        </div>
      </div>
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
        Recent Transactions(0)
      </h2>
      {/* transactions table to be dynamically rendered when i incorporate my backend */}
      <div className="grid col-1 bg-white h-64 shadow-sm dark:bg-slate-800  p-4">
        <div className="flex flex-col">
          <Link className="self-end dark:text-orange-500 uppercase text-lg flex items-center space-x-2">
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-700 dark:text-orange-500 " />
            View all transactions
          </Link>
          <table className="dark:text-white  rounded-md text-gray-500">
            <thead className="bg-gray-200 dark:bg-slate-900">
              <tr>
                <th className="p-2">Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>No records yet</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ClientDashboardHome;
