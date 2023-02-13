import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../../features/user/userSlice';
import { fetchAttributeValue } from '../AttributeAPI';
import FormAttributeValue from './FormAttributeValue';
import TableAttribute from './TableAttribute';
import AddIcon from '@mui/icons-material/Add';
import TableAttributeValue from './TableAttributeValue';
import FormAttribute from './FormAttribute';
const AttributeValueList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [target, setTarget] = useState({ parent: {}, children: {} });
    const [target2, setTarget2] = useState({ type: '', name: '' });
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

    const showFormAttributeValue = (parent, children = null) => {
        if (children) {
            setTarget({ parent, children });
        } else {
            setTarget({ parent: parent, children: { value: '' } });
        }
        setOpen(true);
    };
    const showFormAttribute = (list = {}) => {
        if (list.id) {
            setTarget2({ type: list.type, name: list.name, id: list.id });
        } else {
            setTarget2({ type: '', name: '' });
        }
        setOpen2(true);
    };
    useEffect(() => {
        fetchAttributeList();
    }, []);
    return (
        <>
            <Typography variant="h5">Quản Lý Thuộc Tính</Typography>
            <Box mt={3} textAlign="left">
                <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    onClick={() => showFormAttribute()}
                >
                    <AddIcon />
                </Button>
            </Box>
            <Box
                mt={3}
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <TableAttribute
                    lists={data}
                    fetchAttributeList={fetchAttributeList}
                    onEdit={showFormAttribute}
                />
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
                    onAdd={showFormAttributeValue}
                    onEdit={showFormAttributeValue}
                />
            </Box>
            <FormAttributeValue
                open={open}
                fetchAttributeList={fetchAttributeList}
                target={target}
                handleClose={() => {
                    setOpen(false);
                }}
            />
            <FormAttribute
                open={open2}
                fetchAttributeList={fetchAttributeList}
                target={target2}
                handleClose={() => {
                    setOpen2(false);
                }}
            />
        </>
    );
};

export default AttributeValueList;
