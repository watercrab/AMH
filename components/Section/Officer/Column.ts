import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

import { IActivityResponseDataOfficerProps } from "@/types/activity/activity.types";

const columnHelper = createColumnHelper<IActivityResponseDataOfficerProps>();

export const UsersColumns = [
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
  columnHelper.accessor("branch.branchName", {
    header: "สาขา",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("category.category", {
    header: "ประเภทภาระงาน",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("updateDate", {
    header: "วันที่ส่ง",
    cell: (info) => {
      return format(new Date(info.getValue()), "yyyy-MM-dd");
    },
  }),
  columnHelper.accessor("totalHour", {
    header: "จำนวนชั่วโมง",
    cell: (info) => {
      return info.getValue();
    },
  }),
];
