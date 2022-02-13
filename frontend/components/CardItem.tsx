import React from "react";
import { Button } from ".";

export const CardItem: React.FC<{ photo: any }> = ({ photo }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {/* IMAGE */}
      <img
        className="rounded-t-lg"
        src={`https://ipfs.io/ipfs/${photo.photoHash}`}
        alt={`upload by ${photo.authorName}`}
      />

      <div className="p-5">
        <h5 className="mb-1 text-2xl font-bold tracking-tight">
          <span className="text-base">by</span> {photo.authorName}
        </h5>

        {/* UPLOADER ADDRESS */}
        <p className="text-[12px]">{photo.authorAddress}</p>

        <p className="my-3 font-normal">{photo.auhtorAddress}</p>

        {/* DONATE BUTTON */}
        <Button>Donate</Button>
      </div>
    </div>
  );
};
