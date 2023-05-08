<template>
    <div class="container-chart">
      <h1><strong>Composition</strong></h1>
      <div class="card-chart">
        <BarChart />
      </div>
    </div>
 

  </template>
  
  <style>



  .container-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
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
    height: 50%;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-top: 10px;
  }
  </style>
  
  <script>
  import BarChart from './BarChart.vue'
  export default {
    name: 'App',
    components: { BarChart }
  }
  </script>
  