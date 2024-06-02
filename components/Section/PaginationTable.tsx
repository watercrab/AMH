import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";

import InputTable from "@/components/Input/InputTable";
import Button from "@/components/UI/Button";
import BackIcon from "@/icons/Back";
import BackerIcon from "@/icons/Backer";
import ForwardIcon from "@/icons/Forward";
import ForwarderIcon from "@/icons/Forwarder";
import SortLeftPng from "@/public/sort-left-icon.png";

interface IPaginationTableProps {
  table: Table<any>;
}

const PaginationTable = ({ table }: IPaginationTableProps) => {
  // _MOCK
  const userContext = "1";

  return (
    <div className={clsx([`pagination`])}>
      <span>
        หน้า {table.getState().pagination.pageIndex + 1} ถึง{" "}
        {table.getPageCount()} ของ{" "}
        {
          table
            .getRowModel()
            .rows.filter((row) => row.original.userID === userContext).length
        }{" "}
        รายการ
      </span>
      <div className={clsx([`grid grid-cols-3 items-center gap-5`])}>
        <div className={clsx([`flex items-center justify-between`])}>
          <Button
            variant="none"
            size="none"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.resetPageIndex();
            }}
          >
            <BackerIcon />
          </Button>
          <Button
            variant="none"
            size="none"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <BackIcon />
          </Button>
        </div>
        <div className={clsx(`w-full`)}>
          <InputTable table={table} />
        </div>
        <div className={clsx([`flex items-center justify-between`])}>
          <Button
            variant="none"
            size="none"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <ForwardIcon />
          </Button>
          <Button
            variant="none"
            size="none"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
          >
            <ForwarderIcon />
          </Button>
        </div>
      </div>
      <div className={clsx([`flex items-center justify-end space-x-2`])}>
        <Listbox
          value={table.getState().pagination.pageSize}
          onChange={(value) => table.setPageSize(value)}
        >
          <div className={clsx([`w-2/5`, `lg:w-full`])}>
            <Listbox.Button className={clsx([`list-box`, `border bg-white`])}>
              <span>{table.getState().pagination.pageSize}</span>

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
              <Listbox.Options className={clsx([`list-box-option`, `w-40`])}>
                {[10, 20, 30, 40, 50].map((pageSize) => {
                  return (
                    <Listbox.Option
                      key={pageSize}
                      value={pageSize}
                      className={({ active }) =>
                        `${`relative cursor-default select-none`} ${
                          active
                            ? `bg-amber-100 p-2 text-primary-900`
                            : `p-2 text-gray-900`
                        }`
                      }
                    >
                      {pageSize}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <span className={clsx([`whitespace-nowrap`])}>รายการต่อหน้า</span>
      </div>
    </div>
  );
};

export default PaginationTable;
