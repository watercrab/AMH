import { SetStateAction } from "react";

import axios from "axios";

import {
  BASEURL,
  DEFAULT_ACTIVITY,
  DEFAULT_BRANCH_DATA_AUTH,
} from "@/constant/constant";
import {
  IActivityRequestDataProps,
  IActivityResponseDataOfficerProps,
  IExportDataProps,
  IExportUsersDataProps,
} from "@/types/activity/activity.types";
import { IUserDataProps } from "@/types/user/user.types";

import { handleCalculateHour } from "../../_action/CalculateHour";

interface IHandleAddInfo {
  activites: IActivityRequestDataProps[];
  setActivityUsers?: React.Dispatch<
    React.SetStateAction<IActivityResponseDataOfficerProps[]>
  >;
  setSummaryInfo?: React.Dispatch<React.SetStateAction<IExportDataProps[]>>;
  infoUsers: IUserDataProps[];
}

export const handleAddInfo = ({
  activites,
  setActivityUsers,
  setSummaryInfo,
  infoUsers,
}: IHandleAddInfo) => {
  const result: IExportUsersDataProps[] = [];

  if (setActivityUsers) {
    setActivityUsers([]);
  }
  activites.map((activity) => {
    infoUsers
      .filter((user) => activity.activityUser == user.id)
      .map((filterInfo) => {
        let idActivity = "";
        let branchName = "";
        let valueBranch = "";
        let category = "";
        let hour = 0;

        DEFAULT_BRANCH_DATA_AUTH.forEach((branch) => {
          if (branch.value == filterInfo.branch) {
            idActivity = branch.id;
            branchName = branch.branchName;
            valueBranch = branch.value;
          }
        });

        DEFAULT_ACTIVITY.forEach((data) => {
          if (
            activity.category === "C" &&
            "งานด้านทำนุบำรุงศิลปวัฒนธรรม" === data.category
          ) {
            category = data.category;
            hour += data.hour;
          } else if (
            activity.category === "H" &&
            "งานด้านส่งเสริมสุขภาพ" === data.category
          ) {
            category = data.category;
            hour += data.hour;
          }
        });

        if (activity.status === "P") {
          handleCalculateHour({
            result: result,
            activity: activity,
            branchName: branchName,
            category: category,
            filterInfo: filterInfo,
            hour: hour,
            setSummaryInfo: setSummaryInfo,
          });
        } else if (activity.status === "D") {
          const data: IActivityResponseDataOfficerProps = {
            id: activity.id,
            userID: filterInfo.id,
            firstName: filterInfo.firstName,
            lastName: filterInfo.lastName,
            branch: {
              id: idActivity,
              branchName: branchName,
              value: valueBranch,
            },
            category: {
              id: idActivity,
              category: category,
              hour: hour,
            },
            updateDate: activity.updateDate,
            totalHour: hour,
            status: activity.status,
          };
          if (setActivityUsers) {
            setActivityUsers((prevInfo) => [...prevInfo, data]);
          }
        }
      });
  });
};

export const handleGetUsers = async (
  setInfoUsers: (value: SetStateAction<IUserDataProps[]>) => void,
) => {
  const storedToken = localStorage.getItem("auth_token");

  if (storedToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    const response = await axios.get(`${BASEURL}/api/user/`);
    setInfoUsers(response.data);
  } else {
    console.error("No token found in Local Storage");
  }
};
