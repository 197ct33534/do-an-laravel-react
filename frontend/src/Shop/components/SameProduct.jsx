import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../Helper/Funtion';
import { fetchgetProductSameCate } from '../../features/shopApi';
const options = {
    loop: true,
    center: false,

    margin: 16,
    autoplay: true,
    dots: false,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: false,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 4,
        },
    },
};
const SameProduct = ({ category_id }) => {
    const [product, setProduct] = useState();
    const fetchProductSameCate = async () => {
        if (category_id) {
            const res = await fetchgetProductSameCate(category_id);
            if (res.data.success) {
                setProduct(res.data.data);
            }
        }
    };
    useEffect(() => {
        fetchProductSameCate();
    }, [category_id]);
    return (
        <>
            {product?.length > 0 && (
                <div className="container-fluid pt-5">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                        <span className="bg-secondary pr-3">Các sản phẩm có cùng mặt hàng</span>
                    </h2>
                    <div className="row px-xl-5 pb-3">
                        <div className="col-md-12">
                            <OwlCarousel className="owl-carousel owl-theme" {...options}>
                                {product?.length > 0 &&
                                    product?.map((product) => (
                                        // <div
                                        //     className="col-lg-3 col-md-4 col-sm-6 pb-1"
                                        //     key={'product' + product.product_id}
                                        // >
                                        <div
                                            className="product-item bg-light mb-4 pb-1"
                                            key={'product' + product.product_id}
                                        >
                                            <div className="product-img position-relative overflow-hidden">
                                                <img
                                                    className="img-fluid w-100"
                                                    style={{
                                                        height: '380px',
                                                        objectFit: 'cover',
                                                    }}
                                                    src={product.product_image}
                                                    alt=""
                                                />
                                                <div className="product-action"></div>
                                            </div>
                                            <div className="text-center py-4">
                                                <Link
                                                    className="h6 text-decoration-none  product_name"
                                                    to={`http://localhost:3000/san-pham/${product.product_id}`}
                                                >
                                                    {product.product_name}
                                                </Link>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>
                                                        {numberWithCommas(product.product_price)} đ
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <Rating
                                                        defaultValue={product.star_avg}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    <small>({product.vote_count} đánh giá)</small>
                                                </div>
                                            </div>
                                        </div>
                                        // </div>
                                    ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SameProduct;
