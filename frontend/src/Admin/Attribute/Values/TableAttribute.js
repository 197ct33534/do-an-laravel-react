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
import { fetchDeleteAttribute, fetchDeleteAttributeValue } from '../AttributeAPI';
import { configToast } from '../../../Helper/Config';
const TableAttribute = ({ lists, fetchAttributeList, onAdd, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const onDelete = (list) => {
        setTarget(list);
        setOpen(true);
    };
    const handleDelete = async () => {
        const res = await fetchDeleteAttribute(target.id);
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
                                                onClick={() => onEdit(list)}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => onDelete(list)}
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
                        Bạn có muốn xóa thuộc tính
                        {` "${
                            target?.name.length > 20
                                ? target?.name.slice(0, 20) + '...'
                                : target?.name
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
