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
  name: 'LineChart',
  components: { Bar },
  data() {
    const cabinetsData = [100, 110, 130, 120, 175, 200];
    const countertopsData = [80, 90, 120, 100, 110, 200];
    const flooringData = [250, 280, 290, 270, 300, 200];
    const appliancesData = [170, 160, 200, 190, 180, 200];
    const productsData = [cabinetsData, countertopsData, flooringData, appliancesData];
    
   

  

    const productDatasets = productsData.map((item, index) => ({
      label: ['January', 'February', 'March', 'April', 'May', 'June'][index],
      backgroundColor: ['#FFA500', '#FFD700', '#FFA07A', '#FF8C00', '#FF6347','#FFA50F' ][index],
      data: item,
    }));


    return {
      chartData: {
        labels: ['Cabinets', 'Countertops', 'Flooring', 'Appliances'],
        datasets: [
          ...productDatasets
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
             // max: totalBudget,
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
  
             
