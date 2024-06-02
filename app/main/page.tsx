import React from "react";

import clsx from "clsx";

import  Main from "@/components/Main/main";

const PersonnelIndexPage = () => {
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
      <Main />
    </div>
  );
};

export default PersonnelIndexPage;
