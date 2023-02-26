import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetailContext } from '../pages/DetailProduct';
import OwlCarousel from 'react-owl-carousel';
import ReactImageMagnify from 'react-image-magnify';

const ShopDetailImage = () => {
    const product = useContext(ProductDetailContext);

    const options = {
        loop: true,
        // margin: 30,

        // autoplay: true,
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
            {/* <div id="product-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner bg-light">
                    <div className="carousel-item active">
                        <img className="w-100 h-100" src={product.product_image} alt="Image" />
                    </div> */}
            {/* <div className="carousel-item">
                        <img className="w-100 h-100" src="img/product-2.jpg" alt="Image" />
                    </div>
                    <div className="carousel-item">
                        <img className="w-100 h-100" src="img/product-3.jpg" alt="Image" />
                    </div> */}
            {/* 
                    {product?.product_items.map((item) => (
                        <div className="carousel-item">
                            <img className="w-100 h-100" src={item.image} alt="Image" />
                        </div>
                    ))}
                </div> */}
            {/* <Link className="carousel-control-prev" to="#product-carousel" data-slide="prev">
                    <i className="fa fa-2x fa-angle-left text-dark"></i>
                </Link>
                <Link className="carousel-control-next" to="#product-carousel" data-slide="next">
                    <i className="fa fa-2x fa-angle-right text-dark"></i>
                </Link> */}
            {/* </div> */}
        </div>
    );
};

export default ShopDetailImage;
