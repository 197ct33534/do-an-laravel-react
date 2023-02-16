import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import '../css/Custom.css';
const Carousel = () => {
    const options = {
        loop: true,
        margin: 30,
        nav: false,
        autoplay: true,
        // autoplayTimeout: '3000',

        // animateOut: true,
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
                                // style={{ height: ` calc(100vh - ${'175'}px )` }}
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/76b79ffc-6eee-4dcf-8fb3-22ee3f42150e.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                // style={{ height: ` calc(100vh - ${'175'}px )` }}
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/efcab46b-6a33-4417-99a8-f514b0ef27ad.png"
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
