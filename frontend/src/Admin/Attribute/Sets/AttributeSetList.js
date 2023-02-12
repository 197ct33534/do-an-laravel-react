import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../../features/user/userSlice';
import { fetchAttributeSet, fetchAttributeValue } from '../AttributeAPI';
import FormAttributeSet from './FormAttributeSet';
import TableAttributeSet from './TableAttributeSet';
const AttributeSetList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [attributeValue, setAttributeValue] = useState();
    const [row, setRow] = useState();
    async function fetchAttributeSetList() {
        dispatch(pendding());
        const response = await fetchAttributeSet();
        if (response?.data?.success === true) {
            setData(response.data.data);
        } else {
            setData([]);
        }
        dispatch(done());
    }

    async function fetchAttributeValueList() {
        const response = await fetchAttributeValue();
        const list = response.data.data;

        setAttributeValue(list);
    }
    const showForm = () => {
        setOpen(true);
        setRow({ name: '', attribute: '' });
    };
    const onEdit = (row) => {
        const arr = [];
        attributeValue.map((item) => {
            if (row.attribute_name.includes(item.name)) {
                arr.push(item.id + '');
            }
        });

        setRow({ id: row.id, name: row.name, attribute: arr });

        setOpen(true);
    };
    useEffect(() => {
        fetchAttributeSetList();
        fetchAttributeValueList();
    }, []);

    return (
        <>
            <Typography variant="h5">Quản Lý Nhóm Thuộc Tính</Typography>
            <Box mt={3} textAlign="left">
                <Button size="small" color="success" variant="outlined" onClick={() => showForm()}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AddIcon />
                    </Box>
                </Button>
            </Box>
            {/* danh sách sản phẩm */}
            <Box
                mt={5}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableAttributeSet
                    list={data}
                    onEdit={onEdit}
                    fetchAttributeSetList={fetchAttributeSetList}
                />
            </Box>
            <FormAttributeSet
                open={open}
                handleClose={() => {
                    setOpen(false);
                }}
                row={row}
                fetchAttributeSetList={fetchAttributeSetList}
                attributeValue={attributeValue}
            />
        </>
    );
};

export default AttributeSetList;
