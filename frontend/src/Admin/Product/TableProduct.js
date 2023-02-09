import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { capitalized, numberWithCommas } from '../../Helper/Funtion';
import { checkPermission } from '../../middlewares/CheckPermission';

function Row(props) {
    const navigate = useNavigate();
    const { row, stt, onDelete } = props;
    const [open, setOpen] = useState(false);

    const onEdit = (row) => {
        navigate(`edit/${row.product_id}`);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {stt}
                </TableCell>
                <TableCell>
                    <Box
                        mt={2}
                        sx={{
                            width: { md: '200px', sm: '200px', xs: '200px' },
                            height: { md: '200px', sm: '200px', xs: '200px' },
                        }}
                    >
                        <img
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                            src={
                                !row.product_image
                                    ? process.env.PUBLIC_URL + '/assets/images/no-image.png'
                                    : row.product_image
                            }
                            alt="Thumb"
                        />
                    </Box>
                </TableCell>
                <TableCell>
                    {row.product_name.length > 20
                        ? row.product_name.slice(0, 20) + '...'
                        : row.product_name}
                </TableCell>
                <TableCell>${numberWithCommas(row.product_price || 0)}</TableCell>
                {(checkPermission('delete product') || checkPermission('edit product')) && (
                    <TableCell>
                        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {checkPermission('edit product') && (
                                <Button
                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => onEdit(row)}
                                >
                                    <EditIcon />
                                </Button>
                            )}
                            {checkPermission('delete product') && (
                                <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={() => onDelete(row)}
                                >
                                    <DeleteIcon />
                                </Button>
                            )}
                        </Box>
                    </TableCell>
                )}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sản phẩm
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '10%' }}>STT</TableCell>
                                        <TableCell sx={{ width: '20%' }}>Hình ảnh</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Thuộc tính</TableCell>
                                        <TableCell align="right">Số lượng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.product_items.map((item, idx) => (
                                        <TableRow key={`product_item_id${item.product_item_id}`}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell component="th" scope="row">
                                                <Box
                                                    mt={2}
                                                    sx={{
                                                        width: {
                                                            md: '200px',
                                                            sm: '200px',
                                                            xs: '200px',
                                                        },
                                                        height: {
                                                            md: '200px',
                                                            sm: '200px',
                                                            xs: '200px',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                        }}
                                                        src={
                                                            !item.image
                                                                ? process.env.PUBLIC_URL +
                                                                  '/assets/images/no-image.png'
                                                                : item.image
                                                        }
                                                        alt="Thumb"
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell>{item.sku}</TableCell>
                                            <TableCell>
                                                {item.attribute_value.map((e) => (
                                                    <>
                                                        <span>
                                                            {capitalized(e.attribute_name)} -{' '}
                                                            {capitalized(e.value)}
                                                        </span>
                                                        <br />
                                                    </>
                                                ))}
                                            </TableCell>
                                            <TableCell align="right">{item.qty}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const TableProduct = ({ list, onDelete, onEdit }) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleAgreeRemove = (id) => {
        onDelete?.(id);

        setOpen(false);
    };
    const handleModal = (row) => {
        setProduct(row);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '5%' }} />
                            <TableCell sx={{ width: '5%' }}>#</TableCell>
                            <TableCell sx={{ width: '10%' }}>Ảnh</TableCell>
                            <TableCell>Tên </TableCell>

                            <TableCell>Giá</TableCell>

                            {(checkPermission('delete product') ||
                                checkPermission('edit product')) && (
                                <TableCell align="right">Hành động </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list?.data?.map((row, key) => (
                            <Row
                                key={row.product_id}
                                row={row}
                                stt={
                                    (list?.pagination.current_page - 1) *
                                        list?.pagination.per_page +
                                    (key + 1)
                                }
                                onDelete={handleModal}
                            />
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
                        Bạn có muốn xóa sản phẩm "
                        {product?.product_name.length > 20
                            ? product?.product_name.slice(0, 20) + '...'
                            : product?.product_name}
                        " không
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button onClick={() => handleAgreeRemove(product?.product_id)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableProduct;
