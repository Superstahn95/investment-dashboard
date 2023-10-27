import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { investmentPlans } from "../../assets/data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import PlanForm from "../../components/Admin/PlanForm";
import { useSelector, useDispatch } from "react-redux";
import { reset, updatePlan, getPlan } from "../../features/plan/planSlice";
import { toast, ToastContainer } from "react-toastify";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";

import toastifyConfig from "../../utils/toastify";

function UpdatePlan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const {
    plans,
    singlePlan,
    planIsError,
    planIsSuccess,
    planSuccessMessage,
    planErrorMessage,
    planIsLoading,
  } = useSelector((state) => state.plan);

  const [plan, setPlan] = useState(null);
  //ideally we would be getting our plan by making an api call to our backend for that plan with the id
  //filter the plans array and pass it into the plan form
  useEffect(() => {
    if (!plans) {
      // we want to dispatch an action to get a plan with that id
      dispatch(getPlan());
      setPlan(singlePlan);
    } else {
      setPlan(plans.filter((plan) => plan._id === id)[0]);
    }
  }, []);
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

  const handleSubmit = (formData) => {
    dispatch(updatePlan({ id, planObject: { ...formData } }));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-16 font-montserrat">
        <h1 className="text-gray-700 text-3xl  font-bold dark:text-white">
          Update Plan
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
        {plan !== null && (
          <PlanForm initialData={plan} onSubmit={handleSubmit} />
        )}
      </div>
      <ToastContainer />
      {planIsLoading && <OverlayLoaderComponent />}
    </>
  );
}

export default UpdatePlan;
