import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Contract, ethers, BigNumber } from "ethers";

import contractAddress from "../contracts/contract-address.json";
import ZinxArtifact from "../contracts/Zinx.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface IAppContext {
  allPhotos: any[];
  zinx: Contract | null;
  connectWallet: () => void;
  modals: { noMetaMask: boolean };
  setModals: any;
  selectedAccount: string | null;
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<IAppContext>({
  allPhotos: [],
  zinx: null,
  connectWallet: () => {},
  setModals: () => {},
  modals: { noMetaMask: false },
  selectedAccount: null,
  toggleDarkMode: () => {},
});

const AppContextProvider: React.FC = (props) => {
  const [allPhotos, setAllPhotos] = useState<any>([]);
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

  // get all photos
  const _getAllPhotos = async (zinx: Contract) => {
    const photos = [];

    try {
      const _photoCount = await zinx.photoCount();
      const photoCount = parseInt(_photoCount._hex);

      // get all the photos from contract
      for (let i = 1; i <= photoCount; i++) {
        const photo = await zinx.photos(i);
        photos.push(photo);
      }

      // structure those photos according to the front-end
      const structuredPhotos = photos.reverse().map((p: any) => {
        return {
          authorAddress: p.author,
          authorName: p.authorName,
          description: p.description,
          photoHash: p.photoHash,
          totalDonation: parseFloat(p.totalDonation._hex),
        };
      });

      setAllPhotos(structuredPhotos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (!zinx) return;
      _getAllPhotos(zinx);
    }, 10000);
  }, [zinx]);

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
    allPhotos,
    zinx,
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
