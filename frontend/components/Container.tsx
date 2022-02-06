import React from "react";

export const Container: React.FC = (props) => {
  return (
    <div className="w-full p-10 mx-auto my-0 xl:w-1/2 lg:w-3/4">
      {props.children}
    </div>
  );
};
