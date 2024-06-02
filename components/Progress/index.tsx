import React from "react";

import clsx from "clsx";

import ProgressBar from "./ProgressBar";
import { IProgress } from "./types";

const Progress = ({ maxHour, hour }: IProgress) => {
  return (
    <div className={clsx(`space-y-4`)}>
      <div>
        <p>ทั้งหมด {maxHour} ชั่วโมง </p>
        <p>
          จำนวนที่ได้ {hour} ชั่งโมง คงเหลือ {maxHour - hour} ชั่วโมง
        </p>
      </div>
      <ProgressBar percent={hour} />
    </div>
  );
};

export default Progress;
