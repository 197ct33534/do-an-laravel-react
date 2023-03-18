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
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { configToast } from '../../Helper/Config';

import { fetchDeleteBrand } from './BrandAPI';
// import '../../Scss/table.scss';
const TableBrand = ({ list, fetchBrandList, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const onDelete = (row) => {
        setBrand(row);
        setOpen(true);
    };
    const handleDelete = async () => {
        const res = await fetchDeleteBrand(brand.id);
        const success = res.data.success;
        if (!success) {
            toast.warning(res.data.message, configToast);
        } else {
            toast.success(res.data.message, configToast);
            fetchBrandList();
        }
        setOpen(false);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table" className="content-table">
                    <TableHead>
                        <TableRow
                            sx={{
                                '& th': {
                                    fontSize: '1rem',
                                    color: '#3D464D',
                                    backgroundColor: '#FFCE1A',
                                },
                            }}
                        >
                            <TableCell sx={{ width: '5%' }}>#</TableCell>
                            <TableCell sx={{ width: '25%' }}>Tên </TableCell>
                            <TableCell sx={{ width: '65%' }}>Hình ảnh</TableCell>

                            <TableCell sx={{ width: '5%' }}>Hành động </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list?.length > 0 &&
                            list.map((row, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>
                                        {row.name.length > 20
                                            ? row.name.slice(0, 20) + '...'
                                            : row.name}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            mt={2}
                                            sx={{
                                                width: { md: '150px', sm: '150px', xs: '150px' },
                                                height: { md: '150px', sm: '150px', xs: '150px' },
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                }}
                                                src={
                                                    !row.image
                                                        ? process.env.PUBLIC_URL +
                                                          '/assets/images/no-image.png'
                                                        : row.image
                                                }
                                                alt=""
                                            />
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Stack spacing={2} direction="row">
                                            <Button
                                                size="small"
                                                color="secondary"
                                                variant="outlined"
                                                onClick={() => onEdit(row)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => onDelete(row)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}

                        {list?.length <= 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="h5"> Không có dữ liệu</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
                        Bạn có muốn xóa thương hiệu "
                        {brand?.name.length > 20 ? brand?.name.slice(0, 20) + '...' : brand?.name}"
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

export default TableBrand;
