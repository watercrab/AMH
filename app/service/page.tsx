import React from "react";

import clsx from "clsx";

import  Service from "@/components/Service/service";

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
      <Service />
    </div>
  );
};

export default PersonnelIndexPage;
