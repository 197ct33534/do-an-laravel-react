import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-12">
                    <nav className="breadcrumb bg-light mb-30">
                        <Link className="breadcrumb-item text-dark" href="#">
                            Home
                        </Link>
                        <Link className="breadcrumb-item text-dark" href="#">
                            Shop
                        </Link>
                        <span className="breadcrumb-item active">Shop Detail</span>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
