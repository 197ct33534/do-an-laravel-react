import { Box, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../../features/user/userSlice';
import { fetchAttributeValue } from '../AttributeAPI';
import FormAttributeValue from './FormAttributeValue';
import TableAttribute from './TableAttribute';
import TableAttributeValue from './TableAttributeValue';
const AttributeValueList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState({ parent: {}, children: {} });
    const [data, setData] = useState();
    async function fetchAttributeList() {
        dispatch(pendding());
        const response = await fetchAttributeValue();
        if (response?.data?.success === true) {
            setData(response.data.data);
        } else {
            setData([]);
        }
        dispatch(done());
    }
    const handleAdd = (list) => {
        setTarget({ parent: list, children: { value: '' } });
        setOpen(true);
    };
    const handleEdit = (parent, children) => {
        setTarget({ parent, children });
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetchAttributeList();
        // console.log(data);
    }, []);
    return (
        <>
            <Typography variant="h5">Quản Lý Thuộc Tính</Typography>
            <Box
                mt={3}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableAttribute lists={data} />
            </Box>
            <Typography mt={3} variant="h5">
                Quản Lý Giá Trị Thuộc Tính
            </Typography>
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableAttributeValue
                    lists={data}
                    fetchAttributeList={fetchAttributeList}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                />
            </Box>
            <FormAttributeValue
                open={open}
                fetchAttributeList={fetchAttributeList}
                target={target}
                handleClose={handleClose}
            />
        </>
    );
};

export default AttributeValueList;
