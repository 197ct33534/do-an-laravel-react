import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
            <div className="row px-xl-5 pt-5">
                <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                    <h5 className="text-secondary text-uppercase mb-4">Liên lạc</h5>

                    <p className="mb-2">
                        <i className="fa fa-map-marker-alt text-primary mr-3"></i>51b đường 26
                        phường Cát Lái thành phố Thủ Đức thành phố Hồ Chí Minh
                    </p>
                    <p className="mb-2">
                        <i className="fa fa-envelope text-primary mr-3"></i>
                        nghia.197ct33534@vanlanguni.vn
                    </p>
                    <p className="mb-0">
                        <i className="fa fa-phone-alt text-primary mr-3"></i>0967847582
                    </p>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <h5 className="text-secondary text-uppercase mb-4">
                                Trung tâm trợ giúp
                            </h5>
                            <div className="d-flex flex-column justify-content-start">
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Hướng dẫn mua hàng
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Hướng dẫn chọn size
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Chính sách Bảo hành &
                                    Đổi trả
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Chính sách khách hàng
                                    thành viên
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Chính sách vận chuyển
                                </Link>
                                <Link className="text-secondary" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Câu hỏi thường gặp
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h5 className="text-secondary text-uppercase mb-4">Về chúng tôi</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Giới thiệu
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Hệ thống cửa hàng
                                </Link>
                                <Link className="text-secondary mb-2" to="#">
                                    <i className="fa fa-angle-right mr-2"></i>Tuyển dụng
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h5 className="text-secondary text-uppercase mb-4">
                                Đăng ký nhận tin từ Store
                            </h5>

                            <form action="">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ Email"
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Đăng ký</button>
                                    </div>
                                </div>
                            </form>
                            <h6 className="text-secondary text-uppercase mt-4 mb-3">
                                Theo dõi chúng tôi
                            </h6>
                            <div className="d-flex">
                                <Link className="btn btn-primary btn-square mr-2" to="#">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link className="btn btn-primary btn-square mr-2" to="#">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link className="btn btn-primary btn-square mr-2" to="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link className="btn btn-primary btn-square" to="#">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
