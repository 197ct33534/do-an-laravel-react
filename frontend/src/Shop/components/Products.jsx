import React from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productList } from '../../features/shopSlice';
import '../css/Custom.css';
const Products = () => {
    const products = useSelector(productList);

    return (
        <div className="container-fluid pt-5 pb-3">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">Tìm Kiếm Hàng Đầu</span>
            </h2>
            <div className="row px-xl-5">
                {products?.map((product) => (
                    <div
                        className="col-lg-3 col-md-4 col-sm-6 pb-1"
                        key={'product' + product.product_id}
                    >
                        <div className="product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                                <img
                                    className="img-fluid w-100"
                                    style={{ height: '380px', objectFit: 'cover' }}
                                    src={product.product_image}
                                    alt=""
                                />
                                <div className="product-action">
                                    <Link className="btn btn-outline-dark btn-square" to="">
                                        <i className="fa fa-shopping-cart"></i>
                                    </Link>
                                    <Link className="btn btn-outline-dark btn-square" to="">
                                        <i className="far fa-heart"></i>
                                    </Link>
                                    <Link className="btn btn-outline-dark btn-square" to="">
                                        <i className="fa fa-sync-alt"></i>
                                    </Link>
                                    <Link className="btn btn-outline-dark btn-square" to="">
                                        <i className="fa fa-search"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <Link
                                    className="h6 text-decoration-none  product_name"
                                    to={`/san-pham/${product.product_id}`}
                                >
                                    {product.product_name}
                                </Link>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>{product.product_price}</h5>
                                    {/* <h6 className="text-muted ml-2">
                                        <del>$123.00</del>
                                    </h6> */}
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-1">
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small>(99)</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(Products);
