import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
function WalletDetails({
  selected,
  amount,
  receipt,
  setReceipt,
  handleDeposit,
}) {
  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(selected.walletAddress);
      alert("copied to clipboard");
    } catch (error) {
      alert("unable to copy to clipb");
    }
  };
  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };
  console.log(receipt);

  return (
    <div className="col-span-4 md:col-span-3 py-3 px-5">
      <div className="w-full bg-orange-300 rounded-2xl p-2 flex space-x-2 items-center font-montserrat">
        <div className="bg-orange-500 text-white font-bold text-xs rounded-2xl px-2">
          Your payment method
        </div>
        <p className="uppercase text-lg text-white">{selected.name}</p>
      </div>
      <div className="py-4">
        <p className="text-xl text-gray-700  dark:text-white font-montserrat ">
          You are to make payment of{" "}
          <span className="font-bold">${amount} </span> using your selected
          payment method.
        </p>
        <div className="py-3">
          <img
            src={selected.logo}
            alt={selected.name}
            className="h-[200px] w-[200px]"
          />
        </div>
        {/* wallet address */}
        <div>
          <p className="font-montserrat text-xl text-gray-700  dark:text-white capitalize font-bold">
            {selected.name} address:
          </p>
          <div className="relative border border-gray-500 dark:border-white rounded-md ">
            <input
              readOnly
              type="text"
              className="w-full border-none outline-none p-3 text-gray-500"
              value={selected.walletAddress}
            />
            <div
              onClick={copyWalletAddress}
              className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            >
              <ClipboardDocumentIcon className="w-7 h-7" />
            </div>
          </div>
          <span className="font-montserrat uppercase text-gray-500">
            <span className="font-semibold capitalize"> Network type : </span>
            {selected.network}
          </span>
        </div>

        {/* payment proof inpaut */}
        <div className="my-4 font-montserrat ">
          <p className="text-lg text-gray-500 dark:text-white py-2">
            Upload payment proof after payment
          </p>
          <div className="py-2">
            <input
              onChange={handleFileChange}
              accept="image/*"
              type="file"
              name="receipt"
              className="w-full border border-gray-500 outline-none rounded-md  p-2 text-gray-500 dark:text-white dark:bg-slate-900 dark:border-white"
            />
          </div>
        </div>
        {/* submit button */}
        <div className="my-4 ">
          <button
            onClick={handleDeposit}
            disabled={receipt ? false : true}
            className={`${
              receipt ? "bg-orange-500 cursor-pointer" : "bg-gray-500"
            }  text-white w-full px-2 py-3 rounded-r-md rounded-tl-md `}
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletDetails;
