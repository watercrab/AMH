import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthProvider";
import { useLoginMutation } from "@/lib/redux/features/authApiSlice";
import { setAuth } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function useLogin(email: string, password: string) {
  const dispatch = useAppDispatch();

  // _State
  const [token, setToken] = useState<string>("");

  // _Mutation
  const [login, { isLoading }] = useLoginMutation();

  // _Context
  const { fetchUserInfo } = useAuth();

  // _Action
  const onSubmit = () => {
    login({ email, password })
      .unwrap()
      .then((res) => {
        dispatch(setAuth());

        setToken(res.access);

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.access}`;

        fetchUserInfo();

        toast.success("ล็อกอินสำเร็จ");
      })
      .catch(() => {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาล็อกอินอีกครั้ง");
      });
  };

  // _Effect
  useEffect(() => {
    const authToken = window.localStorage.getItem("auth_token");
    authToken && setToken(authToken);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth_token", token);
  }, [token]);

  return { isLoading, onSubmit };
}
