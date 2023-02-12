import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
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
import { configToast } from '../../../Helper/Config';
import { fetchDeleteAttributeSet } from '../AttributeAPI';

const TableAttributeSet = ({ list, fetchAttributeSetList, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const onDelete = (row) => {
        setTarget(row);
        setOpen(true);
    };
    const handleDelete = async () => {
        const res = await fetchDeleteAttributeSet(target.id);
        const success = res.data.success;
        if (!success) {
            toast.warning(res.data.message, configToast);
        } else {
            toast.success(res.data.message, configToast);
            fetchAttributeSetList();
        }
        setOpen(false);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '5%' }}>#</TableCell>
                            <TableCell sx={{ width: '45%' }}>Tên</TableCell>
                            <TableCell sx={{ width: '45%' }}>Thuộc tính</TableCell>

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
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.attribute_name.join(' - ')}</TableCell>

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
                        Bạn có muốn xóa nhóm thuộc tính "
                        {target?.name.length > 20
                            ? target?.name.slice(0, 20) + '...'
                            : target?.name}
                        " không
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

export default TableAttributeSet;
