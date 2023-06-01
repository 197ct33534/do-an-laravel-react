import React from 'react';
import { Bar } from 'react-chartjs-2';
const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: '#000',
            },
        },
        title: {
            display: true,
            text: 'Danh sách các sản phẩm đã được bán ra',
            color: '#000',
            font: {
                size: 16,
            },
        },
    },
};

const BarChart = ({ chartData }) => {
    const data = {
        labels: chartData?.labels,
        datasets: [
            {
                label: 'số lượng đã bán',
                data: chartData?.data,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };
    return <>{<Bar options={options} data={data} />}</>;
};

export default BarChart;
