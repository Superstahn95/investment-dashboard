import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { investmentPlans } from "../../assets/data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import PlanForm from "../../components/Admin/PlanForm";

function UpdatePlan() {
  const { id } = useParams();

  const [plan, setPlan] = useState(null);
  //ideally we would be getting our plan by making an api call to our backend for that plan with the id
  useEffect(() => {
    setPlan(investmentPlans.filter((plan) => plan.id === parseInt(id))[0]);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-gray-700 text-3xl  font-bold dark:text-white">
          Update Plan
        </h1>
        <Link
          to={"/plans"}
          className="flex  items-center space-x-1 text-white capitalize bg-orange-500 px-3 py-2 rounded-md"
        >
          <ArrowLeftIcon className="h-4 w-4 text-white" />
          back
        </Link>
      </div>

      <div className="shadow-md bg-white dark:bg-slate-600 p-4">
        {plan !== null && <PlanForm initialData={plan} />}
      </div>
    </>
  );
}

export default UpdatePlan;
