import React from "react";

import classnames from "classnames";
import Link from "next/link";

export const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  outlined?: boolean;
  white?: boolean;
  component?: Element;
  href?: string;
  disabled?: boolean;
  disableElevation?: boolean;
  size?: "sm" | "md" | "lg";
}> = (props) => {
  const {
    outlined,
    white,
    disableElevation,
    size,
    href,
    type = "button",
    disabled = false,
  } = props;

  const className = classnames(
    "text-white font-medium bg-blue p-2 px-4 rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-lg active:shadow-none active:translate-y-0",
    { ["bg-white dark:text-darkBlue color-darkBlue text-darkBlue"]: white },
    { ["bg-transparent text-blue border-2 border-blue"]: outlined },
    { "shadow-none hover:shadow-none": disableElevation },
    { "p-1.5 px-3 text-sm": size === "sm" },
    { "cursor-not-allowed hover:translate-y-0 bg-gray-500": disabled }
  );

  return (
    <button
      onClick={props.onClick}
      className={`${className}`}
      type={type}
      disabled={disabled}
    >
      {href ? <Link href={href}>{props.children}</Link> : props.children}
    </button>
  );
};
