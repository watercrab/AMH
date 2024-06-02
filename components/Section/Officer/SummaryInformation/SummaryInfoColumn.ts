import { createColumnHelper } from "@tanstack/react-table";

import { IExportDataProps } from "@/types/activity/activity.types";

const columnHelper = createColumnHelper<IExportDataProps>();

export const SummaryInfoColumn = [
  columnHelper.accessor("id", {
    header: "ลำดับ",
    cell: (info) => {
      return info.row.index + 1;
    },
  }),
  columnHelper.accessor("firstName", {
    header: "ชื่อ",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("lastName", {
    header: "นามสกุล",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("branch", {
    header: "สาขา",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("category", {
    header: "ประเภทภาระงาน",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("totalHour", {
    header: "จำนวนชั่วโมง",
    cell: (info) => {
      return info.getValue();
    },
  }),
];
