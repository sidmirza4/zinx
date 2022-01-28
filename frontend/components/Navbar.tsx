import Link from "next/link";

import { ThemeButton, Button } from ".";
import { useAppContext } from "../context/AppContext";
import ConnectedChip from "./ConnectedChip";

export const Navbar = () => {
  const { darkMode, walletConnected } = useAppContext();

  return (
    <nav className="dark:bg-blue bg-white shadow-lg md:p-5 md:px-10 p-4">
      <ul className="flex justify-between items-center">
        {/* LOGO */}
        <li className="flex items-center">
          <img
            className="h-8"
            src={`/logo-${darkMode ? "dark" : "light"}.svg`}
            alt="Zinx Logo"
          />
          <p className="ml-2 text-2xl font-bold tracking-wider">Zinx</p>
        </li>

        <div className="flex">
          <li className="hover:underline md:mr-10 mr-4 font-semibold self-center">
            <Link href="/">All Photos</Link>
          </li>
          <li className="md:mr-10 mr-6 self-center">
            {walletConnected ? (
              <ConnectedChip />
            ) : (
              <Button size="sm" disableElevation white={darkMode}>
                Connect Wallet
              </Button>
            )}
          </li>
          <li className="mt-1 self-center">
            <ThemeButton />
          </li>
        </div>
      </ul>
    </nav>
  );
};
