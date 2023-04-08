import React, { useContext } from 'react';
import { memo } from 'react';

import ReactImageMagnify from 'react-image-magnify';
import OwlCarousel from 'react-owl-carousel';
import SliderImage from 'react-zoom-slider';
import { ProductDetailContext } from '../pages/DetailProduct';
const ShopDetailImage = () => {
    const { product } = useContext(ProductDetailContext);
    const arr_image = [];
    if (product) {
        arr_image.push({ image: product[0]?.product_image });
        product[0]?.product_items.forEach((element) => {
            arr_image.push({ image: element.image });
        });
    }

    const options = {
        loop: true,
        autoplayTimeout: '1000',

        autoplayHoverPause: true,
        dots: true,
        center: true,
        fallbackEasing: 'swing',
        responsive: {
            0: {
                items: 1,
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
        <div className="col-lg-5  ">
            <div className="d-none d-sm-none bg-light d-lg-block">
                {product && (
                    <SliderImage
                        data={arr_image}
                        width="500px"
                        showDescription={true}
                        direction="right"
                        // max-height= '550px'
                        // height="500px"
                    />
                )}
            </div>
            <div className="d-lg-none d-xs-block d-sm-block ">
                {product && (
                    <>
                        <OwlCarousel loop {...options}>
                            <ReactImageMagnify
                                key={product.product_id}
                                {...{
                                    smallImage: {
                                        alt: `${product.name}`,
                                        isFluidWidth: true,
                                        src: `${product[0].product_image}`,
                                    },
                                    largeImage: {
                                        src: `${product[0].product_image}`,
                                        width: 1200,
                                        height: 1800,
                                    },
                                }}
                                className="shopdetail-zoom"
                            />
                            {product[0]?.product_items.map((item) => (
                                <ReactImageMagnify
                                    key={item.product_item_id}
                                    {...{
                                        smallImage: {
                                            alt: `${product.name}`,
                                            isFluidWidth: true,
                                            src: `${item.image}`,
                                        },
                                        largeImage: {
                                            src: `${item.image}`,
                                            width: 1200,
                                            height: 1800,
                                        },
                                    }}
                                    className="shopdetail-zoom"
                                />
                            ))}
                        </OwlCarousel>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(ShopDetailImage);
