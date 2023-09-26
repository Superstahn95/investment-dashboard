import React from "react";

function ContentWrapper({ icon, text, number, iconBgColor, isMoney }) {
  return (
    <div className="rounded bg-white  h-40 shadow-sm space-y-2 p-4 dark:bg-slate-800">
      <div className={`${iconBgColor} rounded-full p-2 w-fit`}>{icon}</div>
      <div>
        <p className="text-gray-400 dark:text-white text-sm">{text}</p>
        <p className="text-3xl text-gray-700 font-bold dark:text-white">
          {isMoney ? `$${number}` : `${number}`}
        </p>
      </div>
    </div>
  );
}

export default ContentWrapper;
