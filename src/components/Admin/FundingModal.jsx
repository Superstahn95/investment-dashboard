import { Formik, Form } from "formik";
import MyTextInput from "../MyTextInput";
import * as Yup from "yup";
import MySelectField from "../MySelectField";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

//send a request to an end point to credit or debit user
function FundingModal({ id, closeModal }) {
  const initialData = {
    id,
    amount: "",
    column: "bonus",
    action: "credit",
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center">
      <div className="bg-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md dark:bg-slate-800">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold dark:text-white">
            Credit/Debit Stanley's Account
          </h2>
          <div
            onClick={closeModal}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 dark:border-white"
          >
            <XMarkIcon className="h-5 w-5 text-gray-700 dark:text-white" />
          </div>
        </div>
        <Formik
          initialValues={initialData}
          validationSchema={Yup.object({
            amount: Yup.number().required("Required"),
            column: Yup.string().required("Required"),
            action: Yup.string().required("Required"),
          })}
        >
          <Form>
            <div className="mt-4">
              <MyTextInput
                name="amount"
                type="number"
                placeholder="Enter amount"
              />
            </div>

            <div className="mt-4 ">
              <MySelectField name="column" label="Select where to Credit/Debit">
                <option value="bonus">Bonus</option>
                <option value="profit">Profit</option>
                <option value="approvedBalance">Approved Balance</option>
                <option value="investedFundsAndReturns">Invested Funds</option>
              </MySelectField>
            </div>

            <div className="mt-4 ">
              <MySelectField name="action" label="Choose action">
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </MySelectField>
            </div>
            <div className="my-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FundingModal;
