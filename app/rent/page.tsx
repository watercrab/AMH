import React from "react";

import clsx from "clsx";

import  Rents from "@/components/Rent/rent";
import { NODE_RESOLVE_OPTIONS } from "next/dist/build/webpack-config";

const Rent = () => {
  return (
    <div
      className={clsx([
        `container`,
        `mt-10`,
        `main-space-x`,
        `space-y-16`,
        `sm:space-y-6`,
      ])}
    >
      <Rents/>
    </div>
  );
};

export default Rent;
