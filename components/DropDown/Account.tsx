"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DEFAULT_BRANCH_DATA_AUTH,
  DEFAULT_USER_ROLE_DATA,
} from "@/constant/constant";
import { useAuth } from "@/context/AuthProvider";
import { useLogoutMutation } from "@/lib/redux/features/authApiSlice";
import { logout as setLogout } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import AvatarPng from "@/public/avatar-icon.png";

import Button from "../UI/Button";

const AccountDropDown = () => {
  const dispatch = useAppDispatch();

  // _Router
  const router = useRouter();

  // _Mutation
  const [logout] = useLogoutMutation();

  // _Context
  const { userInfo, setIsActivated } = useAuth();

  // _State
  const [accountMenu, setAccountMenu] = useState<boolean>(false);

  // _Ref สำหรับเก็บอ้างอิงของ dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // _Actions
  // handler สำหรับปิด dropdown เมื่อคลิกนอก dropdown
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setAccountMenu(false);
    }
  };

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        setIsActivated(false);
        localStorage.removeItem("auth_token");
      })
      .finally(() => {
        localStorage.removeItem("auth_token");
        toast.success("ล็อกเอาท์สำเร็จ");
        router.push("/");
      });
  };

  // _Effect สำหรับเพิ่มและถอด event listener เมื่อ component ถูก mount และ unmount
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={clsx([`relative`])} ref={dropdownRef}>
      <Image
        src={AvatarPng}
        alt="avatar icon png"
        className={clsx(`hover:cursor-pointer`)}
        onClick={() => setAccountMenu((val) => !val)}
      />
      {accountMenu && (
        <div
          className={clsx([
            `absolute right-1 top-14 w-80 space-y-4 rounded-2xl bg-white p-8 shadow-03`,
          ])}
        >
          <div>
            <p className={clsx([`text-body-20 text-blue-second-500`])}>
              {userInfo?.firstName + " " + userInfo?.lastName}
            </p>
            <p className={clsx([`text-bodyNormal-14 text-muted-500`])}>
              {DEFAULT_BRANCH_DATA_AUTH.filter(
                (branch) => userInfo?.branch === branch.value,
              ).map((branch) => {
                return branch.branchName;
              })}
            </p>
            <p className={clsx(`text-body-16 text-blue-second-500`)}>
              {DEFAULT_USER_ROLE_DATA.filter(
                (role) => userInfo?.role === role.value,
              ).map((role) => {
                return role.role;
              })}
            </p>
          </div>

          <div className={clsx([`space-y-4 border-b border-stroke-500 pb-4`])}>
            <p className={clsx([`text-body-20`])}>ช่องทางการติดต่อ</p>
            <p>
              <span className={clsx([`text-body-16`])}>เบอร์โทรศัพท์ :</span>{" "}
              {userInfo?.phone ? "" + userInfo.phone : "-"}
            </p>
            <p>
              {" "}
              <span className={clsx([`text-body-16`])}>Email :</span>{" "}
              {userInfo?.email ? userInfo.email : "-"}
            </p>
          </div>

          <Button
            variant="danger"
            rounder="xl"
            isOutline={true}
            className={clsx(`w-full border-danger-500`)}
            onClick={() => {
              handleLogout();
            }}
          >
            ออกจากระบบ
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountDropDown;
