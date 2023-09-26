import {
  ArrowDownTrayIcon,
  LockClosedIcon,
  UsersIcon,
  CircleStackIcon,
  ArrowUpTrayIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";
import ContentWrapper from "../ContentWrapper";

//we can make an array of objects instead and loop through to return the widgets=> if that makes sense
function AdminDashboardHome() {
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white">
        Dashboard
      </h1>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <ContentWrapper
          icon={<ArrowDownTrayIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-green-400"}
          number={23000}
          text={"Total Deposits"}
          isMoney
        />
        <ContentWrapper
          icon={<LockClosedIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-blue-500"}
          number={20000}
          text={"Pending Deposits"}
          isMoney
        />

        <ContentWrapper
          icon={<UsersIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-red-500"}
          number={34}
          text={"Total Users"}
        />
        <ContentWrapper
          icon={<CircleStackIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-orange-500"}
          number={3}
          text={"Investment Plans"}
        />
        <ContentWrapper
          icon={<ArrowUpTrayIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-sky-900"}
          number={3000}
          text={"Pending Withdrawals"}
          isMoney
        />
        <ContentWrapper
          icon={<BanknotesIcon className="text-white h-10 w-10" />}
          iconBgColor={"bg-purple-500"}
          number={5000}
          text={"Total Withdrawals"}
          isMoney
        />
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm dark:bg-slate-800"></div>
    </>
  );
}

export default AdminDashboardHome;
