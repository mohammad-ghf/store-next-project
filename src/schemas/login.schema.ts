import * as yup from "yup";

export const loginSchema = yup.object({
  id: yup.string().trim().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
