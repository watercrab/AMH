import React from "react";

import clsx from "clsx";
import Image from "next/image";

import BackIconPng from "@/public/back-icon.png";
import LineIconPng from "@/public/line-icon.png";

const BackerIcon = () => {
  return (
    <div className={clsx([`flex items-center`])}>
      <Image src={LineIconPng} alt="line icon png" />
      <Image src={BackIconPng} alt="backed icon png" />
    </div>
  );
};

export default BackerIcon;
