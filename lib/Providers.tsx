"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";

interface IProviders {
  children: ReactNode;
}

const Providers = ({ children }: IProviders) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
