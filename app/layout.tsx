import "react-datepicker/dist/react-datepicker.css";

import clsx from "clsx";
import { Metadata } from "next";

import { AuthProvider } from "@/context/AuthProvider";
import Providers from "@/lib/Providers";
import "@/styles/globals.scss";
import Toast from "@/utils/Toast";

export const metadata: Metadata = {
  title: "Animal hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx([`font-sans`])}>
        <Providers>
          <Toast />
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
