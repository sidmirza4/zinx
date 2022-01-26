import { useState, useEffect } from "react";

import { ThemeButton } from ".";

export const Navbar = () => {
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
  const onClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="dark:bg-blue bg-white shadow-xl md:p-5 p-4">
      <ul className="flex justify-between items-center">
        <li className="flex items-center">
          <img
            className="h-8"
            src={`/logo-${darkMode ? "dark" : "light"}.svg`}
            alt="Zinx Logo"
          />
          <p className="ml-2 text-2xl font-bold tracking-wider">Zinx</p>
        </li>
        <div className="flex">
          <li className="mr-4">All Photos</li>
          <li className="mr-4">Connect Wallet</li>
          <li>
            <ThemeButton onClick={onClick} darkMode={darkMode} />
          </li>
        </div>
      </ul>
    </nav>
  );
};
