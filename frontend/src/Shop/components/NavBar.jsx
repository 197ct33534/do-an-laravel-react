import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartCount, resetCart } from '../../features/shopSlice';
import { logoutAsync, selectInfoUser } from '../../features/user/userSlice';

import ListMenu from './ListMenu';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(cartCount);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const handleLogout = async () => {
        await dispatch(logoutAsync());
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        await dispatch(resetCart());
    };
    return (
        <div className="container-fluid bg-dark mb-30">
            <div className="row px-xl-5">
                <div className="col-lg-12">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                        <button
                            type="button"
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="" className="text-decoration-none d-block d-lg-none">
                            {/* <span className="h1 text-uppercase text-dark bg-light px-2">Nghĩa</span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                                Store
                            </span> */}
                            <div style={{ width: '50px', height: '50px' }}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/assets/images/logo_transparent.png'
                                    }
                                    alt="nghĩa store"
                                />
                            </div>
                        </Link>
                        <div className="d-sm-block d-lg-none">
                            <Link to="" className="btn px-0">
                                <i className="fas fa-heart text-primary"></i>
                                <span
                                    className="badge text-secondary border border-secondary rounded-circle"
                                    style={{ paddingBottom: '2px' }}
                                >
                                    0
                                </span>
                            </Link>
                            <Link to="/gio-hang" className="btn px-0 ml-3">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span
                                    className="badge text-secondary border border-secondary rounded-circle"
                                    style={{ paddingBottom: '2px' }}
                                >
                                    {cart?.cart_count || 0}
                                </span>
                            </Link>
                        </div>
                        <div
                            className="my-2 collapse navbar-collapse justify-content-between"
                            id="navbarCollapse"
                        >
                            <div className="navbar-nav mr-auto py-0 ">
                                <ListMenu />
                                <div className="d-xs-block d-lg-none">
                                    {user ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={handleLogout}
                                        >
                                            <span class="mr-2">Đăng xuất</span>
                                            <i class="fas fa-sign-out-alt "></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate('/login')}
                                        >
                                            <span class="mr-2">Đăng nhập</span>
                                            <i class="fas fa-user "></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                <Link to="" className="btn px-0" title="Sản phẩm yêu thích">
                                    <i className="fas fa-heart text-primary"></i>
                                    <span
                                        className="badge text-secondary border border-secondary rounded-circle"
                                        style={{ paddingBottom: '2px' }}
                                    >
                                        0
                                    </span>
                                </Link>
                                <Link to="/gio-hang" className="btn px-0 ml-3" title="Giỏ hàng">
                                    <i className="fas fa-shopping-cart text-primary"></i>
                                    <span
                                        className="badge text-secondary border border-secondary rounded-circle"
                                        style={{ paddingBottom: '2px' }}
                                    >
                                        {cart?.cart_count || 0}
                                    </span>
                                </Link>

                                {user ? (
                                    <span
                                        onClick={handleLogout}
                                        className="btn px-0 ml-3"
                                        title="Đăng xuất"
                                    >
                                        <i class="fas fa-sign-out-alt text-primary"></i>
                                    </span>
                                ) : (
                                    <Link to="/login" className="btn px-0 ml-3" title="Đăng nhập">
                                        <i class="fas fa-user text-primary"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
