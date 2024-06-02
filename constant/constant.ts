import {
  IActivityDataProps,
  IActivityResponseDataOfficerProps,
  IActivityResponseDataProps,
} from "@/types/activity/activity.types";
import { IBranchDataProps } from "@/types/branch/branch.types";
import { IRoleDataProps } from "@/types/role/role.types";
import { IStatusDataProps } from "@/types/status/status.types";
import { IUserDataProps } from "@/types/user/user.types";

// URL
export const BASEURL = "http://127.0.0.1:8000";

// User
export const USERS: IUserDataProps[] = [
  {
    id: "1",
    firstName: "เขียว",
    lastName: "ใจดี",
    email: "green@gmail.com",
    phone: "0999999999",
    role: "Personnel",
    branch: "สาขาวิชาธุรกิจดิจิทัล",
  },
  {
    id: "2",
    firstName: "แดง",
    lastName: "สะอาดใจ",
    email: "red@gmail.com",
    phone: "0888888888",
    role: "Officer",
  },
  {
    id: "3",
    firstName: "น้ำใส",
    lastName: "ไหลเย็น",
    email: "water@gmail.com",
    phone: "0777777777",
    role: "Personnel",
    branch: "สาขาวิชาวิศวกรรมซอฟต์แวร",
  },
  {
    id: "4",
    firstName: "คอม",
    lastName: "พิวเตอร์ล่าสุด",
    email: "computer@gmail.com",
    phone: "0777777777",
    role: "Personnel",
    branch: "สาขาวิชาวิศวกรรมซอฟต์แวร",
  },
  {
    id: "5",
    firstName: "ส้มเปรี้ยวมาก",
    lastName: "จากสวน",
    email: "orange@gmail.com",
    phone: "0777777777",
    role: "Officer",
  },
  {
    id: "6",
    firstName: "เสือ",
    lastName: "ใจดี",
    email: "tiger@gmail.com",
    phone: "0777777777",
    role: "Personnel",
    branch: "สาขาวิชาคอมพิวเตอร์กราฟิกและมัลติมีเดีย",
  },
];

// User role
export const DEFAULT_USER_ROLE_DATA: IRoleDataProps[] = [
  { id: "1", role: "", value: "" },
  { id: "2", role: "ผู้ใช้ทั่วไป", value: "Personnel" },
];

// Branch
export const DEFAULT_BRANCH_DATA_AUTH: IBranchDataProps[] = [
  { id: "1", branchName: "", value: "" },
  { id: "2", branchName: "สาขาวิชาธุรกิจดิจิทัล", value: "DB" },
  { id: "3", branchName: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "IT" },
  { id: "4", branchName: "สาขาวิชาภูมิสารสนเทศศาสตร์", value: "GIS" },
  { id: "5", branchName: "สาขาวิชาวิทยาการคอมพิวเตอร์", value: "CS" },
  { id: "6", branchName: "สาขาวิชาวิทยาการข้อมูลและการประยุกต์", value: "DSA" },
  { id: "7", branchName: "สาขาวิชาวิศวกรรมคอมพิวเตอร์", value: "CPE" },
  { id: "8", branchName: "สาขาวิชาวิศวกรรมซอฟต์แวร์", value: "SE" },
  {
    id: "9",
    branchName: "สาขาวิชาคอมพิวเตอร์กราฟิกและมัลติมีเดีย",
    value: "CG",
  },
];

export const DEFAULT_BRANCH_DATA_SUMMARY_OFFICER: IBranchDataProps[] = [
  { id: "2", branchName: "สาขาวิชาธุรกิจดิจิทัล", value: "DB" },
  { id: "3", branchName: "สาขาวิชาเทคโนโลยีสารสนเทศ", value: "IT" },
  { id: "4", branchName: "สาขาวิชาภูมิสารสนเทศศาสตร์", value: "GIS" },
  { id: "5", branchName: "สาขาวิชาวิทยาการคอมพิวเตอร์", value: "CS" },
  { id: "6", branchName: "สาขาวิชาวิทยาการข้อมูลและการประยุกต์", value: "DSA" },
  { id: "7", branchName: "สาขาวิชาวิศวกรรมคอมพิวเตอร์", value: "CPE" },
  { id: "8", branchName: "สาขาวิชาวิศวกรรมซอฟต์แวร์", value: "SE" },
  {
    id: "9",
    branchName: "สาขาวิชาคอมพิวเตอร์กราฟิกและมัลติมีเดีย",
    value: "CG",
  },
  { id: "10", branchName: "สำนักงานคณะ", value: "OF" },
  { id: "1", branchName: "ทั้งหมด", value: "ALL" },
  // { id: "11", branchName: "ทั้งหมด", value: "ALL" },
];

// Status
export const DEFAULT_STATUS: IStatusDataProps[] = [
  {
    id: "1",
    status: "",
  },
  {
    id: "2",
    status: "ผ่าน",
  },
  {
    id: "3",
    status: "ไม่ผ่าน",
  },
  {
    id: "4",
    status: "กำลังดำเนินการ",
  },
];

// Activity
export const DEFAULT_ACTIVITY: IActivityDataProps[] = [
  {
    id: "2",
    category: "งานด้านทำนุบำรุงศิลปวัฒนธรรม",
    hour: 6,
  },
  {
    id: "3",
    category: "งานด้านส่งเสริมสุขภาพ",
    hour: 4,
  },
  {
    id: "1",
    category: "ทั้งหมด",
    hour: 0,
  },
];

// Officer table in indexpage
export const OFFICERTABLE: IActivityResponseDataOfficerProps[] = [
  {
    id: "1",
    userID: "1",
    firstName: "เขียว",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านทำนุบำรุงศิลปวัฒนธรรม",
      hour: 6,
    },
    totalHour: 10,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
  {
    id: "2",
    userID: "2",
    firstName: "ขาว",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านส่งเสริมสุขภาพ",
      hour: 4,
    },
    totalHour: 50,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
  {
    id: "3",
    userID: "3",
    firstName: "ดำ",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านส่งเสริมสุขภาพ",
      hour: 4,
    },
    totalHour: 60,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
  {
    id: "4",
    userID: "4",
    firstName: "น้ำเงิน",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านส่งเสริมสุขภาพ",
      hour: 4,
    },
    totalHour: 70,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
  {
    id: "5",
    userID: "5",
    firstName: "ส้ม",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านส่งเสริมสุขภาพ",
      hour: 4,
    },
    totalHour: 80,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
  {
    id: "6",
    userID: "6",
    firstName: "ชมพู",
    lastName: "ใจดี",
    branch: {
      id: "1",
      branchName: "สาขาวิชาธุรกิจดิจิทัล",
      value: "DB",
    },
    category: {
      id: "2",
      category: "งานด้านส่งเสริมสุขภาพ",
      hour: 4,
    },
    totalHour: 90,
    updateDate: "11/11/2023",
    status: "ผ่าน",
  },
];

export const DEFAULT_TOTAL_HOUR = 0;

// Days
export const DEFAULT_DAYS_TH = [
  "วันอาทิตย์",
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
];
