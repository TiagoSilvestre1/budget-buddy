<template>
  <div class="container-banner">
    <div class="banner-card">
      <img src="/src/assets/1.png" alt="Logo" />
      <h1>Project Details</h1>
    </div>
  </div>

  <div class="container-chart">
    <h1><strong>Composition</strong></h1>
    <div class="card-chart">
      <BarChart />
    </div>
  </div>

  <BadLineChart />
</template>

<style>
@media only screen and (max-width: 360px) {
  .banner-card {
    width: 100% !important;
    height: 100% !important;
    margin-bottom: 0px !important;
  }

  .banner-card img {
    height: 100px !important;
    width: auto !important;
    margin-left: 5;
  }

  .banner-card h1 {
    font-size: 22px !important;
  }

  .container-chart h1 {
    font-size: 22px !important;
    margin-top: 400px !important;
  }

  .card-chart {
    width: 100% !important;
    height: 60% !important;
    padding: 5px !important;
  }

  #SECOND.card-chart {
    height: 200px !important;
  }

  .container-chart {
    margin-top: 400px !important;
  }

  .button {
    padding: 4px 8px !important;
    font-size: 8px !important;
    color: #000000 !important;
    background-color: #f3c221b3 !important;
    border: none !important;
    border-radius: 2px !important;
    cursor: pointer !important;
  }
}

.banner-card {
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 250px;
  background-color: rgba(248, 189, 38, 0.8);
  border-radius: 10px;
}

.banner-card img {
  height: 300px;
  align-self: margin-left;
}

.banner-card h1 {
  font-size: 48px;
  font-weight: bold;
  color: white;
}
.line-chart {
  margin-top: 30px;
  padding: 10px;
}

.container-chart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  margin-top: -300px !important;
}
.container-banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-top: 0px;
  margin-bottom: 20px;
  font-size: 44px;
  font-weight: bold;
  text-align: right;
}

.card-chart {
  display: flex;
  width: 50%;
  height: 80%;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>

<script>
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import BadLineChart from './BadLineChart.vue'
export default {
  name: 'App',
  components: { BarChart, LineChart, BadLineChart }
}
</script>
