"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-final-form";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";

import Spinner from "@/components/Progress/Spinner";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import {
  DEFAULT_BRANCH_DATA_AUTH,
  DEFAULT_USER_ROLE_DATA,
} from "@/constant/constant";
import { useRegister } from "@/hooks";
import SortLeftPng from "@/public/sort-left-icon.png";
import { IBranchDataProps } from "@/types/branch/branch.types";
import { IRoleDataProps } from "@/types/role/role.types";
import { IUserDataProps } from "@/types/user/user.types";

const RegisterForm = () => {
  // _State
  const [selectedRole, setSelectedRole] = useState<IRoleDataProps>(
    DEFAULT_USER_ROLE_DATA[0],
  );
  const [selectedBranch, setSelectedBranch] = useState<IBranchDataProps>(
    DEFAULT_BRANCH_DATA_AUTH[0],
  );
  const [newUser, setNewUser] = useState<IUserDataProps>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    branch: "",
    password: "",
    re_password: "",
  });

  // _Hook
  const { isLoading, onSubmit } = useRegister(newUser);

  // _Effect
  useEffect(() => {
    if (selectedRole) {
      setNewUser({ ...newUser, role: selectedRole.value });
    }
  }, [selectedRole]);

  useEffect(() => {
    if (newUser.role === "Personnel" && selectedBranch) {
      setNewUser({ ...newUser, branch: selectedBranch.value });
    } else {
      setSelectedBranch(DEFAULT_BRANCH_DATA_AUTH[0]);
      setNewUser({ ...newUser, branch: "" });
    }
  }, [selectedBranch, newUser.role]);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx([`space-y-6 px-24`, `sm:px-5`])}
        >
          <Input
            name="firstName"
            component="input"
            value={newUser.firstName}
            onChange={(e) => {
              setNewUser({ ...newUser, firstName: e.target.value });
            }}
            type="text"
            placeholder="First name"
          >
            ชื่อ-สกุล
          </Input>
          <Input
            name="email"
            component="input"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
            }}
            type="email"
            placeholder="Example@gmail.com"
          >
            อีเมล
          </Input>
          <Input
            name="password"
            component="input"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
            }}
            type="password"
            placeholder="********"
          >
            รหัสผ่าน
          </Input>
          <Input
            name="password"
            component="input"
            value={newUser.re_password}
            onChange={(e) => {
              setNewUser({ ...newUser, re_password: e.target.value });
            }}
            type="password"
            placeholder="********"
          >
            ยืนยันรหัสผ่าน
          </Input>

          <div className={clsx([`field-box`])}>
            <label>สถานะ</label>
            <Listbox value={selectedRole} onChange={setSelectedRole}>
              <div className={clsx(`relative`)}>
                <Listbox.Button
                  className={clsx([`list-box`, `list-box-text-white`])}
                >
                  <span>{selectedRole.role}</span>

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
                  <Listbox.Options className={clsx(`list-box-option`)}>
                    {DEFAULT_USER_ROLE_DATA.map((user) => (
                      <Listbox.Option
                        key={user.id}
                        className={({ active }) =>
                          `${
                            user.id !== "1" &&
                            `relative cursor-default select-none py-2 pl-10 pr-4`
                          } ${
                            user.id !== "1" && active
                              ? `bg-amber-100 text-primary-900`
                              : `text-gray-900`
                          }`
                        }
                        value={user}
                      >
                        {user.id !== "1" && user.role}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className={clsx([`flex justify-center`])}>
            <Button
              variant="milk-pink"
              rounder="full"
              loading={isLoading}
              type="submit"
            >
              {isLoading ? <Spinner /> : <p>ลงทะเบียน</p>}
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default RegisterForm;
