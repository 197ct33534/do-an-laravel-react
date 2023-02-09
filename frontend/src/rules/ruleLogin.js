import * as yup from "yup";
export const rule = {
  email: yup
    .string()
    .required("email không được bỏ trống")
    .trim()
    .email("Email không đúng định dạng"),
  pass: yup.string().required("Mật khẩu không được bỏ trống"),
};
