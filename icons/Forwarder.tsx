import React from "react";

import clsx from "clsx";
import Image from "next/image";

import ForwarderIconPng from "@/public/forward-icon.png";
import LineIconPng from "@/public/line-icon.png";

const ForwarderIcon = () => {
  return (
    <div className={clsx([`flex items-center`])}>
      <Image src={LineIconPng} alt="line icon png" />
      <Image src={ForwarderIconPng} alt="forwarded icon png" />
    </div>
  );
};

export default ForwarderIcon;
