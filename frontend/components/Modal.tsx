import React from "react";

import classNames from "classnames";

export const Modal: React.FC<{ title: string }> = ({ title, ...props }) => {
  return (
    <>
      <div
        className={classNames({
          "bg-gray-100 rounded-2xl absolute sm:w-3/4 w-full lg:w-1/2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 flex flex-col items-center animate-fade z-50":
            true,
          // hidden: !open,
        })}
      >
        <h1 className="text-darkBlue dark:text-darkBlue text-3xl font-bold mb-5">
          {title}
        </h1>
        <div className="w-full">{props.children}</div>
      </div>
    </>
  );
};
