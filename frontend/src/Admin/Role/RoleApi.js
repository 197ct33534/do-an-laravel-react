import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};

export async function fetchFilterRole(listParam) {
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
    return await axios.get(`${URL}/roles/filter?${str.join('&')}`, config);
}
export async function fetchAllRole() {
    return await axios.get(`${URL}/roles`, config);
}
export async function fetchPostRole(form) {
    return await axios.post(`${URL}/roles`, form, config);
}

export async function fetchDeleteRole(id) {
    config.data = { id };
    return await axios.delete(`${URL}/roles`, config);
}
export async function fetchPutRole(value) {
    return await axios.post(`${URL}/roles/edit`, value, config);
}
