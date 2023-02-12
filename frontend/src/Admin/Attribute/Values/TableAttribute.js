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
    Grid,
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
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { fetchDeleteAttributeValue } from '../AttributeAPI';
import { configToast } from '../../../Helper/Config';
const TableAttribute = ({ lists, fetchAttributeList, onAdd, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const onDelete = (row, list) => {
        setTarget({ row, list });
        setOpen(true);
    };
    const handleDelete = async () => {
        const res = await fetchDeleteAttributeValue(target.row.id);
        const success = res.data.success;
        if (!success) {
            toast.warning(res.data.message, configToast);
        } else {
            toast.success(res.data.message, configToast);
            fetchAttributeList();
        }
        setOpen(false);
    };
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 380 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '5%' }}>#</TableCell>
                            <TableCell>Tên </TableCell>

                            <TableCell sx={{ width: '15%' }}>Hành động </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lists?.length > 0 &&
                            lists.map((list, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>{list.name}</TableCell>

                                    <TableCell>
                                        <Stack spacing={2} direction="row">
                                            <Button
                                                size="small"
                                                color="secondary"
                                                variant="outlined"
                                                // onClick={() => onEdit(row)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                // onClick={() => onDelete(row)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}

                        {lists?.length <= 0 && (
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
                        Bạn có muốn xóa {target?.list.name}
                        {` "${
                            target?.row.value.length > 20
                                ? target?.row.value.slice(0, 20) + '...'
                                : target?.row.value
                        }" `}
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

export default TableAttribute;
