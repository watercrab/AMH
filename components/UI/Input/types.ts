import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

import { Table } from "@tanstack/react-table";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  component: "input" | "select" | "textarea";
  value: string | number | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "text" | "number" | "email" | "password" | "tel";
  required?: boolean;
  children: ReactNode;
}
export interface IInputTableProps {
  table: Table<any>;
}
