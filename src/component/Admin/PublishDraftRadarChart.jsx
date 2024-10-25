import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PublishDraftRadarChart = ({Draft,Publish}) => {
 const labels = ['Publish', 'Draft'];
 const counts = [Publish, Draft]; // Example counts for each category

 const data = {
     labels: labels,
     datasets: [
         {
             label: 'Course Status',
             data: counts,
             backgroundColor: [
                 'rgba(54, 162, 235, 0.7)', // Color for Publish
                 'rgba(255, 99, 132, 0.7)',  // Color for Draft
             ],
             borderColor: [
                 'rgba(54, 162, 235, 1)', // Border color for Publish
                 'rgba(255, 99, 132, 1)',  // Border color for Draft
             ],
             borderWidth: 4,
             barThickness: 120,
         }
     ]
 };

 const options = {
     responsive: true,
     plugins: {
         legend: false,
         tooltip: {
             enabled: true,
         },
     },
     scales: {
      x: {
          beginAtZero: true,
          ticks: {
           
           color:'white',
  
         },
         title: {
          display: true,
          text: 'Status',
          color: '#9ca3af',
          font: {
              size: 20
          },
          padding:{
            top:20
          }

        },
      },
      y: {
          beginAtZero: true,
          grid: {
           color: 'rgba(200, 200, 200, 1)'
           
          },
          title: {
           display: true,
           text: 'Number of Courses',
           color: '#9ca3af',
           font: {
               size: 20
           },

         },
         ticks: {
          color:'white',
          padding:20
        }
      }
  }
 };

    return (
        <div style={{ backgroundColor: '#111827', padding: '20px',  width:700 }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PublishDraftRadarChart;
