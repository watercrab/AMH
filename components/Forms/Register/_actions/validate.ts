// import { ZodError } from "zod";

// import { FormErrors, UserFormData, userSchema } from "@/lib/schema/userSchema";

// export const validate = (
//   values: UserFormData,
//   setInfoUser: React.Dispatch<React.SetStateAction<boolean>>,
// ): FormErrors => {
//   try {
//     userSchema.parse(values);
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return error.errors.reduce((errors, err) => {
//         const path = err.path.join(".");
//         errors[path] = err.message;
//         return errors;
//       }, {} as FormErrors);
//     }
//   }

//   return {};
// };

export const handleValidate = (error: string) => {
  if (error == "This field may not be blank.") {
    return "กรุณากรอกข้อมูล";
  } else if (error == '"" is not a valid choice.') {
    return "กรุณาเลือกข้อมูล";
  } else if (
    error ==
    "This password is too short. It must contain at least 8 characters."
  ) {
    return "รหัสผ่านนี้สั้นเกินไป ต้องมีอักขระอย่างน้อย 8 ตัว";
  } else if (error == "The password is too similar to the email address.") {
    return "รหัสผ่านคล้ายกับที่อยู่อีเมลมากเกินไป";
  } else if (error == "This password is too common.") {
    return "รหัสผ่านนี้ใช้บ่อยเกินไป";
  } else if (error == "The two password fields didn't match.") {
    return "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน";
  } else {
    return error;
  }
};
