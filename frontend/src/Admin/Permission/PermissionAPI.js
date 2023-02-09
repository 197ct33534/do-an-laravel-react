import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};

export async function fetchAllPermission(listParam) {
    let str = [];
    if (listParam?.title) {
        str.push(`title=${listParam.title}`);
    }
    if (listParam?.name) {
        str.push(`name=${listParam.name}`);
    }
    if (listParam?.perPage) {
        str.push(`perPage=${listParam.perPage}`);
    }
    if (listParam?.page) {
        str.push(`page=${listParam.page}`);
    } else {
        str.push(`page=1`);
    }
    return await axios.get(`${URL}/permission?${str.join('&')}`, config);
}
export async function fetchPostPermission(form) {
    return await axios.post(`${URL}/permission`, form, config);
}
export async function fetchDeletePermission(id) {
    config.data = { id };
    return await axios.delete(`${URL}/permission`, config);
}
export async function fetchPutPermission(value) {
    return await axios.put(`${URL}/permission`, value, config);
}
