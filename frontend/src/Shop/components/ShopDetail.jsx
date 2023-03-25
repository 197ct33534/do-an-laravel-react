import React from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetailContext } from '../pages/DetailProduct';
import FormReview from './FormReview';
import ProductComment from './ProductComment';
import ShopDetailImage from './ShopDetailImage';
import ShopDetailInfo from './ShopDetailInfo';

const ShopDetail = () => {
    var { product, comment } = useContext(ProductDetailContext);
    product = product ? product[0] : false;

    const { hash, search } = useLocation();
    let hashtag = hash ?? '';
    if (search) {
        hashtag = '#binh-luan';
    } else if (!hashtag) {
        hashtag = '#mo-ta';
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row px-xl-5">
                {/* <div className="col-lg-5 mb-30">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner bg-light">
                            <div className="carousel-item active">
                                <img className="w-100 h-100" src="img/product-1.jpg" alt="Image" />
                            </div>
                            <div className="carousel-item">
                                <img className="w-100 h-100" src="img/product-2.jpg" alt="Image" />
                            </div>
                            <div className="carousel-item">
                                <img className="w-100 h-100" src="img/product-3.jpg" alt="Image" />
                            </div>
                            <div className="carousel-item">
                                <img className="w-100 h-100" src="img/product-4.jpg" alt="Image" />
                            </div>
                        </div>
                        <Link
                            className="carousel-control-prev"
                            to="#product-carousel"
                            data-slide="prev"
                        >
                            <i className="fa fa-2x fa-angle-left text-dark"></i>
                        </Link>
                        <Link
                            className="carousel-control-next"
                            to="#product-carousel"
                            data-slide="next"
                        >
                            <i className="fa fa-2x fa-angle-right text-dark"></i>
                        </Link>
                    </div>
                </div> */}
                <ShopDetailImage />
                {/* <div className="col-lg-7 h-auto mb-30">
                    <div className="h-100 bg-light p-30">
                        <h3>Product Name Goes Here</h3>
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star-half-alt"></small>
                                <small className="far fa-star"></small>
                            </div>
                            <small className="pt-1">(99 Reviews)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">$150.00</h3>
                        <p className="mb-4">
                            Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam
                            stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no
                            sea Nonumy
                        </p>
                        <div className="d-flex mb-3">
                            <strong className="text-dark mr-3">Sizes:</strong>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="size-1"
                                        name="size"
                                    />
                                    <label className="custom-control-label" for="size-1">
                                        XS
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="size-2"
                                        name="size"
                                    />
                                    <label className="custom-control-label" for="size-2">
                                        S
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="size-3"
                                        name="size"
                                    />
                                    <label className="custom-control-label" for="size-3">
                                        M
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="size-4"
                                        name="size"
                                    />
                                    <label className="custom-control-label" for="size-4">
                                        L
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="size-5"
                                        name="size"
                                    />
                                    <label className="custom-control-label" for="size-5">
                                        XL
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex mb-4">
                            <strong className="text-dark mr-3">Colors:</strong>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="color-1"
                                        name="color"
                                    />
                                    <label className="custom-control-label" for="color-1">
                                        Black
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="color-2"
                                        name="color"
                                    />
                                    <label className="custom-control-label" for="color-2">
                                        White
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="color-3"
                                        name="color"
                                    />
                                    <label className="custom-control-label" for="color-3">
                                        Red
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="color-4"
                                        name="color"
                                    />
                                    <label className="custom-control-label" for="color-4">
                                        Blue
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id="color-5"
                                        name="color"
                                    />
                                    <label className="custom-control-label" for="color-5">
                                        Green
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex align-items-center mb-4 pt-2">
                            <div className="input-group quantity mr-3" style="width: 130px">
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-minus">
                                        <i className="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="form-control bg-secondary border-0 text-center"
                                    value="1"
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-plus">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-primary px-3">
                                <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                            </button>
                        </div>
                        <div className="d-flex pt-2">
                            <strong className="text-dark mr-2">Share on:</strong>
                            <div className="d-inline-flex">
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-pinterest"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> */}
                <ShopDetailInfo />
            </div>
            <div className="row px-xl-5">
                <div className="col">
                    <div className="bg-light p-30">
                        <div className="nav nav-tabs mb-4">
                            <a
                                className={`nav-item nav-link text-dark   ${
                                    hashtag === '#mo-ta' ? 'active' : ''
                                }`}
                                data-toggle="tab"
                                href="#mo-ta"
                            >
                                Mô tả
                            </a>

                            <a
                                className={`nav-item nav-link text-dark ${
                                    hashtag === '#binh-luan' ? 'active' : ''
                                }`}
                                data-toggle="tab"
                                href="#binh-luan"
                            >
                                Bình luận ({comment?.pagination.total || 0})
                            </a>
                        </div>
                        <div className="tab-content">
                            <div
                                className={`tab-pane ${
                                    hashtag === '#mo-ta' ? 'show active' : 'fade'
                                }`}
                                id="mo-ta"
                            >
                                <h4 className="mb-3">Mô tả sản phẩm</h4>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product && product.description,
                                    }}
                                />
                            </div>

                            <div
                                className={`tab-pane ${
                                    hashtag === '#binh-luan' ? 'show active' : 'fade'
                                }`}
                                id="binh-luan"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">
                                            {comment?.pagination.total || 0} đánh giá cho "
                                            {product && product.product_name}"
                                        </h4>
                                        <ProductComment />
                                    </div>
                                    <div className="col-md-6">
                                        <FormReview />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetail;
