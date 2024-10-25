import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this to automatically register Chart.js components

const RatingPieChart = ({ratingCount}) => {
    // Sample data for ratings
    const ratings = ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'];
    

    // Data configuration for the pie chart
    const data = {
        labels: ratings,
        datasets: [
            {
                label: 'Rating Distribution',
                data: ratingCount,
                backgroundColor: [
                 'rgba(255, 99, 132, 0.7)',
                 'rgba(54, 162, 235, 0.7)',
                 'rgba(255, 206, 86, 0.7)',
                 'rgba(75, 192, 192, 0.7)',
                 'rgba(153, 102, 255, 0.7)'
             ],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)'
             ],
             borderWidth: 4
            }
        ]
    };

    // Options for the pie chart
    const options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default RatingPieChart;
