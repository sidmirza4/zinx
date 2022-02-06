import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

export const ThemeButton: React.FC = () => {
  const { toggleDarkMode, darkMode } = useAppContext();

  return (
    <button className="text-white" onClick={toggleDarkMode}>
      {darkMode ? (
        <BsFillSunFill fontSize="1.4rem" />
      ) : (
        <BsFillMoonFill fontSize="1.4rem" />
      )}
    </button>
  );
};
