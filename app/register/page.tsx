import React from "react";

import AuthenticationCard from "@/components/Cards/AuthenticationCard";
import RegisterForm from "@/components/Forms/Register";

const RegisterPage = () => {
  return (
    <section>
      <AuthenticationCard header="ลงทะเบียน">
        <RegisterForm />
      </AuthenticationCard>
    </section>
  );
};

export default RegisterPage;
