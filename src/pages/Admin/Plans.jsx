import { PlusIcon } from "@heroicons/react/24/solid";
import PlanCard from "../../components/PlanCard";
import { investmentPlans } from "../../assets/data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Plans() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    setPlans(investmentPlans);
  }, []);

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-5 font-bold dark:text-white">
        System Plans
      </h1>
      <div className="flex items-center justify-between  my-2">
        <Link
          to={"create-plan"}
          className="p-3 text-white font-bold bg-orange-500 flex items-center space-x-1 rounded-r-md rounded-tl-md"
        >
          <PlusIcon className="h-4 w-4" />
          New Plan
        </Link>
      </div>
      {/* plans div */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </>
  );
}

export default Plans;
