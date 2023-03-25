import React, { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../../components/Form/InputField';
import { cartCount } from '../../features/shopSlice';
import { CartCountAsync, deleteCartAsync, updateCartAsync } from '../../features/shopThunk';
import { configToast } from '../../Helper/Config';
import { capitalized, numberWithCommas } from '../../Helper/Funtion';
import Breadcrumb from './Breadcrumb';
const MyCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector(cartCount);
    const products = carts.cart_detail;
    let total = 0;
    let ship = 0;
    const totalShip = () => {
        if (total === 0 || total > 500000) return 0;

        return 30000;
    };
    const { control, reset, watch, setValue } = useForm({
        defaultValues: useMemo(() => {
            return { productList: products };
        }, [products]),
    });
    const { fields } = useFieldArray({
        control,
        name: 'productList',
    });

    useEffect(() => {
        reset({ productList: products });
    }, [products]);
    const handleInputQtyChange = (product, index) => {
        const updateField = {
            ...product,
            prod_qty: watch(`productList.${index}.prod_qty`),
        };

        dispatch(updateCartAsync(updateField));
        dispatch(CartCountAsync());
    };
    const handleQtyBtn = (product, index, number) => {
        const qty = watch(`productList.${index}.prod_qty`) + number;
        if (qty > 0 && qty <= 99) {
            setValue(`productList.${index}.prod_qty`, qty);
            const updateField = { ...product, prod_qty: qty };

            dispatch(updateCartAsync(updateField));
            dispatch(CartCountAsync());
        } else {
            toast.warning('Vui lòng chọn số lượng từ 1 đến 99', configToast);
        }
    };
    const handleDeleteCart = async (cart_id) => {
        await dispatch(deleteCartAsync(cart_id));
        await dispatch(CartCountAsync());
    };
    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
        {
            name: 'Giỏ hàng',
        },
    ];
    return (
        <>
            <Breadcrumb PathList={BreadPath} />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Giỏ hàng của bạn</span>
                        </h5>
                        <table
                            className="table table-light table-borderless table-hover text-center mb-0"
                            style={{ width: '100%', overflowX: 'auto' }}
                        >
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '10%', textAlign: 'left' }}>Ảnh</th>
                                    <th style={{ width: '20%', textAlign: 'left' }}>Sản phẩm</th>
                                    <th style={{ width: '20%', textAlign: 'left' }}>Lựa chọn</th>

                                    <th>Đơn giá</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>Số lượng</th>
                                    <th style={{ textAlign: 'right' }}>Tổng</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {products?.map((product, index) => {
                                    total += product.product_price * product.prod_qty;
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    <img
                                                        src={product.product_items.image}
                                                        alt=""
                                                        style={{ width: ' 100px' }}
                                                    />
                                                </td>
                                                <td
                                                    className="align-middle"
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    <span>{product.product_name}</span>
                                                </td>
                                                <td
                                                    className="align-middle "
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    {product.product_items.attribute_value.map(
                                                        (e) => (
                                                            <>
                                                                <span className="text-left">
                                                                    {capitalized(e.attribute_name)}:{' '}
                                                                    {capitalized(e.value)}
                                                                </span>
                                                                <br />
                                                            </>
                                                        )
                                                    )}
                                                </td>
                                                <td className="align-middle">
                                                    {numberWithCommas(product.product_price)}
                                                </td>
                                                <td className="align-middle">
                                                    <div
                                                        className="input-group quantity mx-auto"
                                                        style={{
                                                            width: '200px',
                                                            gap: '8px',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <div
                                                            className="input-group-btn"
                                                            onClick={() =>
                                                                handleQtyBtn(product, index, -1)
                                                            }
                                                        >
                                                            <button className="btn btn-sm btn-primary btn-minus">
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="input-group-btn"
                                                            style={{ width: '80px' }}
                                                            textAlign="center"
                                                        >
                                                            <InputField
                                                                control={control}
                                                                label="Số lượng"
                                                                name={`productList.${index}.prod_qty`}
                                                                style={{ textAlign: 'center' }}
                                                                type="number"
                                                                min={1}
                                                                max={99}
                                                                onBlur={() =>
                                                                    handleInputQtyChange(
                                                                        product,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            className="input-group-btn"
                                                            onClick={() =>
                                                                handleQtyBtn(product, index, 1)
                                                            }
                                                        >
                                                            <button className="btn btn-sm btn-primary btn-plus">
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className="align-middle"
                                                    style={{ textAlign: 'right' }}
                                                >
                                                    {numberWithCommas(
                                                        product.product_price * product.prod_qty
                                                    )}
                                                </td>
                                                <td className="align-middle">
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            handleDeleteCart(product.cart_id)
                                                        }
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                                {products?.length === 0 && (
                                    <>
                                        <tr>
                                            <td colSpan={7} rowSpan={5}>
                                                <h3>Giỏ hàng của bạn đang trống</h3>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Tổng hóa đơn</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Tổng</h6>
                                    <h6>{numberWithCommas(total)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Phí giao hàng</h6>
                                    <h6 className="font-weight-medium">
                                        {numberWithCommas(totalShip())}
                                    </h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Tổng hóa đơn</h5>
                                    <h5>
                                        {total > 500000
                                            ? numberWithCommas(total)
                                            : numberWithCommas(total + totalShip())}
                                    </h5>
                                </div>
                                <button
                                    className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                                    onClick={() => {
                                        navigate('/thanh-toan');
                                    }}
                                >
                                    Thanh toán
                                </button>
                            </div>
                            <div className="pt-2">
                                <p style={{ color: 'red', fontStyle: 'italic' }}>
                                    Lưu ý: Hóa đơn trên {numberWithCommas(500000)} sẽ được freeship
                                    trên toàn quốc
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyCart;
