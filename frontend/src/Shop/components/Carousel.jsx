import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../css/Custom.css';
const Carousel = () => {
    const options = {
        loop: true,
        margin: 30,
        nav: false,
        autoplay: true,

        lazyLoad: true,
        fallbackEasing: 'swing',
        responsive: {
            0: {
                items: 1,
                dots: false,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    };
    return (
        <div className="container-fluid mb-3">
            <div className="row px-xl-5">
                <div className="col-lg-12">
                    <OwlCarousel loop {...options}>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src={process.env.PUBLIC_URL + '/assets/images/banner_1.png'}
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src={process.env.PUBLIC_URL + '/assets/images/banner_2.png'}
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src={process.env.PUBLIC_URL + '/assets/images/banner_3.png'}
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src={process.env.PUBLIC_URL + '/assets/images/banner_4.png'}
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src={process.env.PUBLIC_URL + '/assets/images/banner_5.png'}
                                alt=""
                            />
                        </div>
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
