import { Link } from "react-router-dom";
import PlanForm from "../../components/Admin/PlanForm";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function CreatePlan() {
  const handleSubmit = (formData) => {
    console.log("form has been submitted", formData);
  };
  const initialValues = {
    name: "",
    minimumPrice: "",
    maximumPrice: "",
    duration: "",
    topUpInterval: "",
    giftBonus: "",
  };
  return (
    <>
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-gray-700 text-3xl  font-bold dark:text-white">
          Add Investment plan
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
        <PlanForm onSubmit={handleSubmit} initialData={initialValues} />
      </div>
    </>
  );
}

export default CreatePlan;
