import React from "react";
import Image from 'next/image';
import clsx from "clsx";
import cut from "@/public/cut.png";
import care from "@/public/care.png";
import vac from "@/public/vac.png";
import { RowSelection } from "@tanstack/react-table";
const Service = () => {
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
     <div
        className={clsx([
          `grid grid-cols-3 gap-16`,
          `lg:gap-10`,
          `sm:grid-cols-1`,
        ])}
    >
        <Image src={vac} alt="Description" />
        <Image src={cut} alt="Description" />
        <Image src={care} alt="Description" />
        <p className={clsx([`text-center text-header-5`])}>บริการตรวจสุขภาพ ฉีดวัคซีนแมว</p>
        <p className={clsx([`text-center text-header-5`])}>บริการตัดขน</p>
        <p className={clsx([`text-center text-header-5`])}>บริการรับฝากแมวมีพนักงานดูแลอย่างใกล้ชิด</p>
    </div>
    </div>
  );
};

export default Service;
