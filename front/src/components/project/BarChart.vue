<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      const productsData = [600, 200, 400, 500, 2900];
      const Services = [100, 500, 300, 300, 1200];
      const spentBudget = productsData.reduce((total, value) => total + value);
      const totalBudget = 4000;
      const totalData = [...productsData, spentBudget, totalBudget];
  
      return {
        chartData: {
          labels: ['Cabinets', 'Countertops', 'Flooring', 'Appliances', 'Total'],
          datasets: [
          {
              label: 'Services',
              backgroundColor: '#FFA500',
              data: Services,
            },
            {
              label: 'Products',
              backgroundColor: '#FF8C00',
              data: totalData,
            },
            {
              label: 'Spent Budget',
              backgroundColor: '#ff6384',
              data: [700, 700, 700, 800, spentBudget],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: totalBudget,
                stepSize: 1000,
              },
              gridLines: {
                display: true,
                color: 'black',
                borderDash: [2, 5],
                lineWidth: 2,
              },
            }],
          },
        },
      };
    },
  };
  </script>
  