"use client";

import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

import DownloadButton from "@/components/Button/Download";
import {
  DEFAULT_ACTIVITY,
  DEFAULT_BRANCH_DATA_SUMMARY_OFFICER,
} from "@/constant/constant";
import { useAuth } from "@/context/AuthProvider";
import SortLeftPng from "@/public/sort-left-icon.png";
import {
  IActivityDataProps,
  IExportDataProps,
} from "@/types/activity/activity.types";
import { IBranchDataProps } from "@/types/branch/branch.types";
import { IUserDataProps } from "@/types/user/user.types";

import TableOfficer from "../../Table/TableOfficer";
import { handleAddInfo, handleGetUsers } from "../_action/AddUserDataTable";
import { SummaryInfoColumn } from "./SummaryInfoColumn";

const SearchSummaryInfoSection = () => {
  // _Context
  const { activites } = useAuth();

  // _State
  const [summaryInfo, setSummaryInfo] = useState<IExportDataProps[]>([]);
  const [info, setInfo] = useState<IExportDataProps[]>([]);
  const [infoUsers, setInfoUsers] = useState<IUserDataProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IActivityDataProps>(
    DEFAULT_ACTIVITY[2],
  );
  const [branch, setBranch] = useState<IBranchDataProps>(
    DEFAULT_BRANCH_DATA_SUMMARY_OFFICER[9],
  );

  // _Action
  const handleFilterCategory = () => {
    const filterDropdown = summaryInfo.filter((activity) => {
      if (activity.category === selectedCategory.category) {
        return activity;
      }
    });

    setInfo(filterDropdown);
  };

  const handleFilterBranch = () => {
    const filterDropdown = summaryInfo.filter((activity) => {
      if (activity.branch === branch.branchName) {
        return activity;
      }
    });

    setInfo(filterDropdown);
  };

  const handleFilter = () => {
    const filterDropdown = summaryInfo.filter((activity) => {
      if (activity.branch === branch.branchName) {
        if (activity.category === selectedCategory.category) {
          return activity;
        }
      }
    });

    setInfo(filterDropdown);
  };

  // _Effect
  useEffect(() => {
    handleGetUsers(setInfoUsers);
  }, []);

  useEffect(() => {
    handleAddInfo({ activites, infoUsers, setSummaryInfo });
  }, [infoUsers]);

  useEffect(() => {
    if (selectedCategory.id === "1" && branch.id === "1") {
      setInfo(summaryInfo);
    }

    if (
      selectedCategory.id !== "1" ||
      (selectedCategory.id !== "1" && branch.id === "1")
    ) {
      handleFilterCategory();
    }

    if (branch.id !== "1") {
      handleFilterBranch();
    }

    if (selectedCategory.id !== "1" && branch.id !== "1") {
      handleFilter();
    }
  }, [summaryInfo, selectedCategory, branch]);

  return (
    <section className={clsx([`space-y-8`])}>
      <div
        className={clsx([`grid grid-cols-2 gap-16`, `lg:grid-cols-1 lg:gap-8`])}
      >
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
        <div className={clsx([`list-box-search`])}>
          <div className={clsx([`list-box-search-label`])}>
            <label>สาขา</label>
            <span>:</span>
          </div>

          <Listbox value={branch} onChange={setBranch}>
            <div className={clsx(`container-box-search`)}>
              <Listbox.Button className={clsx(`list-box`)}>
                {branch.branchName === "" ? (
                  <span>เลือกสาขา</span>
                ) : (
                  <span>{branch.branchName}</span>
                )}

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
                  {DEFAULT_BRANCH_DATA_SUMMARY_OFFICER.map((branch) => (
                    <Listbox.Option
                      key={branch.id}
                      className={({ active }) =>
                        `${`relative cursor-default select-none py-2 pl-10 pr-4`} ${
                          active
                            ? `bg-amber-100 text-primary-900`
                            : `text-gray-900`
                        }`
                      }
                      value={branch}
                    >
                      {branch.branchName}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      <TableOfficer info={info} columns={SummaryInfoColumn} />
      <div className={clsx([`mb-2 flex justify-between`])}>
        <DownloadButton data={info} fileName="Export summary data file" />
      </div>
    </section>
  );
};

export default SearchSummaryInfoSection;
