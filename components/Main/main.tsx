import React from "react";
import Image from 'next/image';
import clsx from "clsx";
import petclub from "@/public/petclub.png";
import review1 from "@/public/review1.png";
import review2 from "@/public/review2.png";
import review3 from "@/public/review3.png";
import discount from "@/public/discount.png";
import { RowSelection } from "@tanstack/react-table";
const Main = () => {
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
    <p className={clsx([`text-center text-header-3`])}>Pet club</p>
    <Image src={petclub} alt="Description" />
    <p className={clsx([`text-center text-header-3`])}>ส่วนลด</p>
    <div
        className={clsx([
          `grid grid-cols-2 gap-16`,
          `lg:gap-10`,
          `sm:grid-cols-1`,
        ])}
    >
        <Image src={discount} alt="Description" />
        <Image src={discount} alt="Description" />
    </div>
    <p className={clsx([`text-center text-header-3`])}>AREA</p>
    <div
        className={clsx([
          `grid grid-cols-2 gap-16`,
          `lg:gap-10`,
          `sm:grid-cols-1`,
        ])}
    >
        <Image src={review1} alt="Description" width={743} height={594} />
        <div
        className={clsx([
          `grid grid-rows-2 gap-16`,
          `lg:gap-10`,
          `sm:grid-rows-1`,
        ])}
    >
        <Image src={review2} alt="Description" />
        <Image src={review3} alt="Description" />
        </div>
    </div>
    </div>
    
  );
};

export default Main;
