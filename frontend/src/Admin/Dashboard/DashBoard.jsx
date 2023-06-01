import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { done, pendding } from '../../features/user/userSlice';
import BudgetOrder from './Budget/BudgetOrder';
import {
    fetchGetBudget,
    fetchGetMonthlyRevenue,
    fetchGetNumberOfCommentTypes,
    fetchGetQuantitySoldOfProduct,
} from './DashBoardApi';

import BudgetComment from './Budget/BudgetComment';
import BudgetOrderRevenue from './Budget/BudgetOrderRevenue';
import BudgetUser from './Budget/BudgetUser';

import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DoughnutChat from './DoughnutChat';

const DashBoard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState();

    const fisrtLoad = async () => {
        dispatch(pendding());
        const resBudget = await fetchGetBudget();
        const resMonthlyRevenue = await fetchGetMonthlyRevenue();
        const resQuantitySoldOfProduct = await fetchGetQuantitySoldOfProduct();
        const resNumberOfCommentTypes = await fetchGetNumberOfCommentTypes();

        setData({
            budget: resBudget.data.data,
            lineChart: resMonthlyRevenue.data,
            barChart: resQuantitySoldOfProduct.data,
            pieChart: resNumberOfCommentTypes.data,
        });

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
            <div className="chart bg-light mt-3 p-2">
                <LineChart chartData={data?.lineChart} />
            </div>
            <div className="chart bg-light mt-3 p-2">
                <BarChart chartData={data?.barChart} />
            </div>
            <div className="chart bg-light mt-3 p-2">
                <Grid container spacing={4}>
                    <Grid item lg={6}>
                        <PieChart chartData={data?.pieChart} />
                    </Grid>

                    <Grid item lg={6}>
                        <DoughnutChat chartData={data?.pieChart} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default DashBoard;
