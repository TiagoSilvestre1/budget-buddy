<template>
    <Line
		:id="chartId"
		:data="lineData"
		:options="options"
    />
</template>
  
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


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
							label: 'Data One',
							backgroundColor: '#f87979',
							data: [40, 39, 10, 40, 39, 80, 40]
						}
					]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
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
	},
	created() {
		console.log(this)
	}
}
</script>