import { yupResolver } from '@hookform/resolvers/yup';

import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import RadioField from '../../components/Form/RadioField';
import SelectField from '../../components/Form/SelectField';
import { done, pendding } from '../../features/user/userSlice';
import { configToast } from '../../Helper/Config';
import { renderError } from '../../Helper/Funtion';
import { ruleAddProduct } from '../../rules/ruleProduct';
import { fetchAttribute, fetchAttributeSet } from '../Attribute/AttributeAPI';
import { fetchBrand } from '../Brand/BrandAPI';
import { fetchCategoryAll } from '../Category/CateApi';
import { fetchPostProduct } from './productAPI';

const AddProduct = () => {
    const navigate = useNavigate();
    const imageRef = useRef();
    const dispatch = useDispatch();
    const [selectObject, setSelectObject] = useState({});
    const [selectAttribute, setSelectAttribute] = useState({});
    const [desc, setDesc] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const [defaultCate, setDefaultCate] = useState('1');
    const [attributeSet, setAttributeSet] = useState();

    const [product, setProduct] = useState({
        product_name: '',
        description: '',
        product_price: '',
        // is_sales: "",
        gender: '1',
        category: '',
        brand: '',
        active: '1',
        attributes: [{ sku: '', qty: '1', image: '', color: '', size: '' }],
    });
    const { sku, image, qty, ...rest } = product.attributes[0];

    const schema = yup.object(ruleAddProduct(Object.keys(rest))).required();
    const { control, handleSubmit, resetField } = useForm({
        defaultValues: useMemo(() => {
            return product;
        }, [product]),
        resolver: yupResolver(schema),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    });
    const handleSubmitForm = async (formValues) => {
        const formData = new FormData();
        formData.append('product_name', formValues.product_name);
        if (desc) {
            formData.append('description', desc);
        }
        formData.append('product_price', formValues.product_price);
        formData.append('active', formValues.active);
        formData.append('gender', formValues.gender);
        formData.append('brand_id', formValues.brand);
        formData.append('category_id', formValues.category);
        formData.append('attribute_set_id', defaultCate);
        formValues.attributes.map((element, idx) => {
            formData.append(`attributes[${idx}][color]`, element.color);
            formData.append(`attributes[${idx}][size]`, element.size);
            formData.append(`attributes[${idx}][sku]`, element.sku);
            formData.append(`attributes[${idx}][qty]`, element.qty);
            formData.append(`attributes[${idx}][image]`, element.image[0] ?? '');
        });
        if (selectedImage) {
            formData.append('product_image', selectedImage);
        }

        const response = await fetchPostProduct(formData);

        const success = response.data?.success;

        if (success) {
            toast.success(response.data.message, configToast);
        } else {
            if (response?.response?.status != 401) {
                setContentAlert(renderError(response?.data?.error));
                setOpenAlert(true);
            }
        }
    };
    const handleChangeDefaultCate = (event) => {
        setDefaultCate(event.target.value);

        const temp = { sku: '', image: '', qty: '1' };
        const attrSet = attributeSet.attributeSet[event.target.value - 1]?.attribute_name;
        attrSet?.map((element) => {
            temp[element] = '';
        });

        setProduct({ ...product, attributes: [{ ...temp }] });
    };
    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };
    const removeSelectedImage = (image) => {
        if (typeof selectedImage === 'string') {
            setSelectedImage();
        } else {
            setSelectedImage();
            imageRef.current.value = null;
        }
    };

    const handleAddRow = () => {
        append();
    };
    const handleRemoveRow = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };
    async function fetchList() {
        dispatch(pendding());
        const res = await fetchBrand();
        const responseCate = await fetchCategoryAll();
        const responseAttribute = await fetchAttribute();
        const responseAttributeSet = await fetchAttributeSet();
        let brand = res.data.data;
        let cate = responseCate.data.data;
        let attribute = responseAttribute.data.data;
        let attributeSet = responseAttributeSet.data.data;
        const temp = [];
        brand.forEach((element) => {
            temp.push({ label: element.name, value: element.id });
        });

        const temp2 = [];
        cate.forEach((element) => {
            temp2.push({ label: element.name, value: element.id });
        });

        const temp3 = {};
        attribute.forEach((element) => {
            if (element.type === 'dropdown') {
                const dropdown = element.attribute_value.map((item) => {
                    return { label: item?.value, value: item?.id };
                });
                temp3[element.name] = dropdown;
            }
        });

        const temp4 = [];
        attributeSet.forEach((element) => {
            temp4.push({ label: element.name, value: element.id });
        });

        setSelectAttribute({ ...temp3 });
        setAttributeSet({ attributeSet, defaultCate: temp4 });

        setSelectObject({
            ...selectObject,
            brandList: temp,
            cateList: temp2,
        });

        dispatch(done());
    }
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <Typography variant="h5">Thêm Sản Phẩm</Typography>
            <Box mt={3} textAlign="left">
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate('/admin/products')}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaArrowLeft />
                        <span>Quay về</span>
                    </Box>
                </Button>
                {contentAlert && contentAlert !== '' && (
                    <Box mt={2}>
                        <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                    </Box>
                )}
            </Box>

            <Box mt={3}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                            <InputField
                                control={control}
                                label="Tên sản phẩm"
                                name="product_name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <InputField
                                control={control}
                                type="number"
                                label="Giá sản phẩm"
                                name="product_price"
                                min="0"
                                step=".01"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <SelectField
                                control={control}
                                label="Thương hiệu"
                                name="brand"
                                options={selectObject?.brandList}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <SelectField
                                control={control}
                                label="Danh mục"
                                name="category"
                                options={selectObject?.cateList}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <RadioField
                                label="Giới tính"
                                control={control}
                                name="gender"
                                options={[
                                    { label: 'Nam', value: '1' },
                                    { label: 'Nữ', value: '2' },
                                    { label: 'Cả 2', value: '3' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <RadioField
                                label="Hiển thị"
                                control={control}
                                name="active"
                                options={[
                                    { label: 'Hiển thị', value: '1' },
                                    { label: 'Không hiển thị', value: '2' },
                                ]}
                            />
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_URL}/uploads`,
                                    },
                                }}
                                data={product.description}
                                onReady={(editor) => {}}
                                //  onChange={(event, editor) => {
                                //     const text = editor.getData();
                                //   }}
                                onBlur={(event, editor) => {
                                    const text = editor.getData();
                                    setDesc(text);
                                }}
                                onFocus={(event, editor) => {}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    sx={{ marginRight: '1rem' }}
                                >
                                    Tải ảnh
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        hidden
                                        onChange={handleChangeImage}
                                        name="product_image"
                                        ref={imageRef}
                                    />
                                </Button>
                                {selectedImage && (
                                    <Button
                                        sx={{ marginTop: { xs: '8px', sm: '0px', md: '0px' } }}
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => removeSelectedImage(selectedImage)}
                                    >
                                        Xóa ảnh
                                    </Button>
                                )}
                            </Box>
                            {selectedImage ? (
                                <Box
                                    mt={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                        width: { md: '300px', sm: '300px', xs: '200px' },
                                        height: { md: '300px', sm: '300px', xs: '200px' },
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                        src={
                                            typeof selectedImage === 'string'
                                                ? selectedImage
                                                : URL.createObjectURL(selectedImage)
                                        }
                                        alt="Thumb"
                                    />
                                </Box>
                            ) : (
                                <Box
                                    mt={2}
                                    sx={{
                                        width: { md: '300px', sm: '300px', xs: '200px' },
                                        height: { md: '300px', sm: '300px', xs: '200px' },
                                    }}
                                >
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                        src={
                                            !selectedImage
                                                ? process.env.PUBLIC_URL +
                                                  '/assets/images/no-image.png'
                                                : product.product_image
                                        }
                                        alt="Thumb"
                                    />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Loại mặt hàng
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="defaultCate"
                                    value={defaultCate}
                                    onChange={handleChangeDefaultCate}
                                >
                                    {attributeSet?.defaultCate?.map((item) => {
                                        return (
                                            <FormControlLabel
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/* dynamic */}
                        <Grid item xs={12} md={12} style={{ paddingTop: '0px' }}>
                            {fields.map((item, index) => {
                                return (
                                    <Grid container key={item.id} spacing={3}>
                                        <Grid item xs={12} sm={6} md={6} mt={3}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <InputField
                                                        control={control}
                                                        label="Mã kho"
                                                        name={`attributes.${index}.sku`}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <InputField
                                                        control={control}
                                                        type="number"
                                                        min={0}
                                                        label="Số lượng"
                                                        name={`attributes.${index}.qty`}
                                                    />
                                                </Grid>
                                                {Object.keys(rest).map(
                                                    (element) =>
                                                        selectAttribute[element] && (
                                                            <Grid item xs={12} sm={6} md={6}>
                                                                <SelectField
                                                                    control={control}
                                                                    label={element}
                                                                    name={`attributes.${index}.${element}`}
                                                                    options={
                                                                        selectAttribute[element]
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={5} mt={3}>
                                            <Controller
                                                name={`attributes.${index}.image`}
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => {
                                                    return (
                                                        <>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                }}
                                                            >
                                                                <Button
                                                                    component="label"
                                                                    variant="outlined"
                                                                    sx={{ marginRight: '1rem' }}
                                                                >
                                                                    Tải ảnh
                                                                    <input
                                                                        hidden
                                                                        accept="image/png, image/jpeg, image/jpg"
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            field.onChange(
                                                                                e.target.files
                                                                            );
                                                                        }}
                                                                        multiple
                                                                    />
                                                                </Button>

                                                                {field?.value[0] && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="warning"
                                                                        onClick={() => {
                                                                            resetField(field.name);
                                                                        }}
                                                                    >
                                                                        Xóa ảnh
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                            {field?.value[0] ? (
                                                                <Box
                                                                    mt={2}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'flex-start',
                                                                        flexDirection: 'column',
                                                                        width: {
                                                                            md: '150px',
                                                                            sm: '150px',
                                                                            xs: '150px',
                                                                        },
                                                                        height: {
                                                                            md: '150px',
                                                                            sm: '150px',
                                                                            xs: '150px',
                                                                        },
                                                                    }}
                                                                >
                                                                    <img
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'contain',
                                                                        }}
                                                                        src={
                                                                            typeof field
                                                                                ?.value[0] ===
                                                                            'string'
                                                                                ? field?.value[0]
                                                                                : URL.createObjectURL(
                                                                                      field
                                                                                          ?.value[0]
                                                                                  )
                                                                        }
                                                                        alt="Thumb"
                                                                    />
                                                                </Box>
                                                            ) : (
                                                                <Box
                                                                    mt={2}
                                                                    sx={{
                                                                        width: {
                                                                            md: '150px',
                                                                            sm: '150px',
                                                                            xs: '150px',
                                                                        },
                                                                        height: {
                                                                            md: '150px',
                                                                            sm: '150px',
                                                                            xs: '150px',
                                                                        },
                                                                    }}
                                                                >
                                                                    <img
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'contain',
                                                                        }}
                                                                        src={
                                                                            !field?.value[0]
                                                                                ? process.env
                                                                                      .PUBLIC_URL +
                                                                                  '/assets/images/no-image.png'
                                                                                : field?.value[0]
                                                                        }
                                                                        alt="Thumb"
                                                                    />
                                                                </Box>
                                                            )}
                                                        </>
                                                    );
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={1} mt={3} textAlign="right">
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                type="button"
                                                onClick={() => handleRemoveRow(index)}
                                            >
                                                Xóa
                                            </Button>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box textAlign="right">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleAddRow()}
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box textAlign="right" my={3}>
                        <Button
                            mr={3}
                            onClick={() => navigate('/admin/products')}
                            variant="contained"
                            color="warning"
                            sx={{
                                marginRight: '16px',
                            }}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            OK
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default AddProduct;
