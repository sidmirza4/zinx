import React from "react";
import Link from "next/link";

import { Button } from ".";
import { useAppContext } from "../context/AppContext";

export const Header = () => {
  const { setModals } = useAppContext();

  return (
    <div className="bg-hero-image bg-no-repeat bg-top bg-cover w-full h-[60vh] relative">
      {/* OVERLAY */}
      <div className="h-full w-full absolute bg-white dark:bg-darkBlue dark:opacity-75 opacity-40"></div>
      <div className="p-16 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Content of the header */}
        <h1 className="text-5xl font-bold text-darkBlues text-center mb-8">
          Share your arts and photograph with the world
        </h1>
        <Link href="/upload">
          <Button>Upload Photo</Button>
        </Link>
      </div>
    </div>
  );
};
