import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { configToast } from '../../Helper/Config';
import { capitalized } from '../../Helper/Funtion';
import { fetchDeleteCategory } from './CateApi';

import Categories from './Categories';
import { MenuContext } from './CateList';
const Category = ({ cate, handleEditCate }) => {
    const [open, setOpen] = useState(false);
    const { fetchMenuList } = useContext(MenuContext);
    const [menu, setMenu] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const onEdit = (cate) => {
        handleEditCate(cate);
    };
    const onDelete = (cate) => {
        setOpen(true);
        setMenu(cate);
    };

    const handleDelete = async () => {
        const res = await fetchDeleteCategory(menu.id);
        const success = res.data.success;
        if (!success) {
            toast.warning(res.data.message, configToast);
        } else {
            toast.success(res.data.message, configToast);
            fetchMenuList();
        }
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    p={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white',
                        flexGrow: '1',
                        boxShadow: 3,
                    }}
                >
                    <Typography sx={{ flexGrow: '1' }} variant="h6">
                        {capitalized(cate.name)}
                    </Typography>
                    <Box
                        sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '16px',
                        }}
                    >
                        <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            onClick={() => onEdit(cate)}
                        >
                            <EditIcon />
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            variant="contained"
                            onClick={() => onDelete(cate)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Categories list={cate.children} />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Nhắc nhở</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có muốn xóa loại mặt hàng "
                        {menu?.name.length > 20 ? menu?.name.slice(0, 20) + '...' : menu?.name}"
                        không
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Hủy
                    </Button>
                    <Button onClick={() => handleDelete()} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Category;
