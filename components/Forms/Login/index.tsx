"use client";

import React, { useState } from "react";
import { Form } from "react-final-form";

import clsx from "clsx";

import Spinner from "@/components/Progress/Spinner";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import useLogin from "@/hooks/login";

const LoginForm = () => {
  // _State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // _Hook
  const { isLoading, onSubmit } = useLogin(email, password);

  return (
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
            type="email"
            placeholder="Example@gmail.com"
          >
            อีเมล
          </Input>
          <Input
            name="password"
            component="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
          >
            รหัสผ่าน
          </Input>
          <div></div>
          <div className={clsx([`flex justify-center space-x-6`])}>
            <Button type="submit" variant="milk-pink" rounder="full">
              {isLoading ? <Spinner /> : <p>เข้าสู่ระบบ</p>}
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default LoginForm;
