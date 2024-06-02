import React from "react";

import Image from "next/image";

import BackIconPng from "@/public/back-icon.png";

const BackIcon = () => {
  return <Image src={BackIconPng} alt="back icon png" priority />;
};

export default BackIcon;
