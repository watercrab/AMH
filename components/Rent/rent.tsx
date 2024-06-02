"use client";

import React, { useState } from "react";
import Image from 'next/image';
import clsx from "clsx";
import cut from "@/public/cut.png";
import care from "@/public/care.png";
import vac from "@/public/vac.png";
import Spinner from "@/components/Progress/Spinner";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import useLogin from "@/hooks/login";
import { Form } from "react-final-form";
import { RowSelection } from "@tanstack/react-table";
const Service = () => {
    // _State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // _Hook
  const { isLoading, onSubmit } = useLogin(email, password);

  return (
    <div
      className={clsx([
        `container`,
        `mt-10`,
        `main-space-x`,
        `space-y-16`,
        `sm:space-y-6`,
      ])}
    >
    <p className={clsx([`text-center text-header-3`])}>ลงทะเบียนจองห้องพัก</p>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx([`space-y-6 px-24`, `sm:px-5`])}
        >
          <Input
            name="email"
            component="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
          >
            ชื่อเจ้าของสัตว์เลี้ยง
          </Input>
          <Input
            name="email"
            component="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="ชื่อสัตว์เลี้ยง"
          >
            ชื่อสัตว์เลี้ยง
          </Input>
          <Input
            name="email"
            component="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="dd/MM/yyyy"
          >
            วันที่ฝาก
          </Input>
          <Input
            name="email"
            component="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="dd/MM/yyyy"
          >
            วันที่รับ
          </Input>
          <Input
            name="email"
            component="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="แนบรูปภาพ"
          >
            ชำระเงินค่ามัดจำ
          </Input>
          <div></div>
          <div className={clsx([`flex justify-center space-x-6`])}>
            <Button type="submit" variant="milk-pink" rounder="full">
              {isLoading ? <Spinner /> : <p>บันทึก</p>}
            </Button>
          </div>
        </form>
      )}
    />
    </div>
  );
};

export default Service;
