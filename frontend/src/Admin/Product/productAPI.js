import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
let config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};

export async function fetchGetFilterProduct(listParam) {
    let str = [];
    if (listParam.name) {
        str.push(`product_name=${listParam.name}`);
    }
    if (listParam.is_sales) {
        str.push(`is_sales=${listParam.is_sales}`);
    }
    if (listParam.min_price) {
        str.push(`min_price=${listParam.min_price}`);
    }
    if (listParam.max_price) {
        str.push(`max_price=${listParam.max_price}`);
    }
    if (listParam.perPage) {
        str.push(`perPage=${listParam.perPage}`);
    }
    if (listParam.page) {
        str.push(`page=${listParam.page}`);
    } else {
        str.push(`page=1`);
    }
    return await axios.get(`${URL}/products/filter?${str.join('&')}`, config);
}

export async function fetchDeleteProduct(id) {
    config.headers['Content-type'] = 'application/json';
    config.data = { id };
    return await axios.delete(`${URL}/products`, config);
}

export async function fetchPostProduct(value) {
    config.headers['Content-type'] = 'multipart/form-data';
    return await axios.post(`${URL}/products`, value, config);
}

export async function fetchPostEditProduct(value) {
    config.headers['Content-type'] = 'multipart/form-data';
    return await axios.post(`${URL}/products/edit`, value, config);
}

export async function fetchDetailProduct(id) {
    config.headers['Content-type'] = 'application/json';
    return await axios.get(`${URL}/products/${id}`, config);
}
