import React from "react";

import clsx from "clsx";
import Image from "next/image";

import BackIconPng from "@/public/back-icon.png";
import LineIconPng from "@/public/line-icon.png";

const FirstBackIcon = () => {
  return (
    <div className={clsx([`flex items-center`])}>
      <Image src={LineIconPng} alt="line icon png" priority />
      <Image src={BackIconPng} alt="first back icon png" priority />
    </div>
  );
};

export default FirstBackIcon;
