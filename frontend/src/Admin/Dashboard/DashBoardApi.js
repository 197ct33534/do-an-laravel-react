import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const config = {
    headers: {
        'Content-type': process.env.REACT_APP_CONTENT_TYPE,
        'ngrok-skip-browser-warning': 69420,
    },
};
export async function fetchGetBudget() {
    return await axios.get(`${URL}/dashboard/budget`, config);
}

export async function fetchGetMonthlyRevenue() {
    return await axios.get(`${URL}/dashboard/monthlyRevenue`, config);
}

export async function fetchGetQuantitySoldOfProduct() {
    return await axios.get(`${URL}/dashboard/quantitySoldOfProduct`, config);
}

export async function fetchGetNumberOfCommentTypes() {
    return await axios.get(`${URL}/dashboard/getNumberOfCommentTypes`, config);
}
