import {
    Box,
    Button,
    Collapse,
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
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchgetOrderStatus } from '../../features/shopApi';
import Breadcrumb from '../components/Breadcrumb';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { capitalized, numberWithCommas } from '../../Helper/Funtion';
function Row(props) {
    const navigate = useNavigate();
    const { row, stt, handleOpenNewTab } = props;
    const [open, setOpen] = useState(false);
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
                <TableCell align="left">{row.created_at}</TableCell>

                <TableCell align="right">{numberWithCommas(row.total_price)}đ</TableCell>
                <TableCell
                    align="left"
                    sx={row.status == 3 ? 'color:green' : row.status == 4 ? 'color:red' : ''}
                >
                    {row.status_text}
                </TableCell>
                <TableCell align="right">{row.payment_type_text}</TableCell>
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
                                            <TableCell style={{ minWidth: '80px' }}>SKU</TableCell>
                                            <TableCell align="center" style={{ minWidth: '200px' }}>
                                                Hình ảnh
                                            </TableCell>
                                            <TableCell align="left" style={{ minWidth: '150px' }}>
                                                Thuộc tính
                                            </TableCell>

                                            <TableCell align="left" style={{ minWidth: '150px' }}>
                                                Đơn giá
                                            </TableCell>
                                            <TableCell align="right">SL</TableCell>
                                            <TableCell align="right" style={{ minWidth: '200px' }}>
                                                Thành tiền
                                            </TableCell>
                                            {row.status == 3 && (
                                                <TableCell
                                                    align="right"
                                                    style={{ minWidth: '200px' }}
                                                >
                                                    Hành động
                                                </TableCell>
                                            )}
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
                                            <>
                                                {row.status == 3 && !order.is_comment && (
                                                    <TableCell align="right">
                                                        <button
                                                            className="btn btn-outline-success"
                                                            onClick={() => handleOpenNewTab(order)}
                                                        >
                                                            Đánh giá sản phẩm
                                                        </button>
                                                    </TableCell>
                                                )}
                                                {row.status == 3 && order.is_comment && (
                                                    <TableCell align="right">
                                                        <button
                                                            className="btn btn-outline-warning "
                                                            onClick={() => handleOpenNewTab(order)}
                                                        >
                                                            Xem đánh giá
                                                        </button>
                                                    </TableCell>
                                                )}
                                            </>
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
const OrderStatus = () => {
    const BreadPath = [
        {
            name: 'Trang chủ',
            link: '/',
        },
        {
            name: 'Đơn đặt hàng',
        },
    ];
    const [data, setData] = useState();
    const asyncGetOrderStatus = async () => {
        const res = await fetchgetOrderStatus();

        if (res.data.success) {
            setData(res.data.data);
        }
    };
    const handleOpenNewTab = (order) => {
        const url = window.location.origin + '/san-pham/' + order.product_id + '#binh-luan';
        window.open(url, '_blank', 'noreferrer');
    };
    useEffect(() => {
        asyncGetOrderStatus();
    }, []);

    return (
        <>
            <Breadcrumb PathList={BreadPath} />
            <div className="col-lg-12">
                <TableContainer
                    component={Paper}
                    style={{ maxWidth: '100%', width: '100%', overflowX: 'auto' }}
                >
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
                                <TableCell sx={{ maxWidth: '5%' }} />
                                <TableCell>#</TableCell>
                                <TableCell align="left">Tên</TableCell>
                                <TableCell>SĐT </TableCell>
                                <TableCell>Email </TableCell>
                                <TableCell align="left" style={{ minWidth: '200px' }}>
                                    Địa chỉ
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    Ngày đặt
                                </TableCell>
                                <TableCell align="right" style={{ minWidth: '150px' }}>
                                    Tổng tiền
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '200px' }}>
                                    Trạng thái
                                </TableCell>
                                <TableCell align="right" style={{ minWidth: '200px' }}>
                                    Thanh toán
                                </TableCell>

                                {/* <TableCell align="right" sx={{ width: '8%' }}>
                                Hành động
                            </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data?.map((row, key) => (
                                <Row
                                    key={row.order_id}
                                    row={row}
                                    stt={
                                        (data?.pagination.current_page - 1) *
                                            data?.pagination.per_page +
                                        (key + 1)
                                    }
                                    handleOpenNewTab={handleOpenNewTab}
                                />
                            ))}
                            {!data?.data && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="h5"> Chưa có đơn hàng nào</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default OrderStatus;
