import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chartData }) => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    const data = {
        labels: chartData?.labels,
        datasets: [
            {
                label: 'doanh thu',
                data: chartData?.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <>
            {data.labels?.length > 0 && (
                <Line
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Doanh thu các tháng trong năm ' + currentYear,
                                color: '#000',
                                font: {
                                    size: 16,
                                },
                            },
                            legend: {
                                display: false,
                                position: 'bottom',
                                labels: {
                                    fontColor: '#000',
                                },
                            },
                        },
                    }}
                />
            )}
        </>
    );
};

export default LineChart;
