import React, { useContext, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryAllAsync } from '../../features/shopThunk';
import { HomeContext } from '../pages/Home';
const options = {
    loop: true,
    margin: 30,
    nav: false,
    autoplay: true,
    autoplayTimeout: '2000',
    autoplayHoverPause: true,
    animateIn: true,

    responsive: {
        0: {
            items: 1,
            dots: false,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 4,
            slideBy: 2,
        },
    },
};
const Categories = () => {
    const { categories } = useContext(HomeContext);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!categories) {
            dispatch(getCategoryAllAsync());
        }
    }, [dispatch, categories]);

    return (
        <div className="container-fluid pt-5">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">THỂ LOẠI</span>
            </h2>
            <div className="row px-xl-5 pb-3">
                {categories?.length > 0 && (
                    <OwlCarousel className="owl-theme" {...options}>
                        {categories?.map((category, i) => (
                            // <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                            <Link className="text-decoration-none" to="">
                                <div className="cat-item d-flex align-items-center mb-4 ">
                                    <div
                                        className="overflow-hidden"
                                        style={{ width: '100px', height: '100px' }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={
                                                category.product_image_avatar
                                                    ? category.product_image_avatar
                                                    : process.env.PUBLIC_URL +
                                                      '/assets/images/no-image.png'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-fill pl-3">
                                        <h6>{category.name}</h6>
                                        <small className="text-body">
                                            {category.product_count} sản phẩm
                                        </small>
                                    </div>
                                </div>
                            </Link>
                            // </div>
                        ))}
                    </OwlCarousel>
                )}
            </div>
        </div>
    );
};

export default Categories;
