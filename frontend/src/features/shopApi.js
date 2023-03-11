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
