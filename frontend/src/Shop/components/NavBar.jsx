import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartCount } from '../../features/shopSlice';
import ListMenu from './ListMenu';

const NavBar = () => {
    const cart = useSelector(cartCount);

    return (
        <div className="container-fluid bg-dark mb-30">
            <div className="row px-xl-5">
                {/* <div className="col-lg-3 d-none d-lg-block">
                    <a
                        className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                        data-toggle="collapse"
                        href="#navbar-vertical"
                        style={{ height: '65px', padding: '0 30px' }}
                    >
                        <h6 className="text-dark m-0">
                            <i className="fa fa-bars mr-2"></i>Danh mục
                        </h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </a>
                    <nav
                        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                        id="navbar-vertical"
                        style={{ width: `calc(100% - ${'30'}px )`, zIndex: '999' }}
                    >
                        <div className="navbar-nav w-100">
                            <div className="nav-item dropdown dropright">
                                <Link
                                    to="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    Dresses <i className="fa fa-angle-right float-right mt-1"></i>
                                </Link>
                                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                    <Link to="" className="dropdown-item">
                                        Men's Dresses
                                    </Link>
                                    <Link to="" className="dropdown-item">
                                        Women's Dresses
                                    </Link>
                                    <Link to="" className="dropdown-item">
                                        Baby's Dresses
                                    </Link>
                                </div>
                            </div>
                            {/* {categories?.map((category) => (
                                <Link to="" className="nav-item nav-link">
                                    {category.name}
                                </Link>
                            ))} */}
                {/* <div className="nav-item dropdown dropright">
                                <Link to="#" className="nav-item nav-link dropdown-toggle">
                                    Jeans<i className="fa fa-angle-right float-right mt-1"></i>
                                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                        <Link to="" className="dropdown-item">
                                            Men's Dresses
                                        </Link>
                                        <Link to="" className="dropdown-item">
                                            Women's Dresses
                                        </Link>
                                        <Link to="" className="dropdown-item">
                                            Baby's Dresses
                                        </Link>
                                    </div>
                                </Link>
                            </div> */}
                {/* <Link to="" className="nav-item nav-link">
                                Swimwear
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Sleepwear
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Sportswear
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Jumpsuits
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Blazers
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Jackets
                            </Link>
                            <Link to="" className="nav-item nav-link">
                                Shoes
                            </Link> */}
                {/* <ListMenu /> */}
                {/* </div>
                    </nav>
                </div> */}
                <div className="col-lg-12">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                        <Link to="" className="text-decoration-none d-block d-lg-none">
                            <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                                Shop
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="my-2 collapse navbar-collapse justify-content-between"
                            id="navbarCollapse"
                        >
                            <div className="navbar-nav mr-auto py-0 ">
                                {/* <Link to="index.html" className="nav-item nav-link active">
                                    Trang chủ
                                </Link> */}

                                <ListMenu />

                                {/* <Link to="shop.html" className="nav-item nav-link">
                                    Shop
                                </Link>
                                <Link to="detail.html" className="nav-item nav-link">
                                    Shop Detail
                                </Link>

                                <Link
                                    to="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    Pages <i className="fa fa-angle-down mt-1"></i>
                                </Link>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <Link to="cart.html" className="dropdown-item">
                                        Shopping Cart
                                    </Link>
                                    <Link to="checkout.html" className="dropdown-item">
                                        Checkout
                                    </Link>
                                </div> */}

                                {/* <Link to="contact.html" className="nav-item nav-link">
                                    Contact
                                </Link> */}
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                <Link to="" className="btn px-0">
                                    <i className="fas fa-heart text-primary"></i>
                                    <span
                                        className="badge text-secondary border border-secondary rounded-circle"
                                        style={{ paddingBottom: '2px' }}
                                    >
                                        0
                                    </span>
                                </Link>
                                <Link to="" className="btn px-0 ml-3">
                                    <i className="fas fa-shopping-cart text-primary"></i>
                                    <span
                                        className="badge text-secondary border border-secondary rounded-circle"
                                        style={{ paddingBottom: '2px' }}
                                    >
                                        {cart?.cart_count || 0}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
