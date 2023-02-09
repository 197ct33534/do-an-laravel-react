import * as yup from 'yup';
export const ruleAddProduct = (attr) => {
    const temp = {};
    attr.forEach((element) => {
        temp[element] = yup.string().required(element + ' không được để trống');
    });
    return {
        product_name: yup
            .string()
            .required('Vui lòng nhập tên sản phẩm')
            .trim()
            .min(6, 'Tên phải lớn hơn 5 ký tự')
            .max(255, 'Tên  không được vượt quá 255 ký tự'),
        product_price: yup
            .number()
            .typeError('Giá bán chỉ được là số')
            .required('Giá bán không được để trống')
            .min(0, 'Giá không được nhỏ hơn 0')
            .max(999999.99, 'Giá không được lớn hơn 999999.99'),

        active: yup.string().oneOf(['1', '2'], 'Hiển thị không được để trống'),
        gender: yup.string().oneOf(['1', '3', '2'], 'Giới tính không được để trống'),
        category: yup
            .number()
            .typeError('Hãy chọn danh mục')
            .required('Danh mục không được để trống'),
        brand: yup
            .number()
            .typeError('Hãy chọn thương hiệu')
            .required('Thương hiệu không được để trống'),
        attributes: yup.array(
            yup.object({
                ...temp,
                qty: yup
                    .number()
                    .typeError('Giá bán chỉ được là số')
                    .required('Giá bán không được để trống')
                    .min(0, 'Giá không được nhỏ hơn 0')
                    .max(99999, 'Giá không được lớn hơn 99999'),
                sku: yup
                    .string()
                    .required('Mã kho không được phép bỏ trống')
                    .trim()
                    .min(6, 'Mã kho phải lớn hơn 5 ký tự')
                    .max(255, 'Mã kho không được vượt quá 255 ký tự'),
            })
        ),
    };
};
