import React from "react";

import AuthenticationCard from "@/components/Cards/AuthenticationCard";
import LoginForm from "@/components/Forms/Login";

export default function LoginPage() {
  return (
    <section>
      <AuthenticationCard header="เข้าสู่ระบบ">
        <LoginForm />
      </AuthenticationCard>
    </section>
  );
}
