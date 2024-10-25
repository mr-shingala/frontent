import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this to automatically register Chart.js components

const CourseUploadLineChart = ({courseUploadDate}) => {

    // Count the number of uploads per date
    console.log(courseUploadDate)
    const dateCounts = {};
    courseUploadDate?.forEach(date => {
        dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // Prepare data for the chart
    const labels = Object.keys(dateCounts);
    const dataCounts = Object.values(dateCounts);

    // Data configuration for the line chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Courses Uploaded',
                data: dataCounts,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
                tension: 0.5 // Smoothness of the line
            }
        ]
    };

    // Options for the line chart
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#9ca3af',
                    font: {
                        size: 20
                    },
                    padding:20
                },
                grid: {
                    color: 'rgba(200, 200, 200)',
                },
                ticks: {
                    color:'white',
                  },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Courses',
                    color: '#9ca3af',
                    font: {
                        size: 20
                    },
                    padding:20
                },
                grid: {
                    color: 'rgba(200, 200, 200)',
                },
                beginAtZero: true,
                ticks: {
                    color:'white',
                    size:20
                  },
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }
        }
    };

    return (
        <div style={{ width: '900px', height: '500px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default CourseUploadLineChart;