import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../features/user/userSlice';
import { fetchAllCategory, fetchCategoryAllHaveParent } from './CateApi';
import Categories from './Categories';
import FormMenu from './FormMenu';
export const MenuContext = createContext();
const CateList = () => {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState();
    const [cate, setCate] = useState();
    const [row, setRow] = useState();
    const [open, setOpen] = useState(false);

    async function fetchMenuList() {
        dispatch(pendding());
        const response = await fetchAllCategory();

        if (response?.data?.success === true) {
            const menuList = response.data.data;

            setMenu(menuList);
        }
        dispatch(done());
    }
    async function fetchMenuSelect() {
        dispatch(pendding());
        const response = await fetchCategoryAllHaveParent();

        if (response?.data?.success === true) {
            const menuList = response.data.data;
            const arr = [{ value: 0, label: 'Không thuộc menu nào' }];

            menuList.forEach((element) => {
                arr.push({
                    label: element.name,
                    value: element.id,
                });
            });

            setCate(arr);
        }
        dispatch(done());
    }

    const showForm = () => {
        setRow({ category_name: '', parent_id: '' });
        setOpen(true);
    };
    useEffect(() => {
        fetchMenuList();
        fetchMenuSelect();
    }, []);
    return (
        <>
            <Typography variant="h5">Quản Lý Loại Mặt Hàng</Typography>
            <Box my={2} textAlign="left">
                <Button size="small" color="success" variant="outlined" onClick={() => showForm()}>
                    <AddIcon />
                </Button>
            </Box>
            <MenuContext.Provider value={{ cate, fetchMenuList, fetchMenuSelect }}>
                <Categories list={menu} />
                <FormMenu
                    open={open}
                    handleClose={() => {
                        setOpen(false);
                    }}
                    cate={cate}
                    row={row}
                />
            </MenuContext.Provider>
        </>
    );
};

export default CateList;
