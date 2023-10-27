import React from "react";

function PlanSelection({
  plans,
  plan,
  setPlan,
  investmentAmount,
  setInvestmentAmount,
}) {
  console.log(plan);
  console.log(plans);
  const quickAmounts = [300, 500, 1000, 1500, 2000];
  const handleClick = (number) => {
    setInvestmentAmount(number);
  };
  return (
    <div className="col-span-4 md:col-span-3 p-3">
      {/* seek to replace with formik later */}
      <form className="border border-gray-500 dark:border-white rounded-md p-4">
        <div className="mb-7">
          {/* value of this is going to be the id of the plan bcecause that is what we will be sending to the backend */}
          <select
            name="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-14">
          <p className="dark:text-white">Choose Quick Amount to Invest</p>
          <div className="my-2 flex items-center space-x-4">
            {quickAmounts.map((amount) => (
              <div
                onClick={() => handleClick(amount)}
                key={amount}
                className={`${
                  amount === investmentAmount ? "bg-orange-500" : "bg-slate-200"
                } flex items-center justify-center px-4 py-3 rounded-md cursor-pointer`}
              >
                ${amount}
              </div>
            ))}
          </div>
          <div className="mt-14">
            <p className="dark:text-white">Or Enter Your Amount</p>
            <div className="my-4">
              <input
                type="number"
                placeholder="Enter Amount"
                className="border border-gray-500 outline-none rounded-md w-full p-2 dark:text-white dark:bg-slate-900 dark:border-white"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-14">
            <p className="dark:text-white">Payment Method</p>
            <p className="text-xs text-gray-700 dark:text-white">
              Money to be debited from your account balance
            </p>
            <div className="my-4">
              <input
                type="text"
                readOnly
                className="border border-gray-500 outline-none rounded-md w-full p-2 dark:text-white dark:bg-slate-900 dark:border-white"
                value="Account Balance"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlanSelection;
