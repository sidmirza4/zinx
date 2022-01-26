import { createContext, useContext, useState, useEffect } from "react";

interface IAppContext {
  walletConnected: boolean;
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<IAppContext>({
  walletConnected: false,
  toggleDarkMode: () => {},
});

const AppContextProvider: React.FC = (props) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  // setting the dark mode if already available in localstorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      window.document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // toggling the darkmode
  useEffect(() => {
    if (darkMode) {
      window.document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      window.document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // toggling the darkmode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const value = {
    walletConnected,
    toggleDarkMode,
    darkMode,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
