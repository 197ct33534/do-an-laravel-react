import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ PathList }) => {
    return (
        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-12">
                    <nav className="breadcrumb bg-light mb-30">
                        {PathList?.map((path, index) =>
                            index == PathList.length - 1 ? (
                                <span className="breadcrumb-item active">{path.name}</span>
                            ) : (
                                <Link className="breadcrumb-item text-dark" to={path.link}>
                                    {path.name}
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
