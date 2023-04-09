import { Checkbox, FormControlLabel, FormGroup, Pagination } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import MultiRangeSlider from '../../components/Form/MultiRangeSlider';
import SelectField from '../../components/Form/SelectField';
import { fetchgetProductCategory } from '../../features/shopApi';
import Breadcrumb from '../components/Breadcrumb';
import ProductCategoryList from '../components/ProductCategoryList';

const ShopCategory = () => {
    const param = useParams();
    const [respone, setRespone] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const s_param = new URLSearchParams(searchParams);

    const searchAsObject = { ...Object.fromEntries(s_param) };
    const { max_price, min_price, category_id, page, perPage, ...rest } = searchAsObject;
    if (max_price || min_price) {
        searchAsObject.price = { max: max_price, min: min_price };
        delete searchAsObject[max_price];
        delete searchAsObject[min_price];
    }

    Object.keys(rest).map((k) => {
        searchAsObject[k] = s_param.getAll(k);
    });

    const initalSearch = {
        perPage: 9,
        page: 1,
        category_id: param?.category_id,
    };

    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );

    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
    ];

    const fetchProductCategory = async (data = stateSearch) => {
        if (data.category_id) {
            const response = await fetchgetProductCategory(data);
            if (response.data.success) {
                setRespone(response.data);
                if (Object.keys(data).length === 0) {
                    let temp = { perPage: data.perPage, price: null };
                    response.data.data_filter.name.map((val) => {
                        temp[val.name.toLowerCase()] = [];
                    });

                    reset(temp);
                }
            }
        }
    };
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return stateSearch;
        }, [stateSearch]),
    });

    const onSubmit = (data) => {
        delete data.max_price;
        delete data.min_price;
        delete data.category_id;

        const price = {};
        if (!(data?.max_price || data?.min_price)) {
            if (data.price) {
                price.max_price = data.price.max;
                price.min_price = data.price.min;
            }
        }

        let newParam = {
            ...param,
            ...price,
            perPage: data.perPage,
        };

        Object.keys(data).map((k) => {
            if (Array.isArray(newParam[k])) {
                newParam[k] = [...data[k]];
            }
        });
        // console.log(newParam);
        setStateSearch(newParam);
        setSearchParams(newParam);
        // fetchProductCategory(newParam);
    };
    const handlePageChange = (e, nextPage) => {
        if (!(nextPage == page)) {
            const { category_id } = param;

            const newParam = {
                ...stateSearch,
                page: nextPage,
                perPage: respone?.data.pagination.per_page,
                category_id,
            };
            Object.keys(newParam).map((k) => {
                if (Array.isArray(newParam[k])) {
                    newParam[k] = [...newParam[k]];
                }
            });
            setStateSearch(newParam);
            setSearchParams(newParam);
        }
    };
    useEffect(() => {
        // reset(stateSearch);
        fetchProductCategory();
    }, [stateSearch]);
    // console.log(control);
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
                                            currentMax={max_price || 2000000}
                                            currentMin={min_price || 10000}
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
                                                                                checked={field.value?.includes(
                                                                                    item.value + ''
                                                                                )}
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
                                                                                                    value !=
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
                                variant="outlined"
                                className={`paginationCategory ${
                                    respone?.data.pagination.current_page
                                } ${+page || 1}`}
                                shape="rounded"
                                page={+page || 1}
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
