"use client";

import React, { HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Card from "@/components/UI/Card";
import LogoICTPng from "@/public/logo-ict.png";

interface IAuthenticationCardProps extends HTMLAttributes<HTMLDivElement> {
  titleClassName?: string;
  headerClassName?: string;
  header?: ReactNode;
}

const AuthenticationCard = ({
  header,
  children,
  titleClassName,
}: IAuthenticationCardProps) => {
  const pathName = usePathname();

  return (
    <div
      className={clsx([
        `container main-space-x`,
        { [`h-page`]: pathName === "/" },
      ])}
    >
      <Card className={clsx(`w-full`)}>
        <div className={clsx([`space-y-8 p-7`])}>
          <div className={clsx([`flex justify-end space-x-6`])}>
            <Link href="/">
              <p className={clsx({ [`text-primary-500`]: pathName !== "/" })}>
                เข้าสู่ระบบ
              </p>
            </Link>
            <Link href="/register">
              <p
                className={clsx({
                  [`text-primary-500`]: pathName !== "/register",
                })}
              >
                ลงทะเบียน
              </p>
            </Link>
          </div>
          {header && (
            <div className={clsx(`card-header`)}>
              {typeof header === "string" ? (
                <div className={clsx(`title`, titleClassName)}>{header}</div>
              ) : (
                header
              )}
            </div>
          )}
          {children}
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationCard;
