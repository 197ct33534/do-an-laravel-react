import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};
export async function fetchAddCart(data) {
    return await axios.post(`${URL}/carts`, data, config);
}
export async function fetchCartCount() {
    return await axios.get(`${URL}/carts/count`, config);
}

export async function fetchPutCartCount(data) {
    return await axios.put(`${URL}/carts`, data, config);
}

export async function fetchDeleteCartCount(cartId) {
    config.data = { cart_id: cartId };
    return await axios.delete(`${URL}/carts`, config);
}
export async function fetchpostOrder(data) {
    return await axios.post(`${URL}/orders`, data, config);
}
export async function fetchpostComment(data) {
    return await axios.post(`${URL}/comments`, data, config);
}
export async function fetchgetOrderStatus() {
    return await axios.get(`${URL}/orders/status`, config);
}
export async function fetchgetProductComment(id) {
    return await axios.get(`${URL}/comments/${id}`, config);
}
export async function fetchgetProductCategory(listParam = '') {
    let str = [];
    if (listParam.category_id) {
        str.push(`category_id=${listParam.category_id}`);
        delete listParam.category_id;
    }
    if (listParam.min_price) {
        str.push(`min_price=${listParam.min_price}`);
        delete listParam.min_price;
    }
    if (listParam.max_price) {
        str.push(`max_price=${listParam.max_price}`);
        delete listParam.max_price;
    }

    if (listParam.page) {
        str.push(`page=${listParam.page}`);
        delete listParam.page;
    } else {
        str.push(`page=1`);
    }
    if (listParam.perPage) {
        str.push(`perPage=${listParam.perPage}`);
        delete listParam.perPage;
    }
    Object.keys(listParam).map((k) => {
        if (listParam[k]?.length > 0) {
            listParam[k].map((v) => {
                str.push(`${k}[]=${v}`);
            });
        }
    });
    return await axios.get(`${URL}/products_cate/filter?${str.join('&')}`, config);
}
