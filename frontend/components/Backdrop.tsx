import React from "react";

import classNames from "classnames";

export const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames({
        "bg-darkBlue opacity-95 h-full w-full absolute z-50": true,
        // hidden: !active,
      })}
    ></div>
  );
};
