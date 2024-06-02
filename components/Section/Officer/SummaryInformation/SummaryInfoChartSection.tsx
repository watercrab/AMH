import React from "react";

import clsx from "clsx";

import GradientChart from "@/components/Chart/GradientChart";
import VerticalBarChart from "@/components/Chart/VerticalBarChart";

const SummaryInfoChartSection = () => {
  return (
    <section className={clsx(`space-y-12`)}>
      <VerticalBarChart />
      <GradientChart />
    </section>
  );
};

export default SummaryInfoChartSection;
