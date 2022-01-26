import React from "react";

import classnames from "classnames";

export const Button: React.FC<{ outlined?: boolean }> = (props) => {
  const { outlined } = props;

  const className = classnames(
    "text-white font-medium bg-blue p-2 px-4 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg active:shadow-none active:translate-y-0",
    { ["bg-transparent text-blue border-2 border-blue"]: outlined }
  );

  return <button className={`${className}`}>{props.children}</button>;
};
