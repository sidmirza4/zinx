import React from "react";

const ConnectedChip = () => {
  return (
    <div className="rounded-full border-2 border-green-600 flex items-center justify-between p-1.5 px-3">
      <p className="text-sm font-semibold text-white mr-4">Connected</p>
      <span className="block h-2 w-2 rounded-full bg-green-600"></span>
    </div>
  );
};

export default ConnectedChip;
