import * as yup from 'yup';
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ruleCheckOut = (check) => {
    let temp = {};
    if (check) {
        temp = {
            name2: yup
                .string()
                .required('Họ và tên không được bỏ trống')
                .trim()
                .min(1, 'Họ và tên không được phép bé hơn 1 ký tự')
                .max(255, 'Họ và tên  không được vượt quá 255 ký tự'),

            email2: yup
                .string()
                .required('Email không được bỏ trống')
                .email('Email không đúng định dạng')
                .max(191, 'Email  không được vượt quá 191 ký tự')
                .matches(/^[a-zA-Z0-9@.]+$/, 'Email không được chứa ký tự đặc biệt'),
            address2: yup
                .string()
                .required('Địa chỉ không được bỏ trống')
                .trim()
                .min(1, 'Địa chỉ không được phép bé hơn 1 ký tự')
                .max(255, 'Địa chỉ  không được vượt quá 255 ký tự'),
            phone2: yup
                .string()
                .required('Số điện thoại không được bỏ trống')
                .matches(phoneRegExp, 'Số điện thoại không đúng định dạng')
                .min(10, 'Số điện thoại phải 10 số')
                .max(10, 'Số điện thoại phải 10 số'),
        };
    }
    return {
        name: yup
            .string()
            .required('Họ và tên không được bỏ trống')
            .trim()
            .min(1, 'Họ và tên không được phép bé hơn 1 ký tự')
            .max(255, 'Họ và tên  không được vượt quá 255 ký tự'),

        email: yup
            .string()
            .required('Email không được bỏ trống')
            .email('Email không đúng định dạng')
            .max(191, 'Email  không được vượt quá 191 ký tự')
            .matches(/^[a-zA-Z0-9@.]+$/, 'Email không được chứa ký tự đặc biệt'),
        address: yup
            .string()
            .required('Địa chỉ không được bỏ trống')
            .trim()
            .min(1, 'Địa chỉ không được phép bé hơn 1 ký tự')
            .max(255, 'Địa chỉ  không được vượt quá 255 ký tự'),
        phone: yup
            .string()
            .required('Số điện thoại không được bỏ trống')
            .matches(phoneRegExp, 'Số điện thoại không đúng định dạng')
            .min(10, 'Số điện thoại phải 10 số')
            .max(10, 'Số điện thoại phải 10 số'),
        ...temp,
    };
};
