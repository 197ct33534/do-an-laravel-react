import * as yup from 'yup';
export const ruleAttributeSet = {
    name: yup
        .string()
        .required('Tên không được bỏ trống')
        .trim()
        .min(1, 'Tên không được phép bé hơn 1 ký tự')
        .max(191, 'Tên không được phép lớn hơn 191 ký tự'),
};
