<script lang="ts">
import Swiper from 'swiper';
import item1 from '@/assets/flatKitchen.png';
import item2 from '@/assets/robotlele.png';
import item3 from '@/assets/save.png';
import item4 from '@/assets/1.png';

export default {
    data(): {items: {id: number; image: string; description: string}[], details: {id: number; image: string; description: string}[], swiper: Swiper | null, hoverItem: number | null} {
  return {
    items: [
      {
        id: 1,
        image: item1,
        description: 'Kitchen Remodelation'
      },
      {
        id: 2,
        image: item2,
        description: 'Robot Construction'
      },
      {
        id: 3,
        image: item3,
        description: 'Home Projects'
      },
      {
        id: 4,
        image: item4,
        description: 'Default'
      },
    ],
    details: [
      {
        id: 1,
        image: item4,
        description: 'Default'
      },
      {
        id: 2,
        image: item4,
        description: 'Default'
      },
      {
        id: 3,
        image: item4,
        description: 'Default'
      },
      {
        id: 4,
        image: item4,
        description: 'Default'
      },
    ],
    swiper: null,
    hoverItem: null
  };
},
  mounted() {
    this.initializeSwiper();
  },
  updated() {
    this.initializeSwiper();
  },
  methods: {
    initializeSwiper() {
    const swiperContainer = document.getElementById('swiperContainer');
    if (swiperContainer) {
        if (!this.swiper) {
        this.swiper = new Swiper(swiperContainer, {
            // customize swiper options here
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            grabCursor: true
        });
        } else {
        this.swiper.update();
        }
    }
    }

  }
};
</script>

<template>

    <div>
    <div class="welcome-card">
      <img src="../assets/user.png" alt="Profile image">
      <div class="welcome-text">
        <h1><b> Welcome to Budget-Buddy, Anne!</b></h1>
        <p>Start counting more</p>
      </div>
    </div>


    <div class="titles">
      <div class="projects-title">
        <h1><b>Your  Projects</b></h1>
      </div>
    <div class="container" ref="swiperContainer">
      <div class="item" v-for="item in items" :key="item.id" @mouseenter="hoverItem = item.id" @mouseleave="hoverItem = null"
  :class="{ 'hover': hoverItem === item.id }">
        <img :src="item.image" alt="item image">
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>


    <div class="titles">
      <div class="projects-title">
        <h1><b>Project Highlights</b></h1>
      </div>
    <div class="containerDetails" ref="swiperContainer2">
      <div class="itemDetail" v-for="item in details" :key="item.id" @mouseenter="hoverItem = item.id" @mouseleave="hoverItem = null"
  :class="{ 'hover': hoverItem === item.id }">
        <img :src="item.image" alt="item image">
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>

    </div>
  </template>

<style>


@media only screen and (max-width: 768px) {
  .welcome-card img {
    width: 150px;
    margin-right: 10px;
  }

  .welcome-text h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }

  .welcome-text p {
    font-size: 1em;
  }

  .titles {
    display: flex;
    margin-top: 50px;
    margin-left: 100px;
    margin-right: 200px;
  }

  .item {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 20px;
    text-align: center;
  }

  .item p {
    font-size: 0.8em;
  }
}


.welcome-card {
  background-color:rgba(255, 204, 0, 0.5);
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.welcome-card img {
  width: 300px;
  height: auto;
  margin-right: 50px;
}

.welcome-text {
  text-align: left;
}

.welcome-text h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.welcome-text p {
  font-size: 1.8em;
}

.titles {
  display: flex;
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 50px;
}

.projects-title {
  margin-bottom: 50px;
  width: 180px;
  margin-right: 50px;
}

.item {
  margin-right: 20px;
  flex-shrink: 0;
  width: 300px;
  text-align: center;
  background-color: rgba(255, 204, 0, 0.5); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #666; 
}


.item img {
  max-width: 50%;
  height: 50%;
}

.container {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  width: 1150px;
  padding: 50px 0;
}

.containerDetails {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 50px 0;
  width: 1150px;
  overflow-x: scroll;
}

.itemDetail {
  width: 900px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
}

.itemDetail img {
  width: 200px;
  height: auto;
  margin-right: 20px;
}
.itemDetail:hover {
  transform: scale(1.1);
}

.item:hover {
  transform: scale(1.1);
}

</style>
