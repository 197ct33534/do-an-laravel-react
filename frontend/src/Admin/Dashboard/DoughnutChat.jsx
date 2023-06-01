import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChat = ({ chartData }) => {
    const data = {
        labels: ['Tích cực', 'Bình thường', 'Tiêu cực'],
        datasets: [
            {
                label: ' số đánh giá',
                data: chartData?.data_setinment,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
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
                text: 'Thống kê cảm xúc khách hàng',
                color: '#000',
                font: {
                    size: 16,
                },
            },
        },
    };
    return (
        <>
            <Doughnut data={data} options={options} />
        </>
    );
};

export default DoughnutChat;
