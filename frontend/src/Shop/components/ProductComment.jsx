import { Avatar, Box, Pagination, Rating } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductDetailContext } from '../pages/DetailProduct';

const ProductComment = () => {
    const { comment } = useContext(ProductDetailContext);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = (event, value) => {
        setPage(value);
        setSearchParams(`?page=${value}`);
    };
    return (
        <>
            {comment?.data &&
                comment?.data.map((cmt) => (
                    <>
                        <div className="media mb-4">
                            <Avatar
                                className="img-fluid mr-3 mt-1"
                                sx={{ bgcolor: '#FFD333', width: '45px' }}
                                alt={cmt.user.name}
                            />
                            <div className="media-body">
                                <h6>
                                    {cmt.user.name}
                                    <small>
                                        - <i>{cmt.created_at}</i>
                                    </small>
                                </h6>
                                <div className="text-primary mb-2">
                                    <Rating defaultValue={cmt.stars_rated} readOnly />
                                </div>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: cmt && cmt.content_review,
                                    }}
                                ></p>
                            </div>
                        </div>
                    </>
                ))}
            <Box sx={{ flexGrow: '1', alignSelf: 'flex-end' }}>
                {comment?.pagination && (
                    <Pagination
                        page={page}
                        count={comment?.pagination.total}
                        variant="outlined"
                        color="warning"
                        onChange={handleChange}
                    />
                )}
            </Box>
        </>
    );
};

export default memo(ProductComment);
