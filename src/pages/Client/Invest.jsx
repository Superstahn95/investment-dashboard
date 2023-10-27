import { useEffect, useState } from "react";
import { investmentPlans } from "../../assets/data";
import PlanSelection from "../../components/Client/PlanSelection";
import PlanDetails from "../../components/Client/PlanDetails";
import { useSelector, useDispatch } from "react-redux";
import toastifyConfig from "../../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import {
  reset,
  getPlans,
  subscribeToPlan,
} from "../../features/plan/planSlice";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";

function Invest() {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const dispatch = useDispatch();
  const {
    plans,
    planIsLoading,
    planIsError,
    planIsSuccess,
    planErrorMessage,
    planSuccessMessage,
  } = useSelector((state) => state.plan);
  //   const [plans, setPlans] = useState([]);
  //the below is setting plan to the first plan in our fetched array of plans
  const [plan, setPlan] = useState("");

  useEffect(() => {
    //this should be making an api call to my backend to get all created plans and then held in state
    // setPlans(investmentPlans);
    if (!plans && !planIsLoading && !planIsSuccess) {
      dispatch(getPlans());
    }
    if (plans && plans.length > 0 && !plan) {
      setPlan(plans[0]._id);
    }

    if (planIsSuccess) {
      dispatch(reset());
    }
  }, [dispatch, plans, plan, planIsLoading, planIsSuccess]);

  useEffect(() => {
    if (planSuccessMessage) {
      toast.success(planSuccessMessage, toastifyConfig);
    }
  }, [dispatch, planSuccessMessage]);

  //   if (planIsLoading) {
  //     return <OverlayLoaderComponent />;
  //   }
  const handleInvestmentClick = () => {
    const planObject = { planId: plan, amount: investmentAmount };
    console.log(planObject);
    dispatch(subscribeToPlan(planObject));
  };

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Get started with your investment
      </h1>
      {plans && (
        <div className="grid grid-cols-4 gap-2 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
          <PlanSelection
            plans={plans}
            investmentAmount={investmentAmount}
            setInvestmentAmount={setInvestmentAmount}
            plan={plan}
            setPlan={setPlan}
          />

          <div className=" col-span-4 md:col-span-1  mt-5 text-gray-700  dark:text-white font-montserrat">
            <PlanDetails
              selectedPlan={plan}
              plans={plans}
              amount={investmentAmount}
              handleInvesmentClick={handleInvestmentClick}
            />
          </div>
        </div>
      )}
      {planIsLoading && <OverlayLoaderComponent />}
      <ToastContainer />
    </>
  );
}

export default Invest;
