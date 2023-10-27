import React from "react";
import { useEffect, useState } from "react";

function PlanDetails({ selectedPlan, plans, amount, handleInvesmentClick }) {
  //when this component mounts, i think we should be fetching the plan with the selected plan value
  //since we have plans in redux store, we can actually filter
  console.log(selectedPlan);
  console.log(plans);
  console.log(amount);
  const [currentPlan, setCurrentPlan] = useState([]);
  const filterPlan = () => {
    console.log("filtering");
    setCurrentPlan(plans.filter((plan) => plan._id === selectedPlan));
  };
  console.log(currentPlan);
  useEffect(() => {
    if (selectedPlan && plans) {
      filterPlan();
    }
  }, [selectedPlan, plans]);
  return (
    <div className="border border-gray-500 dark:border-white rounded-md p-3">
      <h2>Your investment details</h2>
      <div className="grid grid-cols-2 gap-y-7 gap-x-1 my-7">
        <div>
          <p className="text-xs text-gray-700 dark:text-white">Name of plan</p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            {currentPlan[0]?.name}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-700 dark:text-white">
            Top up interval
          </p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            {currentPlan[0]?.topUpInterval}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-700 dark:text-white">Minimum price</p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            ${currentPlan[0]?.minimumPrice}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-700 dark:text-white">Maximum price</p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            ${currentPlan[0]?.maximumPrice}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-700 dark:text-white">Gift Bonus</p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            ${currentPlan[0]?.giftBonus}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-700 dark:text-white">Duration</p>
          <span className=" capitalize text-xs font-bold text-orange-300">
            {currentPlan[0]?.duration}
          </span>
        </div>
      </div>
      {/* Payment method */}
      <div className="border-y  border-gray-500 dark:border-white flex items-center space-x-3 py-3">
        <span className="text-xs text-gray-500 dark:text-white">
          {" "}
          Payment method
        </span>
        <span className="capitalize text-xs font-bold text-orange-300">
          Account Balance
        </span>
      </div>
      {/* amount to invest */}
      <div className="flex items-center justify-between my-4">
        <span className="text-xs text-gray-500 dark:text-white">
          {" "}
          Amount to invest
        </span>
        {amount && (
          <span className="capitalize text-lg  font-bold text-orange-500">
            ${amount}
          </span>
        )}
      </div>
      <div>
        <button
          onClick={handleInvesmentClick}
          className="bg-orange-500 text-white w-full px-2 py-3 rounded-r-md rounded-tl-md"
        >
          Confirm & Invest
        </button>
      </div>
    </div>
  );
}

export default PlanDetails;
