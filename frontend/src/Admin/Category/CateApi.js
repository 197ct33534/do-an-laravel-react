import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};

export async function fetchAllCategory() {
    return await axios.get(`${URL}/categories`, config);
}
export async function fetchCategory() {
    return await axios.get(`${URL}/categories/all`, config);
}
export async function fetchPostCategory(form) {
    return await axios.post(`${URL}/categories`, form, config);
}
export async function fetchDeleteCategory(id) {
    config.headers['Content-type'] = 'application/json';
    config.data = { id };
    return await axios.delete(`${URL}/categories`, config);
}
export async function fetchPutCategory(value) {
    return await axios.put(`${URL}/categories`, value, config);
}

export async function fetchCategoryAll() {
    return await axios.get(`${URL}/categories/all`, config);
}
export async function fetchCategoryAllHaveParent() {
    return await axios.get(`${URL}/categories/allHaveParent`, config);
}
