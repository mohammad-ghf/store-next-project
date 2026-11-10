import * as yup from "yup";

export const registerSchema = yup.object({
  id: yup
    .string()
    .trim()
    .required("نام کاربری الزامی است")
    .min(4, "نام کاربری باید حداقل ۳ کاراکتر باشد"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf(
      [yup.ref("password")],
      "رمز عبور و تکرار آن یکسان نیستند"
    ),
});

export type RegisterFormData = yup.InferType<
  typeof registerSchema
>;
