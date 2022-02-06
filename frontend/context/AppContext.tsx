import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Contract, ethers } from "ethers";

import contractAddress from "../contracts/contract-address.json";
import ZinxArtifact from "../contracts/Zinx.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface IAppContext {
  connectWallet: () => void;
  modals: { noMetaMask: boolean };
  setModals: any;
  selectedAccount: string | null;
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<IAppContext>({
  connectWallet: () => {},
  setModals: () => {},
  modals: { noMetaMask: false },
  selectedAccount: null,
  toggleDarkMode: () => {},
});

const AppContextProvider: React.FC = (props) => {
  const [zinx, setZinx] = useState<Contract | null>(null);
  const [modals, setModals] = useState({
    noMetaMask: false,
    uploadPhotoModal: false,
  });
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  // intializing ethers
  const _initializeEthers = async () => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);

    const _zinx = new ethers.Contract(
      contractAddress.Zinx,
      ZinxArtifact.abi,
      _provider.getSigner(0)
    );

    setZinx(_zinx);
  };

  // initialize app
  useEffect(() => {
    if (window.ethereum) {
      // setting up a listener on account changed
      window.ethereum.on("accountsChanged", (accounts: any) => {
        if ((accounts as string[]) && accounts[0]) {
          setSelectedAccount(accounts[0]);
        }
      });
      _initializeEthers();
    }

    _setTheme();
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

  // get and set theme
  const _setTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      window.document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  // toggling the darkmode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      setModals((prev) => ({ ...prev, noMetaMask: true }));
      return;
    }

    const [selectedAccount] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (selectedAccount) {
      setSelectedAccount(selectedAccount);
      localStorage.setItem("account", selectedAccount);
      toast.success(<p className=" dark:text-darkBlue">Wallet Connected</p>);
    }
  };

  const value = {
    connectWallet,
    modals,
    setModals,
    selectedAccount,
    toggleDarkMode,
    darkMode,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
