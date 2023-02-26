import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetailContext } from '../pages/DetailProduct';
import ShopDetailImage from './ShopDetailImage';
import ShopDetailInfo from './ShopDetailInfo';

const ShopDetail = () => {
    const products = useContext(ProductDetailContext);
    const product = products ? products[0] : false;
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
                                className="nav-item nav-link text-dark active"
                                data-toggle="tab"
                                href="#tab-pane-1"
                            >
                                Mô tả
                            </a>
                            <a
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                href="#tab-pane-2"
                            >
                                Information
                            </a>
                            <a
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                href="#tab-pane-3"
                            >
                                Reviews (0)
                            </a>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab-pane-1">
                                <h4 className="mb-3">Mô tả sản phẩm</h4>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product && product.description,
                                    }}
                                />
                            </div>
                            <div className="tab-pane fade" id="tab-pane-2">
                                <h4 className="mb-3">Additional Information</h4>
                                <p>
                                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
                                    Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero
                                    diam ea vero et dolore rebum, dolor rebum eirmod consetetur
                                    invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd
                                    ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod.
                                    Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut
                                    diam consetetur duo justo est, sit sanctus diam tempor aliquyam
                                    eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at
                                    sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                                    sanctus eirmod takimata dolor ea invidunt.
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod
                                                takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos
                                                sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet
                                                eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo
                                                voluptua. Nonumy.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod
                                                takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos
                                                sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet
                                                eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo
                                                voluptua. Nonumy.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">1 review for "Product Name"</h4>
                                        <div className="media mb-4">
                                            <img
                                                src="img/user.jpg"
                                                alt="Image"
                                                className="img-fluid mr-3 mt-1"
                                                style={{ width: '45px' }}
                                            />
                                            <div className="media-body">
                                                <h6>
                                                    John Doe
                                                    <small>
                                                        {' '}
                                                        - <i>01 Jan 2045</i>
                                                    </small>
                                                </h6>
                                                <div className="text-primary mb-2">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star-half-alt"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                                <p>
                                                    Diam amet duo labore stet elitr ea clita ipsum,
                                                    tempor labore accusam ipsum et no at. Kasd diam
                                                    tempor rebum magna dolores sed sed eirmod ipsum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-4">Leave a review</h4>
                                        <small>
                                            Your email address will not be published. Required
                                            fields are marked *
                                        </small>
                                        <div className="d-flex my-3">
                                            <p className="mb-0 mr-2">Your Rating * :</p>
                                            <div className="text-primary">
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label for="message">Your Review *</label>
                                                <textarea
                                                    id="message"
                                                    cols="30"
                                                    rows="5"
                                                    className="form-control"
                                                ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label for="name">Your Name *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Your Email *</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                />
                                            </div>
                                            <div className="form-group mb-0">
                                                <input
                                                    type="submit"
                                                    value="Leave Your Review"
                                                    className="btn btn-primary px-3"
                                                />
                                            </div>
                                        </form>
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
