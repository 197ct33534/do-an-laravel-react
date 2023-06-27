import {
    Button,
    Collapse,
    Dialog,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { OrderContext } from './OrderList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { capitalized, numberWithCommas } from '../../Helper/Funtion';
import FormOrder from './FormOrder';
import PrintIcon from '@mui/icons-material/Print';
import { printOrder } from '../../features/user/userAPI';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../features/shopSlice';
import axios from 'axios';
function Row(props) {
    const navigate = useNavigate();
    const { row, stt, handleUpdateStatusOrder, handlePrintOrder } = props;
    const [open, setOpen] = useState(false);

    const onEdit = (row) => {
        handleUpdateStatusOrder(row);
    };
    const onPrint = (row) => {
        console.log(row);
        handlePrintOrder(row.order_id);
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
                    {row.delivery_address ? (
                        <>
                            <p>
                                <strong>Người đặt:</strong> {row.name}
                            </p>
                            <p>
                                <strong>Người nhận:</strong> {row.delivery_address.name}
                            </p>
                        </>
                    ) : (
                        row.name
                    )}
                </TableCell>
                <TableCell>
                    {row.delivery_address ? (
                        <>
                            <p>
                                <strong>Người đặt:</strong> {row.phone}
                            </p>
                            <p>
                                <strong>Người nhận:</strong> {row.delivery_address.phone}
                            </p>
                        </>
                    ) : (
                        row.phone
                    )}
                </TableCell>
                <TableCell>
                    {row.delivery_address ? (
                        <>
                            <p>
                                <strong>Người đặt:</strong> {row.email}
                            </p>
                            <p>
                                <strong>Người nhận:</strong> {row.delivery_address.email}
                            </p>
                        </>
                    ) : (
                        row.email
                    )}
                </TableCell>

                <TableCell>
                    {row.delivery_address ? (
                        <>
                            <p>
                                <strong>Người đặt:</strong> {row.address}
                            </p>
                            <p>
                                <strong>Người nhận:</strong> {row.delivery_address.address}
                            </p>
                        </>
                    ) : (
                        row.address
                    )}
                </TableCell>

                <TableCell align="right">{numberWithCommas(row.total_price)}đ</TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>{row.status_text}</span>
                        <Button
                            size="small"
                            color="secondary"
                            variant="outlined"
                            onClick={() => onEdit(row)}
                        >
                            <EditIcon />
                        </Button>
                    </Box>
                </TableCell>
                <TableCell align="right">{row.payment_type_text}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="primary" onClick={() => onPrint(row)}>
                        <PrintIcon />
                    </Button>
                </TableCell>
            </TableRow>

            {row.order_items?.map((order, index) => (
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    {order.product_name}
                                </Typography>
                                <Table size="small" aria-label="purchases">
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
                                            <TableCell>SKU</TableCell>
                                            <TableCell align="center">Hình ảnh</TableCell>
                                            <TableCell align="left">Thuộc tính</TableCell>

                                            <TableCell align="left">Đơn giá</TableCell>
                                            <TableCell align="right">SL</TableCell>
                                            <TableCell align="right">Thành tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={`product_item_id${order.order_item_id}`}>
                                            <TableCell>{order.sku}</TableCell>
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
                                                            objectFit: 'cover',
                                                        }}
                                                        src={
                                                            !order.image
                                                                ? process.env.PUBLIC_URL +
                                                                  '/assets/images/no-image.png'
                                                                : order.image
                                                        }
                                                        alt={order.product_name}
                                                    />
                                                </Box>
                                            </TableCell>

                                            <TableCell align="left">
                                                {Object.keys(order.attribute).map((k) => (
                                                    <>
                                                        <span>
                                                            {capitalized(k)} -
                                                            {capitalized(order.attribute[k])}
                                                        </span>
                                                        <br />
                                                    </>
                                                ))}
                                            </TableCell>

                                            <TableCell align="left">
                                                {numberWithCommas(order.price)}đ
                                            </TableCell>
                                            <TableCell align="right">{order.qty}</TableCell>
                                            <TableCell align="right">
                                                {numberWithCommas(order.price * order.qty)}đ
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            ))}
        </React.Fragment>
    );
}
const OrderTable = ({ updateStatusOrder }) => {
    const dispatch = useDispatch();
    const { orderList } = useContext(OrderContext);
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState();
    const handleUpdateStatusOrder = (row) => {
        setRow(row);
        setOpen(true);
    };
    const print = async (order_id) => {
        dispatch(pendding());
        const res = await axios({
            responseType: 'blob',
            url: 'http://127.0.0.1:8000/api/printOrder/' + order_id,
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `hoa_don_so_${order_id}.pdf`);
        document.body.appendChild(link);
        link.click();
        dispatch(done());
    };
    const handlePrintOrder = (id) => {
        print(id);
    };
    return (
        <>
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table
                    stickyHeader
                    aria-label="collapsible table"
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
                            <TableCell sx={{ width: '5%' }} />
                            <TableCell>#</TableCell>
                            <TableCell align="left" sx={{ width: '200px' }}>
                                Tên
                            </TableCell>
                            <TableCell>SĐT </TableCell>
                            <TableCell>Email </TableCell>
                            <TableCell align="left" sx={{ width: '250px' }}>
                                Địa chỉ
                            </TableCell>
                            <TableCell align="right" sx={{ width: '200px' }}>
                                Tổng tiền
                            </TableCell>
                            <TableCell align="center" sx={{ width: '250px' }}>
                                Trạng thái
                            </TableCell>
                            <TableCell align="right" sx={{ width: '250px' }}>
                                Thanh toán
                            </TableCell>
                            <TableCell align="right" sx={{ width: '140px' }}>
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList?.data?.map((row, key) => (
                            <Row
                                key={row.order_id}
                                row={row}
                                stt={
                                    (orderList?.pagination.current_page - 1) *
                                        orderList?.pagination.per_page +
                                    (key + 1)
                                }
                                handleUpdateStatusOrder={handleUpdateStatusOrder}
                                handlePrintOrder={handlePrintOrder}
                            />
                        ))}
                        {!orderList?.data && (
                            <TableRow>
                                <TableCell colSpan={10} align="center">
                                    <Typography variant="h5"> Không có dữ liệu</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <FormOrder
                open={open}
                updateStatusOrder={updateStatusOrder}
                handleClose={() => setOpen(false)}
                row={row}
            />
        </>
    );
};

export default OrderTable;
