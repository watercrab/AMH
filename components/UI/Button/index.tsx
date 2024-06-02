import React, { MouseEvent } from "react";

import clsx from "clsx";

import { ButtonProps } from "./types";

const Button = ({
  variant,
  size = "default",
  rounder = "default",
  className,
  children,
  active,
  loading,
  isOutline,
  isInvert,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `button`,
        [`button-rounder-${rounder}`],
        [`button-type-${size}`],
        {
          "button-loading": loading,
          active: active,
          "button-outline": isOutline,
          "border border-solid shadow-none": isOutline,
          "button-invert": isInvert,
        },
        variant,
        `focus:outline-none disabled:cursor-not-allowed disabled:opacity-30`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
