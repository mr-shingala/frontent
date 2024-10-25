import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this to automatically register Chart.js components



const Lchart = ({hinglish,hindi,english}) => {

     // Sample data for categories and course numbers
     const categories = ["हिन्दी", "English", "हिंग्लिश"];
     const courseNumbers = [hindi, english, hinglish];
 
     // Data configuration for the bar chart
     const data = {
         labels: categories,
         datasets: [
             {
                 label: 'Number of Courses',
                 data: courseNumbers,
                 backgroundColor: [ 'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)'],
                  borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
               ],
               borderWidth: 4
             }
         ]
     };
 
     // Options for the bar chart
     const options = {
         responsive: true,
         plugins: {
             legend: false,
             tooltip: {
                 enabled: true
             }
         },
         scales: {
             x: {
                 beginAtZero: true,
                 ticks: {
                  
                  color:'white',
         
                },
                title: {
                 display: true,
                 text: 'Number of Language',
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
                 stepSize: 5, // This controls the gap between grid lines
                 color:'white',
                 padding:20
               }
             }
         }
     };

  return (
    <div>
       <div style={{ backgroundColor: '#111827', padding: '20px',  width:700 }}>
            <Bar data={data} options={options} />
        </div>
    </div>
  )
}

export default Lchart
