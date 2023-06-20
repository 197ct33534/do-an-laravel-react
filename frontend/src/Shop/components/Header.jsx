import React, { useState, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchgetAllProduct } from '../../features/shopApi';

const Header = () => {
    const navidate = useNavigate();
    const [options, setOptions] = useState();

    const getDataProduct = async () => {
        const respone = await fetchgetAllProduct();
        if (respone.status) {
            setOptions(respone.data.data);
        }
    };
    const handleChange = (newValue) => {
        if (newValue) {
            navidate('san-pham/' + newValue.product_id);
        }
    };
    useEffect(() => {
        getDataProduct();
    }, []);
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
                    {/* <form action="">
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
                    </form> */}
                    <Autocomplete
                        // width="100%"
                        // value={value}
                        onChange={(event, newValue) => {
                            handleChange(newValue);
                        }}
                        getOptionLabel={(option) => option?.product_name}
                        // inputValue={inputValue}
                        // onInputChange={(event, newInputValue) => {
                        //     console.log(newInputValue);
                        //     setInputValue(newInputValue);
                        // }}
                        id="controllable-states-demo"
                        options={options ?? []}
                        noOptionsText="Không tìm thấy kết quả"
                        renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
                    />
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Hotline</p>
                    <h5 className="m-0">0967847582</h5>
                </div>
            </div>
        </div>
    );
};

export default memo(Header);
