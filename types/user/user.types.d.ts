import { IActivityResponseDataProps } from "../activity/activity.types";
import { IBranchDataProps } from "../branch/branch.types";
import { IRoleDataProps } from "../role/role.types";

export interface IUserDataProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  branch?: string;
  password?: string;
  re_password?: string;
}
