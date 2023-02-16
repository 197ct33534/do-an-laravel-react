import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/Form/InputField';

const Header = () => {
    return (
        <div className="container-fluid">
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <Link to="" className="text-decoration-none">
                        <span className="h1 text-uppercase text-primary bg-dark px-2">Nghĩa</span>
                        <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                            Store
                        </span>
                    </Link>
                </div>
                <div className="col-lg-4 col-6 text-left">
                    <form action="">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm sản phẩm"
                            />

                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Hotline</p>
                    <h5 className="m-0">0967847582</h5>
                </div>
            </div>
        </div>
    );
};

export default Header;
