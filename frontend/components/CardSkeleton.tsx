import React from "react";

export const CardSkeleton = () => {
  return (
    <div className="bg-white p-2 sm:p-4 sm:h-64 rounded-lg shadow-md flex flex-col gap-5 select-none dark:bg-gray-800 dark:border-gray-700">
      <div className="h-52 sm:h-full rounded-xl bg-gray-200 animate-pulse"></div>
      <div className="bg-gray-200 w-full animate-pulse h-6 rounded-lg"></div>
      <div className="bg-gray-200 w-full animate-pulse h-6 rounded-lg"></div>
    </div>
  );
};
