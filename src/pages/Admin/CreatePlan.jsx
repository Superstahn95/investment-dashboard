import { Link } from "react-router-dom";
import PlanForm from "../../components/Admin/PlanForm";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { createPlan, reset } from "../../features/plan/planSlice";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../utils/toastify";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";
import { useEffect } from "react";

function CreatePlan() {
  const dispatch = useDispatch();
  const {
    planIsSuccess,
    planIsLoading,
    planIsError,
    planSuccessMessage,
    planErrorMessage,
  } = useSelector((state) => state.plan);
  const handleSubmit = (formData) => {
    console.log("form has been submitted", formData);
    dispatch(createPlan(formData));
  };
  const initialValues = {
    name: "",
    minimumPrice: "",
    maximumPrice: "",
    duration: "",
    topUpInterval: "",
    giftBonus: "",
  };
  console.log(
    planIsSuccess,
    planIsLoading,
    planIsError,
    planSuccessMessage,
    planErrorMessage
  );

  useEffect(() => {
    if (planIsError) {
      //i'll be handling this in a better way
      toast.error(planErrorMessage, toastifyConfig);
    }
    if (planIsSuccess || planSuccessMessage) {
      toast.success(planSuccessMessage, toastifyConfig);
      console.log("Run once");
    }
    dispatch(reset());
    console.log("after dispatching");
  }, [
    planIsError,
    planIsSuccess,
    planSuccessMessage,
    planErrorMessage,
    dispatch,
  ]);

  return (
    <>
      <div className="flex items-center justify-between mb-16 font-montserrat">
        <h1 className="text-gray-700 text-3xl  font-bold dark:text-white">
          Add Investment plan
        </h1>
        <Link
          to={"/dashboard/plans"}
          className="flex  items-center space-x-1 text-white capitalize bg-orange-500 px-3 py-2 rounded-md"
        >
          <ArrowLeftIcon className="h-4 w-4 text-white" />
          back
        </Link>
      </div>

      <div className="shadow-md bg-white dark:bg-slate-800 p-4">
        <PlanForm onSubmit={handleSubmit} initialData={initialValues} />
      </div>
      <ToastContainer />
      {planIsLoading && <OverlayLoaderComponent />}
    </>
  );
}

export default CreatePlan;
