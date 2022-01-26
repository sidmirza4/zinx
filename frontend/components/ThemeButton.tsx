import { useState, useEffect } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export const ThemeButton: React.FC<{
  onClick: () => void;
  darkMode?: boolean;
}> = ({ onClick, darkMode }) => {
  return (
    <button onClick={onClick}>
      {darkMode ? (
        <BsFillSunFill fontSize="1.6rem" />
      ) : (
        <BsFillMoonFill fontSize="1.6rem" />
      )}
    </button>
  );
};
