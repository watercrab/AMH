import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

import { IActivityRequestDataProps } from "@/types/activity/activity.types";

const columnHelper = createColumnHelper<IActivityRequestDataProps>();

export const UserColumns = [
  columnHelper.accessor("activityUser", {
    header: "ลำดับ",
    cell: (info) => {
      return info.row.index + 1;
    },
  }),
  columnHelper.accessor("category", {
    header: "ประเภทภาระงาน",
    cell: (info) => {
      if (info.getValue() === "C") {
        return "งานด้านทำนุบำรุงศิลปวัฒนธรรม";
      } else {
        return "งานด้านส่งเสริมสุขภาพ";
      }
    },
  }),
  columnHelper.accessor("updateDate", {
    header: "วันที่ส่ง",
    cell: (info) => {
      return format(new Date(info.getValue()), "yyyy-MM-dd");
    },
  }),
  columnHelper.accessor("hour", {
    header: "จำนวนชั่วโมง",
    cell: (info) => {
      return info.getValue();
    },
  }),
  columnHelper.accessor("status", {
    header: "สถานะ",
    cell: (info) => {
      if (info.getValue() === "P") {
        return "ผ่าน";
      } else if (info.getValue() === "N") {
        return "ไม่ผ่าน";
      } else {
        return "กำลังดำเนินการ";
      }
    },
  }),
];
