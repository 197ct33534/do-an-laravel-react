import * as yup from 'yup';
export const ruleCategory = {
    category_name: yup
        .string()
        .required('Tên không được bỏ trống')
        .trim()
        .min(1, 'Tên không được phép bé hơn 1 ký tự')
        .max(191, 'Tên  không được vượt quá 191 ký tự'),
    parent_id: yup.string().notRequired(),
};
