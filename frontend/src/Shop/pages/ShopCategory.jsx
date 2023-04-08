import { Checkbox, FormControlLabel, FormGroup, Pagination, Slider } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchgetProductCategory } from '../../features/shopApi';
import Breadcrumb from '../components/Breadcrumb';
import ProductCategoryList from '../components/ProductCategoryList';
import MultiRangeSlider from '../../components/Form/MultiRangeSlider';
import SelectField from '../../components/Form/SelectField';

const ShopCategory = () => {
    const param = useParams();
    const [respone, setRespone] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const initalSearch = {
        perPage: 9,
        page: 1,
        category_id: param?.category_id,
    };
    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    console.log({ param, stateSearch });

    // const [initalSearch, setInitalSearch] = useState({ perPage: 9 });
    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
    ];

    const fetchProductCategory = async (data = stateSearch) => {
        const response = await fetchgetProductCategory(data);
        if (response.data.success) {
            setRespone(response.data);
            let temp = { perPage: data.perPage, price: null };
            response.data.data_filter.name.map((val) => {
                temp[val.name.toLowerCase()] = [];
            });

            reset(temp);
        }
    };
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return stateSearch;
        }, [stateSearch]),
    });

    const onSubmit = (data) => {
        const price = {};
        if (data.price) {
            price.max_price = data.price.max;
            price.min_price = data.price.min;
        }
        let newParam = {
            ...param,
            ...price,
            perPage: data.perPage,
        };
        Object.keys(data).map((k) => {
            if (data[k]?.length > 0) {
                newParam[k] = [...data[k]];
            }
        });
        // console.log(newParam);
        setStateSearch(newParam);
        setSearchParams(newParam);
        // fetchProductCategory(newParam);
    };
    const handlePageChange = (e, page) => {
        console.log(page);
    };
    useEffect(() => {
        // reset(stateSearch);
        fetchProductCategory();
    }, [stateSearch]);

    return (
        <>
            {respone?.category_tree && (
                <Breadcrumb PathList={BreadPath.concat(respone?.category_tree)} />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-4">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">Lọc theo giá</span>
                            </h5>
                            <div className="bg-light p-4 mb-30" style={{ height: '72px' }}>
                                <Controller
                                    control={control}
                                    name="price"
                                    render={({
                                        field: { onChange, onBlur, value, name, ref },
                                        fieldState: { invalid, isTouched, isDirty, error },
                                        formState,
                                    }) => (
                                        <MultiRangeSlider
                                            min={10000}
                                            max={2000000}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>

                            {respone?.data_filter &&
                                Object.entries(respone?.data_filter.data).map((k, v) => (
                                    <>
                                        <h5
                                            className="section-title position-relative text-uppercase mb-3"
                                            key={k}
                                        >
                                            <span className="bg-secondary pr-3">
                                                Lọc theo &nbsp;
                                                {
                                                    respone?.data_filter.name.find(
                                                        (i) => i.id == k[0]
                                                    ).name
                                                }
                                            </span>
                                        </h5>
                                        <div
                                            className={`bg-light px-4 mb-30 ${respone?.data_filter.name
                                                .find((i) => i.id == k[0])
                                                .name.toLowerCase()}`}
                                        >
                                            <FormGroup>
                                                <Controller
                                                    name={respone?.data_filter.name
                                                        .find((i) => i.id == k[0])
                                                        .name.toLowerCase()}
                                                    control={control}
                                                    render={({ field }) => {
                                                        return (
                                                            <>
                                                                {k[1]?.map((item, idx) => (
                                                                    <FormControlLabel
                                                                        key={`${param.category_id}-${item.label}-${idx}-${item.value}`}
                                                                        label={item.label}
                                                                        control={
                                                                            <Checkbox
                                                                                value={item.value}
                                                                                onChange={(
                                                                                    event,
                                                                                    checked
                                                                                ) => {
                                                                                    if (checked) {
                                                                                        field.onChange(
                                                                                            [
                                                                                                ...field.value,
                                                                                                event
                                                                                                    .target
                                                                                                    .value,
                                                                                            ]
                                                                                        );
                                                                                    } else {
                                                                                        field.onChange(
                                                                                            field.value.filter(
                                                                                                (
                                                                                                    value
                                                                                                ) =>
                                                                                                    value !==
                                                                                                    event
                                                                                                        .target
                                                                                                        .value
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            />
                                                                        }
                                                                    />
                                                                ))}
                                                            </>
                                                        );
                                                    }}
                                                />
                                            </FormGroup>
                                        </div>
                                    </>
                                ))}
                            <div className="bg-light mb-3">
                                <input
                                    type="submit"
                                    className="btn btn-primary d-block "
                                    value="Tìm kiếm"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="row pb-3">
                                <div className="col-12 pb-1">
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div style={{ flexGrow: '6' }}>
                                            <button className="btn btn-sm btn-light">
                                                <i className="fa fa-th-large"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light ml-2">
                                                <i className="fa fa-bars"></i>
                                            </button>
                                        </div>
                                        <div className="ml-2 " style={{ flexGrow: '1' }}>
                                            {/* <div className="btn-group ml-2"> */}
                                            <SelectField
                                                control={control}
                                                label="Số lượng"
                                                name="perPage"
                                                maxHeight="50%"
                                                options={[
                                                    { label: 6, value: 6 },
                                                    { label: 9, value: 9 },
                                                    { label: 12, value: 12 },
                                                    { label: 15, value: 15 },
                                                    { label: 18, value: 18 },
                                                ]}
                                            />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                                <ProductCategoryList productList={respone?.data.data} />
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <Pagination
                                xs={12}
                                color="warning"
                                variant="success"
                                className="paginationCategory"
                                shape="rounded"
                                page={respone?.data.pagination.current_page}
                                count={Math.ceil(
                                    respone?.data.pagination.total /
                                        respone?.data.pagination.per_page
                                )}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ShopCategory;
