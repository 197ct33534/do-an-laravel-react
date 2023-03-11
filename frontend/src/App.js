import axios from 'axios';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserList from './Admin/Account/UserList';
import AttributeSetList from './Admin/Attribute/Sets/AttributeSetList';
import AttributeValueList from './Admin/Attribute/Values/AttributeValueList';

import BrandList from './Admin/Brand/BrandList';
import CateList from './Admin/Category/CateList';
import PermissionList from './Admin/Permission/PermissionList';
import AddProduct from './Admin/Product/AddProduct';
import EditProduct from './Admin/Product/EditProduct';
import ProductList from './Admin/Product/ProductList';
import RoleList from './Admin/Role/RoleList';
import { configToast } from './Helper/Config';
import { CheckLogin } from './middlewares/CheckLogin';
import Deni from './pages/Deni';
import Layout from './pages/Layout';
import LayoutShop from './pages/LayoutShop';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Resigter from './pages/Resigter';
import CheckOut from './Shop/components/CheckOut';
import MyCart from './Shop/components/MyCart';
import DetailProduct from './Shop/pages/DetailProduct';
import Home from './Shop/pages/Home';

// import { CheckLogin } from "./middlewares/CheckLogin";
// import Deni from "./pages/Deni";
// import NotFound from "./pages/NotFound";
// import Page500 from "./pages/Page500";

function App() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // axios.defaults.headers.common["ngrok-skip-browser-warning"] = 69420;
    }
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status == 401) {
                localStorage.clear();
                navigate('/login');
                toast.warning('Tài khoản của bạn không hợp lệ', configToast);
            }
            if (error.response.status == 500) {
                navigate('/500');
            }
            return error;
        }
    );
    return (
        <Routes>
            <Route path="/" element={<LayoutShop />}>
                <Route path="" element={<Home />} />
                <Route path="san-pham/:id" element={<DetailProduct />} />
                <Route path="gio-hang" element={<MyCart />} />
                <Route path="/thanh-toan" element={<CheckOut />} />
            </Route>
            <Route path="/login" element={<CheckLogin />}>
                <Route path="" element={<Login />} />
            </Route>
            <Route path="/dang-ky" element={<Resigter />} />
            <Route path="/admin" element={<Layout />}>
                <Route path="" element={<h1>trang /</h1>} />
                <Route path="brands" element={<BrandList />} />
                <Route path="users" element={<UserList />} />
                <Route path="roles" element={<RoleList />} />
                <Route path="permissions" element={<PermissionList />} />
                <Route path="categories" element={<CateList />} />
                <Route path="attribute">
                    <Route path="sets" element={<AttributeSetList />} />
                    <Route path="values" element={<AttributeValueList />} />
                </Route>
                <Route path="products">
                    <Route path="" element={<ProductList />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                </Route>
            </Route>
            <Route path="/403" element={<Deni />} />
            {/* <Route path="/500" element={<Page500 />} /> */}
            <Route path="notfound" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
