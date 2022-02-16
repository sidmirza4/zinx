import React from "react";

import { Container, CardItem, CardSkeleton } from ".";
import { useAppContext } from "../context/AppContext";

const AllPhotos = () => {
  const { allPhotos, isMetamaskInstalled } = useAppContext();

  return (
    <div className="lg:w-5/6 m-[0_auto] my-12 p-8">
      <h2 className="font-bold mb-6 text-3xl">All Photos</h2>
      <div className="flex flex-row flex-wrap -ml-4">
        {isMetamaskInstalled ? (
          <>
            {!allPhotos.length ? (
              [0, 1, 2].map((e) => (
                <div
                  key={e}
                  className="p-4 basis-full lg:basis-1/3 md:basis-1/2"
                >
                  <CardSkeleton />
                </div>
              ))
            ) : (
              <>
                {allPhotos.map((p: any) => {
                  return (
                    <div
                      key={p.photoHash}
                      className="p-4 basis-full lg:basis-1/3 md:basis-1/2"
                    >
                      <CardItem key={p.photoHash} photo={p} />
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <p className="ml-4">
            This application needs metmask to run, please install it (You do not
            have connect your wallet to see the photos)
          </p>
        )}
      </div>
    </div>
  );
};

export default AllPhotos;
