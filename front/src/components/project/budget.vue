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

    <!-- <div class="container-chart">
      <h1><strong>Budget</strong></h1>
      <div class="card-chart">
        <LineChart />
      </div>
    </div> -->

   
        <BadLineChart />
     

  </template>
  
  <style>
   
   .banner-card {
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 250px;
    background-color: rgba(248, 189, 38, 0.8);
    margin-bottom: 10px;
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
  }
  .container-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  h1 {
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
    margin-top: 10px;
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
  