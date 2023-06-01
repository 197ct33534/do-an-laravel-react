import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../Helper/Funtion';

const ProductCategoryList = ({ productList }) => {
    return (
        <>
            {productList?.map((product) => (
                <div
                    className="col-lg-4 col-md-6 col-sm-6 pb-1"
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
                                {/* <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                                        <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a> */}
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
                                <h5>{numberWithCommas(product.product_price)} đ</h5>
                                {/* <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6> */}
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <Rating defaultValue={product.star_avg} precision={0.5} readOnly />
                                <small>({product.vote_count} đánh giá)</small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCategoryList;
