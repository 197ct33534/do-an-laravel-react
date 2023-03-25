import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const TableUser = ({ list, onClock, onDelete, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [typeModal, setTypeModal] = useState(false);
    const [selectUser, setSelectUser] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const idUserLogin = JSON.parse(localStorage.getItem('userInfo'));
    const handleModal = (row, type) => {
        setTypeModal(type);
        setSelectUser(row);
        setOpen(true);
    };

    const handleAgree = (id) => {
        if (typeModal === 'clock') {
            onClock?.(id);
        }
        if (typeModal === 'delete') {
            onDelete?.(id);
        }

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
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
                            <TableCell>Họ và tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Nhóm</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell sx={{ width: '8%' }}>Hành động </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list?.data &&
                            list.data.map((row, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {(list?.pagination.current_page - 1) *
                                            list?.pagination.per_page +
                                            (key + 1)}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {row.email.length > 20
                                            ? row.email.slice(0, 20) + '...'
                                            : row.email}
                                    </TableCell>
                                    <TableCell>
                                        {row.group_role.length > 20
                                            ? row.group_role.slice(0, 20) + '...'
                                            : row.group_role}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        color={row.is_active == 1 ? 'green' : 'red'}
                                    >
                                        <span
                                            style={{ color: row.is_active == 1 ? 'green' : 'red' }}
                                        >
                                            {row.is_active == 1 ? 'Đang hoạt động ' : 'Tạm khóa'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {row.id !== idUserLogin?.id && (
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
                                                    onClick={() => handleModal(row, 'delete')}
                                                >
                                                    <DeleteIcon />
                                                </Button>

                                                <Button
                                                    size="small"
                                                    color="warning"
                                                    variant="outlined"
                                                    onClick={() => handleModal(row, 'clock')}
                                                >
                                                    {row.is_active + '' === '1' ? (
                                                        <LockPersonIcon />
                                                    ) : (
                                                        <KeyIcon />
                                                    )}
                                                </Button>
                                            </Stack>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                        {!list?.data && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
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
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Nhắc nhở</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có muốn{' '}
                        {typeModal === 'delete'
                            ? 'xóa '
                            : selectUser?.is_active + '' === '1'
                            ? 'khóa '
                            : 'mở khóa '}
                        thành viên "{selectUser?.name}" không
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button onClick={() => handleAgree(selectUser?.id)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableUser;
