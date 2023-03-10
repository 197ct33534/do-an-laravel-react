import { Box } from '@mui/material';
import $ from 'jquery';
import React, { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../components/Form/InputField';
import { fetchAddCart } from '../../features/shopApi';
import { CartCountAsync } from '../../features/shopThunk';
import { configToast } from '../../Helper/Config';
import { numberWithCommas, removeValuteEmpty } from '../../Helper/Funtion';
import { ProductDetailContext } from '../pages/DetailProduct';
const ShopDetailInfo = () => {
    const dispatch = useDispatch();
    const products = useContext(ProductDetailContext);
    const product = products ? products[0] : false;
    // console.log(product);
    const options = [];
    const attributes = { key: [] };
    const notInArray = (arr, value) => {
        if (arr.some((obj) => obj.value === value)) {
            return false;
        } else {
            return true;
        }
    };

    product.product_items?.map((element) => {
        // const temp = element.attribute_value.map((attr) => {
        //     return `${attr.attribute_name}: ${attr.value}`;
        // });
        // options.push({
        //     value: element.product_item_id,
        //     label: temp.join(' - '),
        // });
        let myObjectcode = { id: element.product_item_id };
        element.attribute_value.map((attr) => {
            if (!attributes.hasOwnProperty(attr.attribute_name)) {
                attributes[attr.attribute_name] = [];
                attributes['key'].push(attr.attribute_name);
            }
            const temp = { label: attr.value, value: attr.value_code };
            if (notInArray(attributes[attr.attribute_name], attr.value_code)) {
                attributes[attr.attribute_name].push(temp);
            }
            myObjectcode[attr.attribute_name] = attr.value_code + '';
        });
        options.push(myObjectcode);
    });

    const intial = { product_id: '', number: 1 };
    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: useMemo(() => {
            return intial;
        }, [intial]),
    });
    const handleIncrease = () => {
        setValue('number', getValues('number') + 1);
    };
    const handleDecrease = () => {
        setValue('number', getValues('number') - 1);
    };
    const onSubmit = (formValue) => {
        const choose_radio = {};

        attributes.key.map((name) => {
            choose_radio[name] = $(`input[name='product_${name}']:checked`).val();
        });
        const keyChose = Object.keys(removeValuteEmpty(choose_radio));

        const array_key = attributes.key
            .filter((x) => !keyChose.includes(x))
            .concat(keyChose.filter((x) => !attributes.key.includes(x)));

        if (array_key.length > 0) {
            toast.warning(`Vui l??ng ch???n ${array_key.join(' v?? ')} !`, configToast);
        } else {
            const product_id = options.find((option) => {
                const temp = { ...option };
                delete temp.id;
                if (JSON.stringify(temp) === JSON.stringify(choose_radio)) {
                    return option;
                }
            });

            const data = {
                product_item_id: product_id.id,
                prod_qty: getValues('number'),
                product_id: product.product_id,
            };
            handleAddCart(data);
        }
    };
    // $("input[name^='product_']").on('change', (e) => {
    //     const choose_radio = {};
    //     attributes.key.map((name) => {
    //         choose_radio[name] = $(`input[name='product_${name}']:checked`).val();
    //     });

    //     options.map(option =>{
    //         attributes.key.map((name)=>{

    //         })
    //     })
    // });
    const handleChangeRadio = (e) => {
        const element = $(e.target);
        const target = element.data('targert');
        const value = $(`input[name='product_${target}']:checked`).val();
        var filteredArray = attributes.key.filter(function (e) {
            return e !== target;
        });

        filteredArray.map((item) => {
            $(`input[name=product_${item}]`).prop('disabled', true);
        });
        options.map((option) => {
            if (option[target] == value) {
                filteredArray.map((item) => {
                    $(`#${item}-${option[item]}`).prop('disabled', false);
                });
            }
        });
    };
    const handleAddCart = async (data) => {
        const res = await fetchAddCart(data);
        if (res.data.success === false) {
            toast.warning(res.data.message, configToast);
        } else {
            toast.success(res.data.message, configToast);
            dispatch(CartCountAsync());
        }
    };
    return (
        <div className="col-lg-7 h-auto mb-30">
            {product && (
                <div className="h-100 bg-light p-30">
                    <h3>{product.product_name}</h3>
                    <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star-half-alt"></small>
                            <small className="far fa-star"></small>
                        </div>
                        <small className="pt-1">(99 Reviews)</small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">
                        {numberWithCommas(product.product_price)}
                    </h3>
                    <div className="shopdetail-grid mb-4">
                        <strong>Th????ng hi???u :</strong>
                        <span>{product.brand_name}</span>
                        <strong>Lo???i m???t h??ng :</strong>
                        <span>{product.category_name}</span>
                        <strong>Gi???i t??nh :</strong>
                        <span>{product.gender}</span>
                    </div>

                    {attributes.key.map((name) => (
                        <div className="d-flex mb-4" key={name}>
                            <strong className="text-dark mr-3">{name}:</strong>

                            {attributes[name]?.map((value, key) => (
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        id={`${name}-${value.value}`}
                                        name={`product_${name}`}
                                        value={value.value}
                                        data-targert={name}
                                        onChange={(e) => handleChangeRadio(e)}
                                    />
                                    <label
                                        className="custom-control-label"
                                        for={`${name}-${value.value}`}
                                    >
                                        {value.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            className="d-flex  mb-4 pt-2"
                            sx={{
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                gap: { xs: '16px', sm: '0px' },
                            }}
                        >
                            <div
                                className="input-group quantity mr-3 d-flex "
                                style={{ width: '200px', gap: '16px' }}
                            >
                                <div onClick={() => handleDecrease()}>
                                    <button className="btn btn-primary btn-minus" type="button">
                                        <i className="fa fa-minus"></i>
                                    </button>
                                </div>

                                <div>
                                    <InputField
                                        control={control}
                                        onChange={() => getValues('number')}
                                        type="number"
                                        name="number"
                                        style={{ textAlign: 'center' }}
                                        min={1}
                                        max={99}
                                    />
                                </div>
                                <div onClick={() => handleIncrease()}>
                                    <button className="btn btn-primary btn-plus" type="button">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-primary px-3" type="submit">
                                <i className="fa fa-shopping-cart mr-1"></i> Th??m v??o gi??? h??ng
                            </button>
                        </Box>
                    </form>
                    <div className="d-flex pt-2">
                        <strong className="text-dark mr-2">Chia s???:</strong>
                        <div className="d-inline-flex">
                            <Link className="text-dark px-2" to="">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link className="text-dark px-2" to="">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link className="text-dark px-2" to="">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link className="text-dark px-2" to="">
                                <i className="fab fa-pinterest"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopDetailInfo;
