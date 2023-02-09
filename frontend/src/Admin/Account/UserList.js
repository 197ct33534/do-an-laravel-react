import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { done, pendding } from '../../features/user/userSlice';
import { configToast } from '../../Helper/Config';
import { capitalized, removeValuteEmpty, renderError } from '../../Helper/Funtion';
import { ruleAddUser, ruleEditUser } from '../../rules/ruleAccount';
import { fetchAllRole } from '../Role/RoleApi';
import TableUser from './TableUser';
import {
    fetchDeleteUser,
    fetchGetFilterUser,
    fetchPostUser,
    fetchPutIsActive,
    fetchPutUser,
} from './UserApi';
import * as yup from 'yup';
import InputField from '../../components/Form/InputField';
import SelectField from '../../components/Form/SelectField';
import { FaPlus } from 'react-icons/fa';
import FormUser from './FormUser';
const UserList = () => {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState();
    const [pagination, setPagination] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));
    const initalSearch = {
        email: '',
        name: '',
        group_role: '',
        is_active: '',
        perPage: pagination?.per_page,
        page: 1,
    };

    const [stateSearch, setStateSearch] = useState(
        Object.keys(searchAsObject).length === 0 ? initalSearch : searchAsObject
    );
    const [role, setRole] = useState();
    async function fetchRoleList() {
        const response = await fetchAllRole();

        const roleList = [];
        const temp = response.data.data;
        temp.forEach((element) => {
            roleList.push({
                value: element.id,
                label:
                    element.title.length > 20
                        ? capitalized(element.title.slice(0, 20) + '...')
                        : capitalized(element.title),
            });
        });
        setRole(roleList);
    }

    async function fetchData(param = stateSearch) {
        dispatch(pendding());
        let response = await fetchGetFilterUser(param);
        if (response?.data?.success === true) {
            setUserList(response.data.data);
            setPagination(response.data.data.pagination);
        } else {
            const configParam = removeValuteEmpty(param);
            if (
                configParam.hasOwnProperty('email') ||
                configParam.hasOwnProperty('name') ||
                configParam.hasOwnProperty('group_role') ||
                configParam.hasOwnProperty('is_active')
            ) {
                setUserList([]);
            } else {
                setStateSearch({ perPage: 10, page: 1 });
                setSearchParams({ perPage: 10, page: 1 });
            }
        }
        dispatch(done());
    }

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const initalUser = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        group_role: 'Admin',
        is_active: '1',
    };
    const [user, setUser] = useState(initalUser);

    const [rule, setRule] = useState(ruleAddUser);
    const schema = yup.object(rule).required();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return user;
        }, [user]),
        resolver: yupResolver(schema),
    });

    if (!stateSearch.perPage) {
        stateSearch.perPage = 10;
    }
    if (!stateSearch.page) {
        stateSearch.page = 1;
    }

    const [search, setSearch] = useState(stateSearch);
    const formSearch = useForm({
        defaultValues: useMemo(() => {
            return search;
        }, [search]),
    });

    const handleClose = () => {
        setOpen(false);
        setUser(initalUser);
        setContentAlert('');
        setOpenAlert(false);
    };

    const handleLockUser = async (id) => {
        const response = await fetchPutIsActive(id);
        const success = response?.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            fetchData();
        }
    };

    const handleDelete = async (id) => {
        const response = await fetchDeleteUser(id);
        const success = response?.data?.success;
        if (success) {
            toast.success(response.data.message, configToast);
            fetchData();
        }
    };

    const showForm = () => {
        setUser(initalUser);
        setRule(ruleAddUser);
        setOpen(true);
    };

    const handleEdit = (user) => {
        setRule(ruleEditUser);
        setUser({ ...user, group_role: user.group_role_id });
        setOpen(true);
    };

    const handleSubmitEdit = async (formValues) => {
        const response = await fetchPutUser(removeValuteEmpty(formValues));
        const success = response.data.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            await fetchData(stateSearch);
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };

    const hanleSubmitCreate = async (formValues) => {
        const response = await fetchPostUser(formValues);
        const success = response.data.success;
        if (success) {
            toast.success(response.data.message, configToast);
            handleClose();
            handleClearSearch();
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };

    const handleSubmitForm = (formValues) => {
        if (formValues?.id) {
            handleSubmitEdit(formValues);
        } else {
            hanleSubmitCreate(formValues);
        }
    };

    const handlePageChange = (e, page) => {
        const param = removeValuteEmpty(stateSearch);
        const value = { ...param, page: page, perPage: pagination?.per_page };
        setSearchParams(value);
        setStateSearch(value);
    };

    const handleClearSearch = () => {
        const param = removeValuteEmpty(initalSearch);
        setSearchParams(param);
        setSearch({ email: '', name: '', group_role: '', is_active: '' });
        setStateSearch(param);
    };

    const removeValuteEmpty = (object) => {
        const result = object;
        for (const key in result) {
            if (result[key] === '' || result[key] === undefined) {
                delete result[key];
            }
        }
        return result;
    };

    const handleSearch = (formValues) => {
        const value = removeValuteEmpty(formValues);
        value.perPage = pagination?.per_page;
        setStateSearch(value);
        setSearchParams(value);
    };

    const handleSelectCountPage = (e) => {
        const perPageTarget = e.target.value;
        const param = removeValuteEmpty(stateSearch);
        setSearchParams({ ...param, perPage: perPageTarget });
        setStateSearch({ ...param, perPage: perPageTarget });
    };

    useEffect(() => {
        reset(user);
    }, [user, reset]);
    useEffect(() => {
        fetchRoleList();
    }, []);
    useEffect(() => {
        formSearch.reset(search);
    }, [search, formSearch]);

    useEffect(() => {
        fetchData();
    }, [stateSearch]);
    return (
        <>
            <Typography variant="h5">Quản Lý Tài Khoản</Typography>
            <Box mt={2} textAlign="left">
                <Button size="small" color="success" variant="contained" onClick={() => showForm()}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="style-1" sx={{ paddingRight: '4px' }}>
                            Thêm
                        </Typography>
                        <FaPlus />
                    </Box>
                </Button>
            </Box>

            {/* tìm kiếm người dùng */}
            <Box
                sx={{
                    marginRight: {
                        xs: '16px',
                        md: '0px',
                        sm: '0px',
                    },
                }}
            >
                <form onSubmit={formSearch.handleSubmit(handleSearch)}>
                    <Grid container spacing={3} mt={1}>
                        <Grid item xs={12} md={3}>
                            <InputField
                                control={formSearch.control}
                                label="Họ và tên"
                                name="name"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <InputField control={formSearch.control} label="Email" name="email" />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <SelectField
                                control={formSearch.control}
                                label="Nhóm"
                                name="group_role"
                                options={role}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <SelectField
                                control={formSearch.control}
                                label="Trạng thái"
                                name="is_active"
                                options={[
                                    { label: 'Đang hoạt động', value: '1' },
                                    { label: 'Tạm khóa', value: '0' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: {
                                        md: 'center',
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
                        </Grid>
                    </Grid>
                </form>
            </Box>
            {/* bảng tài khoản */}
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableUser
                    list={userList}
                    onDelete={handleDelete}
                    onClock={handleLockUser}
                    onEdit={handleEdit}
                />
            </Box>
            {/* phân trang */}
            {userList?.data && pagination?.total > 20 && (
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
                            {`Hiển thị từ ${pagination?.from} ~ ${pagination?.to}  trong tổng số ${pagination?.total} tài khoản`}
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
            <FormUser
                control={control}
                handleClose={handleClose}
                open={open}
                contentAlert={contentAlert}
                setOpenAlert={setOpenAlert}
                openAlert={openAlert}
                user={user}
                onSubmit={handleSubmit(handleSubmitForm)}
                role={role}
            />
        </>
    );
};

export default UserList;
