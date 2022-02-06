import React from "react";
import { useField } from "formik";

export const Input: React.FC<{
  id?: string;
  label: string;
  name: string;
  placeholder: string;
}> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className="block font-medium mb-2 text-darkBlue"
      >
        {label}
      </label>
      <div className="my-1 flex rounded-md shadow-sm">
        <input
          className="block focus:border-blue outline-none w-full rounded-lg p-3 px-4 rounded-r-md sm:text-sm border-gray-300 border-2 dark:text-darkBlue"
          type="text"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <span className="text-sm text-red-500 dark:text-red-500">
          {meta.error}
        </span>
      ) : null}
    </>
  );
};
