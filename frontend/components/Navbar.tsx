import Link from "next/link";

import { ThemeButton, Button } from ".";
import { useAppContext } from "../context/AppContext";
import ConnectedChip from "./ConnectedChip";

export const Navbar = () => {
  const { selectedAccount, connectWallet } = useAppContext();

  return (
    <nav className="bg-blue shadow-lg md:p-5 md:px-10 p-4">
      <ul className="flex justify-between items-center">
        {/* LOGO */}
        <Link href="/">
          <li className="flex items-center cursor-pointer">
            <>
              <img className="h-8" src={`/logo-dark.svg`} alt="Zinx Logo" />
              <p className="ml-2 text-2xl font-bold tracking-wider text-white">
                Zinx
              </p>
            </>
          </li>
        </Link>

        <div className="flex">
          <li className="hover:underline md:mr-10 mr-4 font-semibold self-center text-white">
            <Link href="/">All Photos</Link>
          </li>
          <li className="hover:underline md:mr-10 mr-4 font-semibold self-center text-white">
            <Link href="/upload">Upload Photo</Link>
          </li>
          <li className="md:mr-10 mr-6 self-center">
            {selectedAccount ? (
              <ConnectedChip />
            ) : (
              <Button size="sm" white disableElevation onClick={connectWallet}>
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
