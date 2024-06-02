import React from "react";

import clsx from "clsx";

import { IInputTableProps } from "../UI/Input/types";

const InputTable = ({ table }: IInputTableProps) => {
  return (
    <input
      type="number"
      min="1"
      max={table.getPageCount()}
      defaultValue={table.getState().pagination.pageIndex + 1}
      onChange={(e) => {
        if (Number(e.target.value) > 0) {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
        }
      }}
      className={clsx([`w-full rounded border p-1`])}
    />
  );
};

export default InputTable;
