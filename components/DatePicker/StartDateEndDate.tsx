import React from "react";
import DatePicker from "react-datepicker";

import clsx from "clsx";
import Image from "next/image";

import SortLeftPng from "@/public/sort-left-icon.png";

interface IStartDateEndDatePickerProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const StartDateEndDatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: IStartDateEndDatePickerProps) => {
  return (
    <div
      className={clsx([`grid grid-cols-2 gap-16`, `lg:grid-cols-1 lg:gap-8`])}
    >
      <div className={clsx([`list-box-search`])}>
        <div className={clsx([`list-box-search-label`])}>
          <label>วันที่เริ่มต้น</label>
          <span>:</span>
        </div>

        <div className={clsx([`box-date-picker`, `container-box-search`])}>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a weekday"
            className={clsx([`date-picker`])}
          />
          <Image
            src={SortLeftPng}
            alt="sort left icon png"
            className={clsx([`icon-sort-left`])}
            priority
          />
        </div>
      </div>
      <div className={clsx([`list-box-search`])}>
        <div className={clsx([`list-box-search-label`])}>
          <label>วันที่สิ้นสุด</label>
          <span>:</span>
        </div>

        <div className={clsx([`box-date-picker`, `container-box-search`])}>
          <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a weekday"
            className={clsx([`date-picker`])}
          />
          <Image
            src={SortLeftPng}
            alt="sort left icon png"
            className={clsx([`icon-sort-left`])}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default StartDateEndDatePicker;
