<script lang="ts">
import Swiper from 'swiper';
import item1 from '@/assets/flatKitchen.png';
import item2 from '@/assets/robotlele.png';
import item3 from '@/assets/save.png';
import item4 from '@/assets/1.png';

export default {
    data(): {items: {id: number; image: string; description: string}[], details: {id: number; image: string; description: string}[], swiper: Swiper | null, hoverItem: number | null, showAddProjectPopup: boolean | null, newProjectName: string | null, newProjectImage: string|null} {
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
    hoverItem: null,
    showAddProjectPopup: false,
    newProjectName: '',
    newProjectImage: null
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
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            grabCursor: true
        });
        } else {
        this.swiper.update();
        }
    }
    },

    addProject() {
      this.showAddProjectPopup = true;
    },
    onFileChange(event) {
    this.newProjectImage = URL.createObjectURL(event.target.files[0]);
    },
    confirmAddProject() {
    const project = {
      id: 0,
      image: this.newProjectImage || item4,
      description: this.newProjectName
    };
    this.items.unshift(project);
    this.showAddProjectPopup = false;
    this.newProjectName = '';
    this.newProjectImage = null;
  },
    deleteItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },
  editItem(item) {
    this.showEditPopup = true;
    this.editingItem = item;
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
      <div class="add-project-button">
        <button @click="showAddProjectPopup = true"><b>+</b></button>
      </div>

      <div class="add-project-popup" v-if="showAddProjectPopup">
        <div class="popup-content">
        <button class="close-button" @click="showAddProjectPopup = false">X</button>
        <h2>Add Project</h2>
        <div class="input-container">
          <label for="project-name">Project Name:</label>
          <input id="project-name" type="text" v-model="newProjectName">
        </div>
        <div class="input-container">
          <label for="project-image">Project Image:</label>
          <input id="project-image" type="file" accept="image/*" @change="onFileChange">
        </div>
        <button class="add-button" @click="confirmAddProject">Add Project</button>
      </div>
    </div>


    <div class="container" ref="swiperContainer">
      <div class="item" v-for="item in items" :key="item.id" @mouseenter="hoverItem = item.id" @mouseleave="hoverItem = null"
  :class="{ 'hover': hoverItem === item.id }">
          <!-- Trash icon -->
          <i class="fas fa-trash-alt" v-if="hoverItem === item.id" @click="deleteItem(item)"  style="position: absolute; top: 5px; right: 5px;"></i>

          <!-- Edit icon -->
          <i class="fas fa-edit" v-if="hoverItem === item.id" @click="editItem(item)" style="position: absolute; top: 5px; right: 25px;"></i>

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
    padding: 60px;
    text-align: center;
  }

  .item p {
    font-size: 0.8em;
  }
}

.add-project-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px auto 0;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-project-button button {
  font-size: 1.8em;
  color: rgba(255, 204, 0, 0.5);
  background-color: white;
  border: none;
  outline: none;
}

.add-project-button button:hover {
  cursor: pointer;
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
  width: 450px;
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
  width: 1400px;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 50px 0;
}

.containerDetails {
  display: flex;
  width: 1400px;
  align-items: center;
  white-space: nowrap;
  padding: 50px 0;
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

.add-project-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  position: relative;
  width: 60%;
  max-width: 600px;
}

.popup-content h2 {
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  margin-bottom: 10px;
}

.input-container input[type="text"], 
.input-container input[type="file"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.add-button {
  background-color:rgba(255, 204, 0, 0.5);
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color:rgba(255, 204, 0, 0.714);
}

</style>
