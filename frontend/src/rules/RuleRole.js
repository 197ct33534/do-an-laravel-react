import * as yup from 'yup';
export const ruleAddRole = {
    name: yup
        .string()
        .required('Tên không được bỏ trống')
        .trim()
        .min(3, 'Tên không được phép bé hơn 3 ký tự')
        .max(191, 'Tên  không được vượt quá 191 ký tự'),
    title: yup
        .string()
        .required('Tiêu đề không được bỏ trống')
        .trim()
        .min(3, 'Tiêu đề không được phép bé hơn 3 ký tự')
        .max(255, 'Tiêu đề  không được vượt quá 255 ký tự'),
};
