import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogTitle, Grid, Rating, Typography } from '@mui/material';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import SelectField from '../../components/Form/SelectField';
import { ruleEditComment } from '../../rules/ruleComment';
import { objectClothing, objectSentiment, objectShow } from './CommentList';
import * as yup from 'yup';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { fetchPutComment } from '../../features/user/userAPI';
import { renderError } from '../../Helper/Funtion';
import { toast } from 'react-toastify';
import { configToast } from '../../Helper/Config';
const FormEditComment = ({ fetchCommentList, handleClose, open, comment }) => {
    const [contentAlert, setContentAlert] = useState('');
    const [openAlert, setOpenAlert] = useState('');
    let inital_data = {
        name: comment?.user.name,
        email: comment?.user.email,
        content_review: comment?.content_review,
        setinment: comment?.setinment,
        stars_rated: comment?.stars_rated,
        is_show: comment?.is_show,
        is_clothing: comment?.is_clothing,
        id: comment?.id,
    };
    const schema = yup.object(ruleEditComment).required();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: inital_data,
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const response = await fetchPutComment(data);
        if (response.data.success) {
            toast.success(response.data.message, configToast);
            handleClose();
            fetchCommentList();
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };
    useEffect(() => {
        reset(inital_data);
    }, [comment]);
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth={'lg'}>
                <DialogTitle textAlign="center">
                    <Typography variant="h5">Cập nhật bình luận số {comment?.id}</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {contentAlert && contentAlert !== '' && (
                        <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                    )}
                    <Box mx={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <InputField disabled control={control} label="Tên" name="name" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <InputField disabled control={control} label="Email" name="email" />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <SelectField
                                            control={control}
                                            label="Cảm xúc"
                                            name="setinment"
                                            options={objectSentiment}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <SelectField
                                            control={control}
                                            label="Liên quan"
                                            name="is_clothing"
                                            options={objectClothing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3}>
                                        <SelectField
                                            control={control}
                                            label="Hiển thị"
                                            name="is_show"
                                            options={objectShow}
                                        />
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={12}>
                                        <Rating
                                            defaultValue={comment?.stars_rated}
                                            readOnly
                                            size="large"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <InputField
                                    disabled
                                    control={control}
                                    label="Nội dung bình luận"
                                    name="content_review"
                                    size="large"
                                />
                            </Grid>
                        </Grid>
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
        </>
    );
};

export default FormEditComment;
