import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};
export async function fetchAttributeValue() {
    return await axios.get(`${URL}/AttributeValue`, config);
}
export async function fetchAttributeSet() {
    return await axios.get(`${URL}/attributeSet`, config);
}
export async function fetchPostAttributeSet(form) {
    return await axios.post(`${URL}/attributeSet`, form, config);
}
export async function fetchPutAttributeSet(value) {
    return await axios.put(`${URL}/attributeSet`, value, config);
}
export async function fetchDeleteAttributeSet(id) {
    config.data = { id };
    return await axios.delete(`${URL}/attributeSet`, config);
}
export async function fetchPostAttributeValue(form) {
    return await axios.post(`${URL}/AttributeValue`, form, config);
}
export async function fetchPutAttributeValue(form) {
    return await axios.put(`${URL}/AttributeValue`, form, config);
}
export async function fetchDeleteAttributeValue(id) {
    config.headers['Content-type'] = 'application/json';
    config.data = { id };
    return await axios.delete(`${URL}/AttributeValue`, config);
}
export async function fetchPostAttribute(form) {
    return await axios.post(`${URL}/attribute`, form, config);
}

export async function fetchPutAttribute(form) {
    return await axios.put(`${URL}/attribute`, form, config);
}
export async function fetchDeleteAttribute(id) {
    config.headers['Content-type'] = 'application/json';
    config.data = { id };
    return await axios.delete(`${URL}/attribute`, config);
}
