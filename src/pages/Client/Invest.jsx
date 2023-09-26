import { useEffect, useState } from "react";
import { investmentPlans } from "../../assets/data";
import PlanSelection from "../../components/Client/PlanSelection";
import PlanDetails from "../../components/Client/PlanDetails";

function Invest() {
  const [investmentAmount, setInvestmentAmount] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(investmentPlans[0].id);
  useEffect(() => {
    //this should be making an api call to my backend to get all created plans and then held in state
    setPlans(investmentPlans);
  }, []);

  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Get started with your investment
      </h1>
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
          />
        </div>
      </div>
    </>
  );
}

export default Invest;
