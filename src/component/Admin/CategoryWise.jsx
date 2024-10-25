// PieChartComponent.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this to automatically register Chart.js components



const CategoryWise = ({CategoryName,CategoryCourseNumber}) => {
    // Sample data for categories and course numbers
    // const categories = ["Java", "C Programming", "Data Structures", "AI", "UI/UX Design"];
    // const courseNumbers = [10, 5, 8, 12, 7];

    // Data configuration for the pie chart
    const data = {
        labels: CategoryName,
        datasets: [
            {
                label: 'Number of Courses',
                data: CategoryCourseNumber,
                backgroundColor: [
                  'rgba(229, 115, 115, 0.7)', 
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 171, 145, 0.7)',  // Peach shade
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(240, 98, 146, 0.7)',
                    'rgba(165, 214, 167, 0.7)'
                ],
                borderColor: [
                  'rgba(229, 115, 115, 0.7)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 171, 145, 1)',  // Peach shade
                    'rgba(255, 159, 64, 1)',
                    'rgba(240, 98, 146, 1)',
                    'rgba(165, 214, 167, 1)'
                ],
                borderWidth: 4
            }
        ]
    };

    // Options for the pie chart
    const options = {
        responsive: true,
        plugins: {
            legend:false,
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

export default CategoryWise;
