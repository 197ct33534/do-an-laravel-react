import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import InputField from '../../components/Form/InputField';
import { cartCount } from '../../features/shopSlice';
import { capitalized, numberWithCommas } from '../../Helper/Funtion';
import { ruleCheckOut } from '../../rules/ruleCheckout';
import Breadcrumb from './Breadcrumb';

const CheckOut = () => {
    const carts = useSelector(cartCount);
    const products = carts.cart_detail;
    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
        {
            name: 'Giỏ hàng',
            link: '/gio-hang',
        },
        {
            name: 'Thanh toán',
        },
    ];
    const [check, setCheck] = useState(false);

    const schema = yup.object(ruleCheckOut(check)).required();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            name2: '',
            phone2: '',
            email2: '',
            address2: '',
            note: '',
        },
        resolver: yupResolver(schema),
    });

    let total = 0;
    const handleSubmitCheckOut = (data) => {
        console.log(data);
    };

    return (
        <>
            <Breadcrumb PathList={BreadPath} />
            <div className="container-fluid">
                <form onSubmit={handleSubmit(handleSubmitCheckOut)}>
                    <div className="row px-xl-5">
                        <div className="col-lg-7">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">Địa chỉ thanh toán</span>
                            </h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <InputField
                                            control={control}
                                            label="Họ và tên"
                                            name="name"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <InputField
                                            control={control}
                                            label="Số điện thoại"
                                            name="phone"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <InputField control={control} label="Email" name="email" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <InputField
                                            control={control}
                                            label="Địa chỉ"
                                            name="address"
                                        />
                                    </div>
                                    <div InputField="col-md-12 form-group">
                                        <InputField
                                            control={control}
                                            label="Ghi chú"
                                            size="large"
                                            name="note"
                                        />
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="shipto"
                                                checked={check}
                                                value={check}
                                                onChange={() => setCheck(!check)}
                                            />
                                            <label
                                                className="custom-control-label"
                                                for="shipto"
                                                data-toggle="collapse"
                                                data-target="#shipping-address"
                                            >
                                                Giao đến địa chỉ khác
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse mb-5" id="shipping-address">
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">ĐỊA CHỈ GIAO HÀNG</span>
                                </h5>
                                <div className="bg-light p-30">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <InputField
                                                control={control}
                                                label="Họ và tên "
                                                name="name2"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <InputField
                                                control={control}
                                                label="Số điện thoại "
                                                name="phone2"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <InputField
                                                control={control}
                                                label="Email"
                                                name="email2"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <InputField
                                                control={control}
                                                label="Địa chỉ"
                                                name="address2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">TỔNG ĐƠN HÀNG</span>
                            </h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom">
                                    <h6 className="mb-3">Sản phẩm</h6>
                                    {products?.map((product) => {
                                        const totalproduct =
                                            product.product_price * product.prod_qty;
                                        total += totalproduct;
                                        return (
                                            <>
                                                <div
                                                    className="d-flex justify-content-between"
                                                    key={product.cart_id}
                                                >
                                                    <p>
                                                        {product.product_name} <br />
                                                        <span>
                                                            Mã sản phẩm : {product.product_item_id}
                                                        </span>
                                                        <br />
                                                        {product.product_items.attribute_value.map(
                                                            (e) => (
                                                                <>
                                                                    <span className="text-left">
                                                                        {`${capitalized(
                                                                            e.attribute_name
                                                                        )}: ${capitalized(
                                                                            e.value
                                                                        )}`}
                                                                    </span>
                                                                    <br />
                                                                </>
                                                            )
                                                        )}
                                                    </p>
                                                    <p style={{ textAlign: 'right' }}>
                                                        <span>
                                                            {numberWithCommas(
                                                                product.product_price
                                                            )}
                                                        </span>
                                                        <br />
                                                        <span>x {product.prod_qty}</span>
                                                        <br />
                                                        <span>
                                                            {` ${numberWithCommas(totalproduct)}`}
                                                        </span>
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                                <div className="border-bottom pt-3 pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Tổng </h6>
                                        <h6>{numberWithCommas(total)}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Phí giao hàng</h6>
                                        <h6 className="font-weight-medium">
                                            {total > 500000 ? 0 : numberWithCommas(30000)}
                                        </h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Tổng tiền</h5>
                                        <h5>
                                            {total > 500000
                                                ? numberWithCommas(total)
                                                : numberWithCommas(total + 30000)}
                                        </h5>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                                        Lưu ý: Hóa đơn trên {numberWithCommas(500000)} sẽ được
                                        freeship trên toàn quốc
                                    </p>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">Payment</span>
                                </h5>
                                <div className="bg-light p-30">
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="paypal"
                                            />
                                            <label className="custom-control-label" for="paypal">
                                                Paypal
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="directcheck"
                                            />
                                            <label
                                                className="custom-control-label"
                                                for="directcheck"
                                            >
                                                Direct Check
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="banktransfer"
                                            />
                                            <label
                                                className="custom-control-label"
                                                for="banktransfer"
                                            >
                                                Bank Transfer
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-block btn-primary font-weight-bold py-3"
                                        type="submit"
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CheckOut;
