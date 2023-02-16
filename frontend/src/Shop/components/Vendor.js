import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { brandList } from '../../features/shopSlice';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const Vendor = () => {
    const brands = useSelector(brandList);
    const options = {
        loop: true,
        // margin: 16,
        nav: false,
        autoplay: true,
        autoplayTimeout: '1000',
        autoplayHoverPause: true,
        animateIn: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 6,
            },
        },
    };
    return (
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                <div className="col">
                    <OwlCarousel loop {...options}>
                        {brands.map(
                            (brand) =>
                                brand.image && (
                                    <div
                                        className="bg-light "
                                        key={'vendor-' + brand.id}
                                        // style={{ marginRight: '16px' }}
                                    >
                                        <img
                                            src={brand.image}
                                            style={{
                                                width: '100%',
                                                objectFit: 'contain',
                                                height: '200px',
                                            }}
                                            alt={brand.name}
                                        />
                                    </div>
                                )
                        )}
                    </OwlCarousel>
                </div>
            </div>
        </div>
    );
};

export default memo(Vendor);
