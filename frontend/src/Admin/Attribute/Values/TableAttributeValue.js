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
const TableAttributeValue = ({ lists, fetchAttributeList, onAdd, onEdit }) => {
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
        <Grid container spacing={3}>
            {lists?.map((list) => (
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        mb={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                            {list.name.length > 10 ? list.name.slice(0, 10) + '...' : list.name}
                        </Typography>
                        <Button
                            size="small"
                            color="success"
                            variant="outlined"
                            onClick={() => onAdd(list)}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddIcon />
                            </Box>
                        </Button>
                    </Box>
                    <TableContainer
                        sx={{ maxHeight: 380 }}
                        component={Paper}
                        key={`${list.name}-${list.id}`}
                    >
                        <Table
                            stickyHeader
                            aria-label="simple table"
                            sx={{
                                '& .MuiTableRow-root:hover': {
                                    backgroundColor: '#f5f4e8e3',
                                },
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        '& th': {
                                            fontSize: '1rem',
                                            color: '#262626',
                                            backgroundColor: '#FFE075',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ width: '5%' }}>#</TableCell>
                                    <TableCell>Giá trị</TableCell>

                                    <TableCell sx={{ width: '15%' }}>Hành động </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.attribute_value?.length > 0 &&
                                    list.attribute_value.map((row, key) => (
                                        <TableRow
                                            key={`${list.name}-${list.id}-${key}`}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <TableCell>{key + 1}</TableCell>
                                            <TableCell>{row.value}</TableCell>

                                            <TableCell>
                                                <Stack spacing={2} direction="row">
                                                    <Button
                                                        size="small"
                                                        color="secondary"
                                                        variant="outlined"
                                                        onClick={() => onEdit(list, row)}
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => onDelete(row, list)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                {list.attribute_value <= 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <Typography variant="h6"> Không có dữ liệu</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ))}

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
        </Grid>
    );
};

export default TableAttributeValue;
