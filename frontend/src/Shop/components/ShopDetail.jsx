import React from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetailContext } from '../pages/DetailProduct';
import FormReview from './FormReview';
import ProductComment from './ProductComment';
import ShopDetailImage from './ShopDetailImage';
import ShopDetailInfo from './ShopDetailInfo';
import RecommendProduct from './RecommendProduct';
import SameProduct from './SameProduct';

const ShopDetail = () => {
    var { product, comment } = useContext(ProductDetailContext);
    product = product ? product[0] : false;
    console.log(product);
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
                <ShopDetailImage />

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
            <RecommendProduct product_id={product.product_id} />
            <SameProduct category_id={product.category_id} />
        </div>
    );
};

export default ShopDetail;
