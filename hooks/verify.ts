"use client";

import { useEffect } from "react";

import { useVerifyMutation } from "@/lib/redux/features/authApiSlice";
import { finishInitialLoad, setAuth } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function useVerify() {
  const dispatch = useAppDispatch();

  // _Mutation
  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
}
