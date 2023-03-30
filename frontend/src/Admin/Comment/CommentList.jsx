import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import SelectField from '../../components/Form/SelectField';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../features/user/userSlice';
import { fetchGetAllComment } from '../../features/user/userAPI';
import { removeValuteEmpty } from '../../Helper/Funtion';
import { useEffect } from 'react';
import CommentTable from './CommentTable';
export const objectClothing = [
    { value: 1, label: 'Quần áo' },
    { value: 0, label: 'Khác' },
];
export const objectSentiment = [
    { value: 1, label: 'Tích cực' },
    { value: 0, label: 'Bình thường' },
    { value: -1, label: 'Tiêu cực' },
];
export const objectShow = [
    { value: 1, label: 'Hiển thị' },
    { value: 0, label: 'Ẩn' },
];
const CommentList = () => {
    const dispatch = useDispatch();
    const [commentList, setCommentList] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const initalSearch = {
        setinment: '',
        content_review: '',
        is_clothing: '',
        star: '',
        is_show: '',
        perPage: commentList?.pagination?.per_page ?? 10,
        page: 1,
    };
    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [search, setSearch] = useState(stateSearch);

    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });
    const handleSearch = (data) => {
        const value = removeValuteEmpty(data);
        // console.log(value);
        setSearchParams(value);
        setStateSearch(value);
    };
    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ setinment: '', content_review: '', is_clothing: '', star: '', is_show: '' });
        setStateSearch(param);
    };
    const fetchCommentList = async (param = stateSearch) => {
        dispatch(pendding());
        const response = await fetchGetAllComment(param);
        if (response?.data?.success === true) {
            setCommentList(response.data.data);
        } else {
            const configParam = removeValuteEmpty(param);
            if (
                configParam.hasOwnProperty('setinment') ||
                configParam.hasOwnProperty('content_review') ||
                configParam.hasOwnProperty('is_clothing') ||
                configParam.hasOwnProperty('star') ||
                configParam.hasOwnProperty('is_show')
            ) {
                setCommentList([]);
            } else {
                if (response?.data?.data === false) {
                    setCommentList([]);
                } else {
                    setStateSearch({ perPage: 1, page: 1 });
                    setSearchParams({ perPage: 1, page: 1 });
                }
            }
        }
        dispatch(done());
    };
    const handleSelectCountPage = (e) => {
        const perPageTarget = e.target.value;
        const param = removeValuteEmpty(stateSearch);
        setSearchParams({ ...param, perPage: perPageTarget });
        setStateSearch({ ...param, perPage: perPageTarget });
    };
    const handlePageChange = (e, page) => {
        const param = removeValuteEmpty(stateSearch);
        const value = { ...param, page: page, perPage: commentList?.pagination?.per_page };
        setSearchParams(value);
        setStateSearch(value);
    };
    useEffect(() => {
        fetchCommentList();
    }, [stateSearch]);
    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);

    return (
        <>
            <Typography variant="h5">Quản Lý Đánh Giá</Typography>
            <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6} md={2}>
                        <InputField
                            control={formSearch.control}
                            label="Bình luận"
                            name="content_review"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <SelectField
                            control={formSearch.control}
                            label="Cảm xúc"
                            name="setinment"
                            options={objectSentiment}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <SelectField
                            control={formSearch.control}
                            label="Liên quan"
                            name="is_clothing"
                            options={objectClothing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <SelectField
                            control={formSearch.control}
                            label="Sao"
                            name="star"
                            options={[
                                { value: 5, label: 5 },
                                { value: 4, label: 4 },
                                { value: 3, label: 3 },
                                { value: 2, label: 2 },
                                { value: 1, label: 1 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <SelectField
                            control={formSearch.control}
                            label="Hiển thị"
                            name="is_show"
                            options={objectShow}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Box
                            sx={{
                                // marginLeft: '16px',
                                display: 'flex',
                                justifyContent: {
                                    md: 'flex-end',
                                },
                            }}
                        >
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                sx={{
                                    marginRight: { xs: '16px' },
                                }}
                            >
                                <SearchIcon />
                            </Button>
                            <Button
                                mr={3}
                                onClick={() => handleClearSearch()}
                                variant="outlined"
                                color="secondary"
                            >
                                <SearchOffIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <CommentTable
                    fetchCommentList={fetchCommentList}
                    list={commentList?.data}
                    objectClothing={objectClothing}
                    objectSentiment={objectSentiment}
                    objectShow={objectShow}
                />
            </Box>

            {commentList?.data && commentList?.pagination?.total > 1 && (
                <Grid container spacing={3} my={3} alignItems="center">
                    <Grid item xs={12} md={1}>
                        <Box sx={{ display: 'flex', marginLeft: '8px' }}>
                            <select
                                name="select_count_page"
                                value={commentList.pagination?.per_page}
                                onChange={(e) => handleSelectCountPage(e)}
                                style={{
                                    width: '100px',
                                    textAlign: 'center',
                                    padding: '4px 0',
                                }}
                            >
                                <option value="10">10</option>

                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography
                            variant="style-1"
                            sx={{
                                textAlign: {
                                    md: 'center',
                                    xs: 'left',
                                },
                            }}
                            display="block"
                        >
                            {`Hiển thị từ ${commentList.pagination?.from} ~ ${commentList.pagination?.to}  trong tổng số ${commentList.pagination?.total} đánh giá`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: { md: 'flex-end', xs: 'left' },
                                width: '100%',
                            }}
                        >
                            <Pagination
                                xs={12}
                                color="primary"
                                page={commentList.pagination?.current_page}
                                count={Math.ceil(
                                    commentList.pagination?.total / commentList.pagination?.per_page
                                )}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <div style={{ marginBottom: commentList?.pagination?.total > 20 ? '0' : '24px' }}></div>
        </>
    );
};

export default CommentList;
