import React from "react";

import { Container, CardItem, CardSkeleton } from ".";
import { useAppContext } from "../context/AppContext";

const AllPhotos = () => {
  const { allPhotos } = useAppContext();

  return (
    <div className="lg:w-4/6 m-[0_auto] my-12 p-8">
      <h2 className="font-bold mb-6 text-3xl">All Photos</h2>
      <div className="flex flex-row flex-wrap -ml-4">
        {!allPhotos.length ? (
          [0, 1, 2].map((e) => (
            <div key={e} className="p-4 basis-full lg:basis-1/3 md:basis-1/2">
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
      </div>
    </div>
  );
};

export default AllPhotos;
