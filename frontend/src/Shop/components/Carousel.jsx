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
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/f3c83835-70ce-4c6e-a2ee-37263745cfc5.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/22a4c16a-b9dc-43ac-939e-9fb36e823ea2.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/76b79ffc-6eee-4dcf-8fb3-22ee3f42150e.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/efcab46b-6a33-4417-99a8-f514b0ef27ad.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                className="img-fluid Carousel-my-image"
                                src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/169531c2-b3d7-4c65-93e3-e520ee48136a.png"
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
