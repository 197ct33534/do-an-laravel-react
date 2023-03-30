import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FormEditComment from './FormEditComment';

const CommentTable = ({ list, objectClothing, objectSentiment, objectShow, fetchCommentList }) => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState();

    const showTitle = (arrObejct, value) => {
        const result = arrObejct.map((element) => {
            if (element.value == value) {
                return element.label;
            }
        });
        return result || '';
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onEdit = (row) => {
        setComment(row);
        setOpen(true);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{
                        '& .MuiTableRow-root:hover': {
                            backgroundColor: '#f5f4e8e3',
                        },
                    }}
                    stickyHeader
                    aria-label="simple table"
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
                            <TableCell>#</TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Đánh giá</TableCell>
                            <TableCell>Thời gian</TableCell>

                            <TableCell>Sao</TableCell>
                            <TableCell>Cảm xúc</TableCell>
                            <TableCell>Liên quan</TableCell>
                            <TableCell>Hiển thị</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list?.length > 0 ? (
                            list.map((row, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>{row.product.product_name}</TableCell>
                                    <TableCell>{row.user.name}</TableCell>
                                    <TableCell>
                                        {row.content_review.length > 50
                                            ? row.content_review.slice(0, 50) + '...'
                                            : row.content_review}
                                    </TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>
                                        <Rating defaultValue={row.stars_rated} readOnly />
                                    </TableCell>
                                    <TableCell>
                                        {showTitle(objectSentiment, row.setinment)}
                                    </TableCell>
                                    <TableCell>
                                        {showTitle(objectClothing, row.is_clothing)}
                                    </TableCell>
                                    <TableCell>{showTitle(objectShow, row.is_show)}</TableCell>

                                    <TableCell>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                            onClick={() => onEdit(row)}
                                        >
                                            <EditIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Typography variant="h5"> Không có dữ liệu</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <FormEditComment
                fetchCommentList={fetchCommentList}
                open={open}
                handleClose={handleClose}
                comment={comment}
            />
        </>
    );
};

export default CommentTable;
