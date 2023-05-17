<template>
  <div class="container-chart">
    <h1><strong>Price Track</strong></h1>
    <div id="SECOND" class="card-chart">
      <Line :id="chartId" :data="lineData" :options="options" style="height: 800px" />
    </div>
    <div class="button-group">
      <button class="button" @click="showLowestValues">Show Lowest Prices</button>
      <button class="button" @click="showHighestValues">Show Highest Prices</button>
      <button class="button" @click="showNormalValues">Show Prices Timeline</button>
    </div>
  </div>
</template>

<style>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.button {
  padding: 8px 16px;
  font-size: 16px;
  color: #000000;
  background-color: #f3c221b3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #f2a60d;
}
</style>
<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Chart } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Cabinets',
            backgroundColor: '#FFA500',
            data: [40, 39, 10, 40, 39, null, null]
          },
          {
            label: 'Countertops',
            backgroundColor: '#FFD700',
            data: [90, 80, 100, 70, 95, null, null]
          },
          {
            label: 'Flooring',
            backgroundColor: '#f8F979',
            data: [100, 110, 120, 100, 105, null, null]
          },
          {
            label: 'Appliances',
            backgroundColor: '#FFA07A',
            data: [30, 40, 50, 45, 50, null, null]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 12
              }
            }
          }
        }
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
              stepSize: 1000,
              font: {
                size: 20
              }
            },
            grid: {
              display: true,
              color: 'black',
              borderDash: [20, 5],
              lineWidth: 4
            }
          }
        }
      }
    }
  },
  methods: {
    showLowestValues() {
      const newData = {
        labels: this.lineData.labels,
        datasets: this.lineData.datasets.map((dataset) => {
          const filteredData = dataset.data.filter((value) => value !== null)
          const lowestNonNullValue = filteredData.length > 0 ? Math.min(...filteredData) : null
          const newDataset = {
            ...dataset,
            data: dataset.data.map((value) => (value === null ? null : lowestNonNullValue))
          }
          return newDataset
        })
      }
      this.lineData = newData
    },
    showHighestValues() {
      const newData = {
        labels: this.lineData.labels,
        datasets: this.lineData.datasets.map((dataset) => {
          const filteredData = dataset.data.filter((value) => value !== null)
          const highestNonNullValue = filteredData.length > 0 ? Math.max(...filteredData) : null
          const newDataset = {
            ...dataset,
            data: dataset.data.map((value) => (value === null ? null : highestNonNullValue))
          }
          return newDataset
        })
      }
      this.lineData = newData
    },
    showNormalValues() {
      this.lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Cabinets',
            backgroundColor: '#FFA500',
            data: [40, 39, 10, 40, 39, null, null]
          },
          {
            label: 'Countertops',
            backgroundColor: '#FFD700',
            data: [90, 80, 100, 70, 95, null, null]
          },
          {
            label: 'Flooring',
            backgroundColor: '#f8F979',
            data: [100, 110, 120, 100, 105, null, null]
          },
          {
            label: 'Appliances',
            backgroundColor: '#FFA07A',
            data: [30, 40, 50, 45, 50, null, null]
          }
        ]
      }
    }
  },
  created() {
    console.log(this)
  }
}
</script>
