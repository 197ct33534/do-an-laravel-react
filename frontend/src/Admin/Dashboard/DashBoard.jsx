import { Grid, Typography } from '@mui/material';
import React from 'react';

import BudgetOrder from './Budget/BudgetOrder';
import { useDispatch } from 'react-redux';
import { done, pendding } from '../../features/user/userSlice';
import { fetchGetBudget } from './DashBoardApi';
import { useState } from 'react';
import { useEffect } from 'react';
import BudgetOrderRevenue from './Budget/BudgetOrderRevenue';
import BudgetComment from './Budget/BudgetComment';
import BudgetUser from './Budget/BudgetUser';

const DashBoard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();

    const fisrtLoad = async () => {
        dispatch(pendding());
        const resBudget = await fetchGetBudget();

        if (resBudget.data.success) {
            setData({ budget: resBudget.data.data });
        }
        dispatch(done());
    };
    useEffect(() => {
        fisrtLoad();
    }, []);
    return (
        <>
            <Typography variant="h5" mb={2}>
                Tổng Quan
            </Typography>
            <Grid container spacing={4}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <BudgetOrder title="Tổng đơn đặt hàng" data={data?.budget.order_count} />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <BudgetOrderRevenue
                        title="Tổng số doanh thu"
                        data={data?.budget.order_revenue}
                    />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <BudgetComment title="Tổng số bình luận" data={data?.budget.comment_count} />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <BudgetUser title="Tổng số người dùng" data={data?.budget.user_count} />
                </Grid>
            </Grid>
        </>
    );
};

export default DashBoard;
