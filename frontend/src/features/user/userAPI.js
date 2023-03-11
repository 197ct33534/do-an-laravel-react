import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};

export async function fetchLogin(value) {
    return await axios.post(`${URL}/login`, value, config);
}
export async function fetchResigter(data) {
    return await axios.post(`${URL}/resigter`, data, config);
}

export async function fetchLogout(value) {
    return await axios.get(`${URL}/logout`, config);
}

export async function fetchGetUser(param = { page: 1, perPage: 10 }) {
    let arr = [];
    if (param.page) {
        arr.push(`page=${param.page}`);
    }
    if (param.perPage) {
        arr.push(`perPage=${param.perPage}`);
    }
    return await axios.get(`${URL}/user?${arr.join('&')}`, config);
}
export async function fetchPutIsActive(id) {
    return await axios.put(`${URL}/user/isActive`, { id }, config);
}

export async function fetchDeleteUser(id) {
    config.data = { id };
    return await axios.delete(`${URL}/user`, config);
}
export async function fetchPostUser(value) {
    return await axios.post(`${URL}/user`, value, config);
}

export async function fetchPutUser(value) {
    return await axios.put(`${URL}/user`, value, config);
}

export async function fetchGetFilterUser(listParam) {
    let str = [];
    if (listParam.name) {
        str.push(`name=${listParam.name}`);
    }
    if (listParam.email) {
        str.push(`email=${listParam.email}`);
    }
    if (listParam.is_active) {
        str.push(`is_active=${listParam.is_active}`);
    }
    if (listParam.group_role) {
        str.push(`group_role=${listParam.group_role}`);
    }
    if (listParam.perPage) {
        str.push(`perPage=${listParam.perPage}`);
    }
    if (listParam.page) {
        str.push(`page=${listParam.page}`);
    } else {
        str.push(`page=1`);
    }
    return await axios.get(`${URL}/user/filter?${str.join('&')}`, config);
}
