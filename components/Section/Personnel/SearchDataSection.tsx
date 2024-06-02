"use client";

import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

import StartDateEndDatePicker from "@/components/DatePicker/StartDateEndDate";
import Table from "@/components/Section/Table/Table";
import { DEFAULT_ACTIVITY } from "@/constant/constant";
import { useAuth } from "@/context/AuthProvider";
import SortLeftPng from "@/public/sort-left-icon.png";
import {
  IActivityDataProps,
  IActivityRequestDataProps,
} from "@/types/activity/activity.types";

import { UserColumns } from "./Column";

const SearchDataSection = () => {
  // _Context
  const { userActivites } = useAuth();

  // _State
  const [info, setInfo] = useState<IActivityRequestDataProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IActivityDataProps>(
    DEFAULT_ACTIVITY[2],
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // _Action
  const handleFilterCategory = () => {
    const filterDropdown = userActivites.filter((activity) => {
      if (
        activity.category === "C" &&
        "งานด้านทำนุบำรุงศิลปวัฒนธรรม" === selectedCategory.category
      ) {
        return activity;
      } else if (
        activity.category === "H" &&
        "งานด้านส่งเสริมสุขภาพ" === selectedCategory.category
      ) {
        return activity;
      }
    });

    setInfo(filterDropdown);
  };

  const handleFilterDate = () => {
    if (startDate !== null && endDate !== null) {
      const filterDate = userActivites.filter((activity) => {
        const start = format(startDate, "yyyyMMdd");
        const end = format(endDate, "yyyyMMdd");

        if (
          start <= format(new Date(activity.updateDate),"yyyyMMdd")
          .replace("-", "")
          .replace("-", "") &&
          end >= format(new Date(activity.updateDate),"yyyyMMdd")
          .replace("-", "")
          .replace("-", "")
        ) {
          return activity;
        }
      });
      setInfo(filterDate);
    }
  };

  const handleFilter = () => {
    if (startDate !== null && endDate !== null) {
      const filterDate = userActivites.filter((activity) => {
        const start = format(startDate, "yyyyMMdd");
        const end = format(endDate, "yyyyMMdd");

        if (
          start <= activity.updateDate.replace("-", "").replace("-", "") &&
          end >= activity.updateDate.replace("-", "").replace("-", "")
        ) {
          if (
            activity.category === "C" &&
            "งานด้านทำนุบำรุงศิลปวัฒนธรรม" === selectedCategory.category
          ) {
            return activity;
          } else if (
            activity.category === "H" &&
            "งานด้านส่งเสริมสุขภาพ" === selectedCategory.category
          ) {
            return activity;
          }
        }
      });
      setInfo(filterDate);
    }
  };

  // _Effect
  useEffect(() => {
    if (userActivites) {
      if (
        selectedCategory.id === "1" &&
        (startDate === null || endDate === null)
      ) {
        const filter = userActivites.sort((a, b) => {
          a.updateDate = format(
            new Date(a.updateDate),
            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
          )
            .split("-")
            .join("-");
          b.updateDate = format(
            new Date(b.updateDate),
            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
          )
            .split("-")
            .join("-");
          return a.updateDate > b.updateDate
            ? 1
            : a.updateDate < b.updateDate
              ? -1
              : 0;
        });

        if (filter) {
          setInfo(filter);
        }
      } else if (
        selectedCategory.id !== "1" &&
        startDate !== null &&
        endDate !== null
      ) {
        handleFilter();
      } else {
        handleFilterCategory();
        handleFilterDate();
      }
    }
  }, [userActivites, selectedCategory, startDate, endDate]);

  return (
    <section className={clsx([`space-y-8`])}>
      <div className={clsx([`list-box-search`])}>
        <div className={clsx([`list-box-search-label`])}>
          <label>ประเภท</label>
          <span>:</span>
        </div>

        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className={clsx(`container-box-search`)}>
            <Listbox.Button className={clsx(`list-box`)}>
              <span>{selectedCategory.category}</span>

              <Image
                src={SortLeftPng}
                alt="sort left icon png"
                className="pointer-events-none"
                priority
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={clsx(`list-box-option`)}>
                {DEFAULT_ACTIVITY.map((activity) => (
                  <Listbox.Option
                    key={activity.id}
                    className={({ active }) =>
                      `${`relative cursor-default select-none py-2 pl-10 pr-4`} ${
                        active
                          ? `cursor-pointer bg-amber-100 text-primary-900`
                          : `text-gray-900`
                      }`
                    }
                    value={activity}
                  >
                    {activity.category}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <StartDateEndDatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Table info={info} columns={UserColumns} />
    </section>
  );
};

export default SearchDataSection;
