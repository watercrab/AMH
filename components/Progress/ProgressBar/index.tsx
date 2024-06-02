import React from "react";

import clsx from "clsx";

import { ProgressBarProps } from "../types";

const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div className={clsx(`w-full rounded-full border border-black bg-white`)}>
      <div
        className={clsx([
          `rounded-full p-0.5 text-center text-xs font-medium leading-none text-blue-100`,
          { [`bg-success-500`]: percent >= 80 },
          { [`bg-warn-500`]: percent >= 50 && percent < 80 },
          { [`bg-danger-500`]: percent < 50 },
          { [`bg-transparent`]: percent === 0 },
        ])}
        style={{ width: `${percent}%` }}
      >
        <span>{percent}</span>
        <span>%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
