import * as yup from 'yup';
export const ruleEditComment = {
    is_show: yup.string().oneOf(['1', '0'], 'Giá trị không hợp lệ'),
    setinment: yup.string().oneOf(['1', '0', '-1'], 'Giá trị không hợp lệ'),
    is_clothing: yup.string().oneOf(['1', '0'], 'Giá trị không hợp lệ'),
};
