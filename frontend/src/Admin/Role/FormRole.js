import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AlertMui from '../../components/Common/AlertMui';
import InputField from '../../components/Form/InputField';
import { configToast } from '../../Helper/Config';
import { renderError } from '../../Helper/Funtion';
import { ruleAddRole } from '../../rules/RuleRole';
import { fetchAllPermission } from '../Permission/PermissionAPI';
import { fetchPostRole, fetchPutRole } from './RoleApi';

const FormRole = ({ open, handleClose, fetchRoleList, row }) => {
    const [permission, setPermission] = useState();
    const [openAlert, setOpenAlert] = useState(true);
    const [contentAlert, setContentAlert] = useState('');
    const schema = yup.object(ruleAddRole).required();

    const valuePermission = [];
    if (row) {
        row.permissions.map((item) => {
            valuePermission.push(item.value);
        });
    }

    const { control, handleSubmit, reset } = useForm({
        defaultValues: useMemo(() => {
            return row;
        }, [row]),
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formValues) => {
        let response;
        if (formValues?.id) {
            response = await fetchPutRole(formValues);
        } else {
            response = await fetchPostRole(formValues);
        }
        const success = response.data.success;
        if (success) {
            handleClose();
            toast.success(response.data.message, configToast);
            fetchRoleList();
        } else {
            setContentAlert(renderError(response.data.error));
            setOpenAlert(true);
        }
    };

    async function fetchPermissionList() {
        const response = await fetchAllPermission();
        const permissionList = response.data.data;
        setPermission(permissionList.data);
    }

    useEffect(() => {
        fetchPermissionList();
    }, []);
    useEffect(() => {
        setOpenAlert(false);
        reset(row);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="800px">
            <DialogTitle textAlign="center">
                <Typography variant="h5">{row?.id ? 'Cập nhật nhóm' : 'Thêm nhóm'}</Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                {contentAlert && contentAlert !== '' && (
                    <AlertMui open={openAlert} setOpen={setOpenAlert} content={contentAlert} />
                )}
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        disabled={row?.id ? true : false}
                        label="Nhóm"
                        name="name"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={3} mx={3}>
                    <InputField
                        control={control}
                        label="Tiêu đề"
                        name="title"
                        sx={{
                            width: 500,
                        }}
                    />
                </Box>
                <Box mt={3} mx={3} sx={{ height: '200px', overflowY: 'scroll' }}>
                    <FormGroup>
                        <Controller
                            name="permissions"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <>
                                        {permission?.map((permiss) => (
                                            <FormControlLabel
                                                key={permiss.name}
                                                label={
                                                    permiss.title.length > 20
                                                        ? permiss.title.slice(0, 20) + '...'
                                                        : permiss.title
                                                }
                                                control={
                                                    <Checkbox
                                                        value={permiss.name}
                                                        disabled={row?.name === 'Super-Admin'}
                                                        checked={field.value.includes(permiss.name)}
                                                        onChange={(event, checked) => {
                                                            if (checked) {
                                                                field.onChange([
                                                                    ...field.value,
                                                                    event.target.value,
                                                                ]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (value) =>
                                                                            value !==
                                                                            event.target.value
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

export default FormRole;
