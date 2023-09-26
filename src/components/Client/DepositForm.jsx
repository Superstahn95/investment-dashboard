import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function DepositForm({
  amount,
  setAmount,
  paymentMethods,
  proceedToPayment,
  selected,
  setSelected,
}) {
  return (
    <div className="col-span-4 md:col-span-3 p-3">
      <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
        Enter Amount
      </h2>
      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          className="border border-gray-500 outline-none rounded-md w-full p-2 dark:text-white dark:bg-slate-900 dark:border-white"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="w-full  py-4">
        <div className="mx-auto ">
          <h2 className="text-gray-700 text-xl mb-4 font-bold dark:text-white">
            Choose Payment Method from the list below
          </h2>
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className=" sr-only">
              Payment method
            </RadioGroup.Label>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <RadioGroup.Option
                  key={method.name}
                  value={method}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white  ring-opacity-60 ring-offset-2 ring-offset-orange-300"
                        : ""
                    }
                  ${
                    checked
                      ? "bg-orange-500 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="div"
                              className={`flex items-center space-x-2 font-medium  uppercase ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              <img
                                src={method.logo}
                                alt={method.name}
                                className="w-[50px] h-[50px]"
                              />
                              <p>{method.name}</p>
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className={`ml-14 capitalize ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              <p>{method.speed}</p>
                              <p>{method.gasFee}</p>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckCircleIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="my-4">
        <button
          onClick={proceedToPayment}
          className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default DepositForm;
