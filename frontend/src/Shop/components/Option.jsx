import React from 'react';

const Option = () => {
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                        className="d-flex align-items-center bg-light mb-4"
                        style={{ padding: '26px' }}
                    >
                        <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                        <h5
                            className="font-weight-semi-bold m-0"
                            style={{ textTransform: 'capitalize' }}
                        >
                            Sản phẩm chất lượng
                        </h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                        className="d-flex align-items-center bg-light mb-4"
                        style={{ padding: '26px' }}
                    >
                        <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                        <h5
                            className="font-weight-semi-bold m-0"
                            style={{ textTransform: 'capitalize' }}
                        >
                            Miễn phí vận chuyển
                        </h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                        className="d-flex align-items-center bg-light mb-4"
                        style={{ padding: '26px' }}
                    >
                        <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                        <h5
                            className="font-weight-semi-bold m-0"
                            style={{ textTransform: 'capitalize' }}
                        >
                            Hỗ trợ đổi trả
                        </h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div
                        className="d-flex align-items-center bg-light mb-4"
                        style={{ padding: '26px' }}
                    >
                        <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                        <h5
                            className="font-weight-semi-bold m-0"
                            style={{ textTransform: 'capitalize' }}
                        >
                            {' '}
                            Hỗ trợ 24/7
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Option;
