import React from "react";
import classNames from "classnames";

import { useAppContext } from "../context/AppContext";
import { Modal, Backdrop } from ".";

export const DonateModal = () => {
  const { modals, setModals } = useAppContext();

  return (
    <div
      className={classNames({
        "hidden z-50": !modals.donateModal,
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
