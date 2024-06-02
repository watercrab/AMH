"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { useRegisterMutation } from "@/lib/redux/features/authApiSlice";
import { IUserDataProps } from "@/types/user/user.types";

export default function useRegister(newUser: IUserDataProps) {
  // _Mutation
  const [register, { isLoading, error }] = useRegisterMutation();

  // _Router
  const router = useRouter();

  // _State
  const [infoUser, setInfoUser] = useState(false);

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    role,
    branch,
    password,
    re_password,
  } = newUser;

  // _Action
  const onSubmit = () => {
    register({
      id,
      firstName,
      lastName,
      email,
      phone,
      role,
      branch,
      password,
      re_password,
    })
      .unwrap()
      .then(() => {
        router.push("/");
        toast.success("ลงทะเบียนสำเร็จ");
      })
      .catch(() => {
        toast.error("ลงทะเบียนไม่สำเร็จ");
      });
  };

  return {
    isLoading,
    error,
    onSubmit,
  };
}
