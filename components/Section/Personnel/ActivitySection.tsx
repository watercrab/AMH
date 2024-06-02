"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import Progress from "@/components/Progress";
import Button from "@/components/UI/Button";
import { useAuth } from "@/context/AuthProvider";
import CulturePng from "@/public/culture-icon.png";
import HealthPng from "@/public/health-icon.png";
import { handleCalHourPersonnel } from "@/utils/CalculateHourPersonnel";

const ActivitySection = () => {
  // _Context
  const { userActivites } = useAuth();

  // _State
  const [hourCulture, setHourCulture] = useState<number>(0);
  const [hourHealth, setHourHealth] = useState<number>(0);

  // _Effect
  useEffect(() => {
    handleCalHourPersonnel({ userActivites, setHourCulture, setHourHealth });
  }, [userActivites]);

  return (
    <section>
      <div
        className={clsx([
          `grid grid-cols-2 gap-16`,
          `lg:gap-10`,
          `sm:grid-cols-1`,
        ])}
      >
        <div className={clsx([`space-y-16`, `sm:space-y-6`])}>
          <Progress maxHour={102} hour={hourCulture} />
          <Button variant="secondary">
            <Link
              href="/personnel/form/culture"
              className={clsx([
                `flex w-full items-center justify-start space-x-4 p-4 `,
                `lg:space-x-0`,
              ])}
            >
              <Image
                src={CulturePng}
                width={90}
                height={90}
                alt="culture icon png"
                className={clsx(`h-90 w-90`)}
              />
              <span
                className={clsx([
                  `break-words text-body-24`,
                  `sm:text-body-20`,
                ])}
              >
                การส่งภาระงานด้านทำนุบำรุงศิลปวัฒนธรรม
              </span>
            </Link>
          </Button>
        </div>
        <div className={clsx([`space-y-16`, `sm:space-y-6`])}>
          <Progress maxHour={102} hour={hourHealth} />
          <Button variant="secondary">
            <Link
              href="/personnel/form/health"
              className={clsx([
                `flex w-full items-center justify-start space-x-4 p-4 `,
                `lg:space-x-0`,
              ])}
            >
              <Image
                src={HealthPng}
                width={90}
                height={90}
                alt="health icon png"
                className={clsx(`h-90 w-90`)}
              />
              <span
                className={clsx([
                  `break-words text-body-24`,
                  `sm:text-body-20`,
                ])}
              >
                การส่งภาระงานด้านส่งเสริมสุขภาพ
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
