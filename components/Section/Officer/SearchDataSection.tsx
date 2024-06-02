"use client";

import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

import StartDateEndDatePicker from "@/components/DatePicker/StartDateEndDate";
import { DEFAULT_ACTIVITY } from "@/constant/constant";
import { useAuth } from "@/context/AuthProvider";
import SortLeftPng from "@/public/sort-left-icon.png";
import {
  IActivityDataProps,
  IActivityResponseDataOfficerProps,
} from "@/types/activity/activity.types";
import { IUserDataProps } from "@/types/user/user.types";

import TableOfficer from "../Table/TableOfficer";
import { UsersColumns } from "./Column";
import { handleAddInfo, handleGetUsers } from "./_action/AddUserDataTable";

const SearchDataSection = () => {
  // _Context
  const { activites, reload, setReload } = useAuth();

  // _State
  const [activityUsers, setActivityUsers] = useState<
    IActivityResponseDataOfficerProps[]
  >([]);
  const [info, setInfo] = useState<IActivityResponseDataOfficerProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IActivityDataProps>(
    DEFAULT_ACTIVITY[2],
  );
  const [infoUsers, setInfoUsers] = useState<IUserDataProps[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // _Action
  const handleFilterCategory = () => {
    const filterDropdown = activityUsers.filter((activity) => {
      if (activity.category.category === selectedCategory.category) {
        return activity;
      } else if (activity.category.category === selectedCategory.category) {
        return activity;
      }
    });

    setInfo(filterDropdown);
  };

  const handleFilterDate = () => {
    if (startDate !== null && endDate !== null) {
      const filterDate = activityUsers.filter((activity) => {
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
      const filterDate = activityUsers.filter((activity) => {
        const start = format(startDate, "yyyyMMdd");
        const end = format(endDate, "yyyyMMdd");

        if (
          start <= activity.updateDate.replace("-", "").replace("-", "") &&
          end >= activity.updateDate.replace("-", "").replace("-", "")
        ) {
          if (activity.category.category === selectedCategory.category) {
            return activity;
          } else if (activity.category.category === selectedCategory.category) {
            return activity;
          }
        }
      });
      setInfo(filterDate);
    }
  };

  // _Effect
  useEffect(() => {
    handleAddInfo({ activites, infoUsers, setActivityUsers });
  }, [infoUsers]);

  useEffect(() => {
    handleGetUsers(setInfoUsers);
  }, []);

  useEffect(() => {
    if (reload) {
      window.location.reload();
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (activityUsers) {
      const filter = activityUsers.sort((a, b) => {
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

      if (
        selectedCategory.id === "1" &&
        (startDate === null || endDate === null)
      ) {
        const filter = activityUsers.sort((a, b) => {
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
        // setInfo(activityUsers);
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
  }, [activityUsers, selectedCategory, startDate, endDate]);

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
                          ? `bg-amber-100 text-primary-900`
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
      <TableOfficer info={info} columns={UsersColumns} />
    </section>
  );
};

export default SearchDataSection;
