import * as yup from 'yup';
export const rule = {
    name: yup
        .string()
        .required('Tên không được bỏ trống')
        .trim()
        .min(3, 'Tên không được phép bé hơn 3 ký tự')
        .max(30, 'Tên không được phép lớn hơn 30 ký tự'),
    email: yup
        .string()
        .required('Email không được bỏ trống')
        .trim()
        .email('Email không đúng định dạng')
        .matches(/^[a-zA-Z0-9@.]+$/, 'Email không được chứa ký tự đặc biệt'),
    password: yup
        .string()
        .required('Mật khẩu không được bỏ trống')
        .min(6, 'Mật khẩu không được phép bé hơn 6 ký tự')
        .test('space', 'Mật khẩu không hợp lệ', function (value) {
            if (value?.length === 0) {
                return true;
            }
            if (value?.trim().length < 6) {
                return false;
            }
            return true;
        }),
    password_confirmation: yup
        .string()
        .required('Mật khẩu không được bỏ trống')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không giống nhau'),
};
