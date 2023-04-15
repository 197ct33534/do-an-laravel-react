import { Paper, Typography } from '@mui/material';
import React from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { numberWithCommas } from '../../../Helper/Funtion';
const BudgetUser = ({ title, data }) => {
    return (
        <Paper sx={{ padding: '16px' }}>
            <div style={{ alignItems: 'center', display: 'flex' }}>
                <div>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: '#66788A' }}>
                        {title}
                    </Typography>
                    <Typography variant="h3" sx={{ marginTop: '8px' }}>
                        {numberWithCommas(data?.value || 0)}
                    </Typography>
                </div>
                <div
                    style={{
                        width: '4rem',
                        height: '4rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginLeft: 'auto',
                        borderRadius: '50%',
                        justifyContent: 'center',
                        backgroundColor: 'rgb(242 48 176)',
                    }}
                >
                    <AccountBoxIcon
                        sx={{ color: '#FFFFFF', width: '2rem', height: '2rem', fontSize: '2rem' }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: `${data?.arrow === 'down' ? '#BF0E08' : 'green'}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontWeight: '700',
                    }}
                >
                    {data?.arrow === 'down' ? '' : <ArrowUpwardIcon />}
                    {data?.percent}%
                </Typography>
                <Typography variant="caption" style={{ marginLeft: '8px' }}>
                    So với tháng trước
                </Typography>
            </div>
        </Paper>
    );
};

export default BudgetUser;
