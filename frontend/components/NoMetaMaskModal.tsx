import React from "react";
import { Backdrop, Modal } from ".";

import classNames from "classnames";
import { useAppContext } from "../context/AppContext";

export const NoMetaMaskModal = () => {
  const { modals, setModals } = useAppContext();

  return (
    <div
      className={classNames({
        "hidden z-50": !modals.noMetaMask,
      })}
    >
      <Backdrop
        onClick={() =>
          setModals((prev: any) => ({ ...prev, noMetaMask: false }))
        }
      />
      <Modal title="Please install metamask">
        <h1 className="text-darkBlue dark:text-darkBlue">
          You have to install metamask to connect your wallet
        </h1>
      </Modal>
    </div>
  );
};
