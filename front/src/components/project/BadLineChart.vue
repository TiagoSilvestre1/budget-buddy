<template>
    <Line
      :id="chartId"
      :data="lineData"
      :options="lineOptions"
    />
  </template>
  
  <script>
  import { Line, Chart } from 'vue-chartjs'
  
  
  export default {
    name: 'BadLineChart',
    components: {
      Line
    },
    props: {
      chartId: {
        type: String,
        default: 'my-line-id'
      },
      labels: {
        type: Array,
        default: () => []
      },
      datasets: {
        type: Array,
        default: () => []
      },
      totalBudget: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        lineData: {
          labels: this.labels,
          datasets: this.datasets
        },
        lineOptions: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                beginAtZero: true
              }
            },
            y: {
              ticks: {
                beginAtZero: true,
                max: this.totalBudget,
                stepSize: 1000
              },
              grid: {
                display: true,
                color: 'black',
                borderDash: [2, 5],
                lineWidth: 2
              }
            }
          }
        }
      }
    }
  }
  </script>