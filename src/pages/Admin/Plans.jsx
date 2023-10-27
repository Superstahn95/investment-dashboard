import { PlusIcon } from "@heroicons/react/24/solid";
import PlanCard from "../../components/PlanCard";
import { investmentPlans } from "../../assets/data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, getPlans, deletePlan } from "../../features/plan/planSlice";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";

function Plans() {
  const dispatch = useDispatch();
  const { planIsLoading, plans } = useSelector((state) => state.plan);
  const handleDelete = (id) => {
    dispatch(deletePlan(id));
  };

  //i want to dispatch an action to get all plans when i run this
  useEffect(() => {
    // setPlans(investmentPlans);
    dispatch(getPlans()).then(() => {
      dispatch(reset());
    });
    // return () => {

    // };
  }, [dispatch]);
  console.log(plans);

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-5 font-bold dark:text-white font-montserrat">
        System Plans
      </h1>
      <div className="flex items-center justify-between  my-2">
        <Link
          to={"create-plan"}
          className="p-3 text-white font-bold bg-orange-500 flex items-center space-x-1 rounded-r-md rounded-tl-md font-montserrat"
        >
          <PlusIcon className="h-4 w-4" />
          New Plan
        </Link>
      </div>
      {/* plans div */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans?.map((plan) => (
          <PlanCard key={plan._id} plan={plan} handleDelete={handleDelete} />
        ))}
      </div>
      {planIsLoading && <OverlayLoaderComponent />}
    </>
  );
}

export default Plans;
