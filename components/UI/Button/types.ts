import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "none"
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warn"
  | "danger"
  | "milk-pink";
export type ButtonSize = "default" | "none";
export type ButtonRounder =
  | "default"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export type Button = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = Button & {
  variant?: ButtonVariant;
  loading?: boolean;
  active?: boolean;
  size?: ButtonSize;
  rounder?: ButtonRounder;
  isOutline?: boolean;
  isInvert?: boolean;
};
