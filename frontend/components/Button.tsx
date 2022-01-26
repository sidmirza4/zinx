import React from "react";

import classnames from "classnames";

export const Button: React.FC<{
  outlined?: boolean;
  white?: boolean;
  disableElevation?: boolean;
  size?: "sm" | "md" | "lg";
}> = (props) => {
  const { outlined, white, disableElevation, size } = props;

  const className = classnames(
    "text-white font-medium bg-blue p-2 px-4 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg active:shadow-none active:translate-y-0",
    { ["bg-white dark:text-darkBlue color-darkBlue"]: white },
    { ["bg-transparent text-blue border-2 border-blue"]: outlined },
    { "shadow-none hover:shadow-none": disableElevation },
    { "p-1.5 px-3 text-sm": size === "sm" }
  );

  return <button className={`${className}`}>{props.children}</button>;
};
