import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import { done, pendding } from '../../features/user/userSlice';
import { removeValuteEmpty } from '../../Helper/Funtion';
import FormPermission from './FormPermission';
import { fetchAllPermission } from './PermissionAPI';
import TablePermission from './TablePermission';

const PermissionList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState();
    const [pagination, setPagination] = useState();
    const [permission, setPermission] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const initalSearch = {
        title: '',
        name: '',
        perPage: pagination?.per_page,
        page: 1,
    };
    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [search, setSearch] = useState(stateSearch);

    async function fetchPermissionList(param = stateSearch) {
        dispatch(pendding());
        const response = await fetchAllPermission(param);
        if (response?.data?.success === true) {
            const roleList = response.data.data;
            setPermission(roleList.data);

            setPagination(roleList.pagination);
        } else {
            const configParam = removeValuteEmpty(param);
            if (configParam.hasOwnProperty('title')) {
                setPermission([]);
            } else {
                if (response?.data?.data === false) {
                    setPermission([]);
                } else {
                    setStateSearch({ perPage: 10, page: 1 });
                    setSearchParams({ perPage: 10, page: 1 });
                }
            }
        }
        dispatch(done());
    }
    const showForm = () => {
        setOpen(true);
        setRow({ name: '', title: '' });
    };
    const onEdit = (row) => {
        setRow(row);
        setOpen(true);
    };
    const handleSelectCountPage = (e) => {
        const perPageTarget = e.target.value;
        const param = removeValuteEmpty(stateSearch);

        setSearchParams({ ...param, perPage: perPageTarget });
        setStateSearch({ ...param, perPage: perPageTarget });
    };
    const handlePageChange = (e, page) => {
        const param = removeValuteEmpty(stateSearch);
        const value = { ...param, page: page, perPage: pagination?.per_page };

        setSearchParams(value);
        setStateSearch(value);
    };
    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });
    const handleSearch = (formValues) => {
        const value = removeValuteEmpty(formValues);
        value.perPage = pagination?.per_page;
        setStateSearch(value);
        setSearchParams(value);
    };
    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ title: '', name: '' });
        setStateSearch(param);
    };
    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);
    useEffect(() => {
        fetchPermissionList();
    }, [stateSearch]);
    return (
        <>
            <Typography variant="h5">Quản Lý Phân Quyền Theo Quyền</Typography>
            {/* tìm kiếm nhóm */}
            <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={3} md={5}>
                        <Button
                            size="small"
                            color="success"
                            variant="contained"
                            onClick={() => showForm()}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="style-1" sx={{ paddingRight: '4px' }}>
                                    Thêm
                                </Typography>
                                <FaPlus />
                            </Box>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={9} md={7}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '16px',
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}
                        >
                            <InputField control={formSearch.control} label="Quyền" name="name" />
                            <InputField control={formSearch.control} label="Tiêu đề" name="title" />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: {
                                        md: 'flex-end',
                                    },
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginRight: { xs: '16px' },
                                    }}
                                >
                                    Tìm
                                </Button>
                                <Button
                                    mr={3}
                                    onClick={() => handleClearSearch()}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Xóa
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            {/* danh sách người dùng */}
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TablePermission
                    list={permission}
                    fetchPermissionList={fetchPermissionList}
                    onEdit={onEdit}
                />
            </Box>
            {/* phân trang */}
            {permission && pagination?.total > 10 && (
                <Grid container spacing={3} my={3} alignItems="center">
                    <Grid item xs={12} md={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                marginLeft: '8px',
                            }}
                        >
                            <select
                                name="select_count_page"
                                value={pagination?.per_page}
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
                            display="block"
                            sx={{
                                textAlign: {
                                    md: 'center',
                                    xs: 'left',
                                },
                            }}
                        >
                            {`Hiển thị từ ${pagination?.from} ~ ${pagination?.to}  trong tổng số ${pagination?.total} quyền`}
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
                                page={pagination?.current_page}
                                count={Math.ceil(pagination?.total / pagination?.per_page)}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <div style={{ marginBottom: pagination?.total > 20 ? '0' : '24px' }}></div>
            {/* form thêm permisstion */}
            <FormPermission
                open={open}
                handleClose={() => {
                    setOpen(false);
                }}
                row={row}
                fetchPermissionList={fetchPermissionList}
            />
        </>
    );
};

export default PermissionList;
