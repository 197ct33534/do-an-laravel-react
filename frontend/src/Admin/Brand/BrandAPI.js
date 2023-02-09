import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    "Content-type": process.env.REACT_APP_CONTENT_TYPE,
    "ngrok-skip-browser-warning": 69420,
  },
};

export async function fetchAllBrand(listParam) {
  let str = [];
  if (listParam?.brand_name) {
    str.push(`brand_name=${listParam.brand_name}`);
  }

  if (listParam?.perPage) {
    str.push(`perPage=${listParam.perPage}`);
  }
  if (listParam?.page) {
    str.push(`page=${listParam.page}`);
  } else {
    str.push(`page=1`);
  }
  return await axios.get(`${URL}/brands/filter?${str.join("&")}`, config);
}
export async function fetchPostBrand(form) {
  config.headers["Content-type"] = "multipart/form-data";
  return await axios.post(`${URL}/brands`, form, config);
}
export async function fetchDeleteBrand(id) {
  config.headers["Content-type"] = "application/json";
  config.data = { id };
  return await axios.delete(`${URL}/brands`, config);
}
export async function fetchPutBrand(value) {
  config.headers["Content-type"] = "multipart/form-data";
  return await axios.post(`${URL}/brands/edit`, value, config);
}

export async function fetchBrand() {
  return await axios.get(`${URL}/brands`, config);
}
