import { yupResolver } from '@hookform/resolvers/yup';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import { configToast } from '../../Helper/Config';
import { renderError } from '../../Helper/Funtion';
import { ruleAddBrand } from '../../rules/ruleBrand';
import { fetchPostBrand, fetchPutBrand } from './BrandAPI';

const FormBrand = ({
    open,
    handleClose,
    fetchBrandList,
    row,
    imageRef,
    setSelectedImage,
    selectedImage,
    handleClearSearch,
    stateSearch,
}) => {
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');

    const schema = yup.object(ruleAddBrand).required();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
        resolver: yupResolver(schema),
    });

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

    const handleSubmitPostBrand = async (formValues) => {
        const formData = new FormData();
        formData.append('brand_name', formValues.brand_name);
        if (selectedImage) {
            formData.append('brand_image', selectedImage);
        }
        const response = await fetchPostBrand(formData);
        const success = response.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            handleClearSearch();
        } else {
            if (response?.response?.status != 401) {
                setContentAlert(renderError(response?.data?.error));
                setOpenAlert(true);
            }
        }
    };

    const handleSubmitPutBrand = async (formValues) => {
        const formData = new FormData();
        formData.append('id', formValues.id);
        formData.append('brand_name', formValues.brand_name);

        if (!selectedImage) {
            formData.append('removeImage', 1);
        } else if (typeof selectedImage !== 'string') {
            formData.append('brand_image', selectedImage);
        }
        const response = await fetchPutBrand(formData);
        const success = response.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            await fetchBrandList(stateSearch);
        } else {
            if (response?.response?.status != 401) {
                setContentAlert(renderError(response?.data?.error));
                setOpenAlert(true);
            }
        }
    };

    const onSubmit = async (formValues) => {
        if (formValues?.id) {
            handleSubmitPutBrand(formValues);
        } else {
            handleSubmitPostBrand(formValues);
        }
    };

    useEffect(() => {
        setOpenAlert(false);
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">
                    {row?.id ? 'Cập nhật thương hiệu' : 'Thêm thương hiệu'}
                </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        label="Tên thương hiệu"
                        name="brand_name"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>

                <Box mt={3} mx={3}>
                    <Box>
                        <Button component="label" variant="outlined" sx={{ marginRight: '1rem' }}>
                            Tải hình
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
                                Xóa hình
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
                                        ? process.env.PUBLIC_URL + '/assets/images/no-image.png'
                                        : row.image
                                }
                                alt="Thumb"
                            />
                        </Box>
                    )}
                </Box>

                <Box textAlign="right" m={3}>
                    <Button
                        mr={3}
                        onClick={handleClose}
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
        </Dialog>
    );
};

export default FormBrand;
