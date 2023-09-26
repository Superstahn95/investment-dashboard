import { Link } from "react-router-dom";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";

function PlanCard({ plan }) {
  const {
    id,
    name,
    minimumPrice,
    maximumPrice,
    topUpInterval,
    duration,
    giftBonus,
  } = plan;
  return (
    <div className="bg-white text-gray-700 py-4 px-6 rounded-md shadow-md dark:bg-slate-800 dark:text-white">
      <h2 className="text-2xl py-3 uppercase">{name}</h2>
      <p className="text-center  text-orange-500">
        $<span className="text-5xl ">{minimumPrice}</span>
      </p>
      <div className="mt-6 ">
        <div className="flex items-center justify-between mb-2">
          <p>Minimum Possible Deposit</p>
          <p>{minimumPrice}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <p>Maximum Possible Deposit</p>
        <p>{maximumPrice}</p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <p>Top up interval</p>
        <p className="capitalize">{topUpInterval}</p>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p>Gift Bonus</p>
        <p className="capitalize">${giftBonus}</p>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p>Duration</p>
        <p className="capitalize">{duration} days</p>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Link
          to={`/plans/${id}`}
          className="rounded-r-md rounded-tl-md p-3 font-bold bg-blue-500"
        >
          <PencilIcon className="h-4 w-4 text-white" />
        </Link>
        <Link className="rounded-r-md rounded-tl-md p-3 font-bold bg-red-500">
          <XMarkIcon className="h-4 w-4 text-white " />
        </Link>
      </div>
    </div>
  );
}

export default PlanCard;
