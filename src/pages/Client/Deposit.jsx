import { useEffect, useState } from "react";
import DepositForm from "../../components/Client/DepositForm";
import { paymentMethods } from "../../assets/data";
import WalletDetails from "../../components/Client/WalletDetails";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeDeposit, reset } from "../../features/deposits/depositSlice";
import OverlayLoaderComponent from "../../components/OverlayLoaderComponent";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../utils/toastify";

function Deposit() {
  const [amount, setAmount] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [selected, setSelected] = useState(paymentMethods[0]);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const dispatch = useDispatch();
  const {
    depositIsLoading,
    depositIsSuccess,
    depositIsError,
    depositSuccessMessage,
    depositErrorMessage,
  } = useSelector((state) => state.deposit);
  const handleDeposit = () => {
    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("amount", amount);
    dispatch(makeDeposit(formData));
  };
  const proceedToPayment = () => {
    if (amount && selected) {
      setShowWalletDetails(true);
    } else {
      alert("Enter an amount");
    }
  };
  useEffect(() => {
    if (depositIsError) {
      //i'll be handling this in a better way
      toast.error(depositErrorMessage, toastifyConfig);
    }
    if (depositIsSuccess || depositSuccessMessage) {
      toast.success(depositSuccessMessage, toastifyConfig);
    }
    dispatch(reset());
  }, [
    depositIsError,
    depositIsSuccess,
    depositSuccessMessage,
    depositErrorMessage,
  ]);
  console.log(showWalletDetails, amount, selected);
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Fund your account balance
      </h1>
      {/* form content or something like that */}
      <div className="grid grid-cols-4 gap-2 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
        {showWalletDetails ? (
          <WalletDetails
            selected={selected}
            amount={amount}
            receipt={receipt}
            setReceipt={setReceipt}
            handleDeposit={handleDeposit}
          />
        ) : (
          <DepositForm
            amount={amount}
            setAmount={setAmount}
            paymentMethods={paymentMethods}
            proceedToPayment={proceedToPayment}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <div className=" col-span-4 md:col-span-1  mt-5 text-gray-700  dark:text-white">
          <div className="border border-gray-500 dark:border-white rounded-md">
            <div className="flex  border-b border-gray-500 dark:border-white p-4">
              <p className="flex-1 font-semibold">Total deposit</p>
              <div className="flex-1">
                <p className="font-semibold ">$0.00</p>
                <span className="text-sm text-gray-500">Amount</span>
              </div>
            </div>
            <div className="p-4 ">
              <Link className="text-sm text-gray-500" to={""}>
                View deposit history
              </Link>
            </div>
          </div>
        </div>
      </div>
      {depositIsLoading && <OverlayLoaderComponent />}
      <ToastContainer />
    </>
  );
}

export default Deposit;
