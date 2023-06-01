import React from 'react';

import { Pie } from 'react-chartjs-2';

const PieChart = ({ chartData }) => {
    const data = {
        labels: chartData?.labels_star,
        datasets: [
            {
                label: 'số sao',
                data: chartData?.data_star,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#000',
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: 'Thống kê số sao khách hàng đánh giá',
                color: '#000',
                font: {
                    size: 16,
                },
            },
        },
    };
    return <Pie data={data} options={options} />;
};

export default PieChart;
