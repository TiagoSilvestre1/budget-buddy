<script lang="ts">

import Swiper from 'swiper';
import item1 from '@/assets/flatKitchen.png';
import item2 from '@/assets/robotlele.png';
import item3 from '@/assets/save.png';
import item4 from '@/assets/1.png';
import { backendService, type API } from '@/services/api-service';
import { mapGetters } from 'vuex';


export default {
  
    data(): {
      
      items: {id: number; image: string; description: string}[], 
      details: {id: number; image: string; description: string}[], 
      tags: {id: number; title: string; color: string}[],
      swiper: Swiper | null,
      hoverItem: number | null, 
      showAddProjectPopup: boolean | null,
      newProjectName: string | null, 
      newProjectImage: string|null, 
      newProjectBudget: number | null, 
      newProjectStartDay: number|null, 
      newProjectStartMonth: string|null, 
      newProjectStartYear: number|null, 
      newProjectEndDay: number|null,
      newProjectEndMonth: string|null,
      newProjectEndYear: number|null,} {
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
    tags: [
      {
        id: 1,
        title: 'Home',
        color: '#4caf50'
      },
      {
        id: 2,
        title: 'School',
        color: '#3f51b5'
      },
      {
        id: 3,
        title: 'Hobby',
        color: '#f44336'
      },
      {
        id: 4,
        title: 'Save',
        color: '#9c27b0'
      },
    ],
    swiper: null,
    hoverItem: null,
    showAddProjectPopup: false,
    newProjectName: '',
    newProjectImage: null,
    newProjectBudget: null, 
    newProjectStartDay: null, 
    newProjectStartMonth: null, 
    newProjectStartYear: null, 
    newProjectEndDay: null,
    newProjectEndMonth: null,
    newProjectEndYear: null,
  };

},

mounted() {
    this.initializeSwiper();
  },
  updated() {
    this.initializeSwiper();
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project',['getProject'])
  },
  created() {
    backendService.get('api/project/byUserId?user_id=' + this.getUser.id).then((response: API) => {

      if('success' in response && response.success === true)
      {
        let id = 0;
        this.items = response.data.owned.concat(response.data.collaborates).map((v: any) => {
          id++;
          return {
            id: id,
            image: item4,
            description: v.title
          }
        })
      }
    });
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
    goToSettings() {
      this.$router.push('/settings');
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
  scrollRight() {
        const container = this.$refs.swiperContainer;
        container.scrollLeft += 100;
  }

  }
};
</script>

<template>

    <div>
    <div class="welcome-card">
      <img src="../assets/user.png" alt="Profile image">
      <i class="fas fa-edit" style="position: absolute; top: 5px; right: 25px; cursor: pointer;" @click="goToSettings"></i> 
      <div class="welcome-text">
        <h1><b> Welcome to Budget-Buddy!</b></h1>
        <p>Start counting more</p>
      </div>
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
        <label for="project-tag">Tags:</label>
        <div class="tags-container">
            <span class="tag" v-for="(tag, index) in tags" :key="index" :style="{ backgroundColor: tag.color }" :class="{ active: tag.color }" @click="selectTag(tag)">
              {{ tag.title }}
              <div class="tag-card">
                <h3>{{ tag.title }}</h3>
                <!-- <p>{{ tag.description }}</p> -->  
              </div>
            </span>
          </div>
       

        <div class="input-container">
          <label for="project-budget">Budget (€):</label>
          <input id="project-budget" type="number" min="0" step="0.01" v-model="newProjectBudget">
        </div>
        <div class="input-container">
        <label for="project-start">Start Date:</label>
        <!--
        <div class="date-picker">
          <select id="project-start-day" v-model="newProjectStartDay">
            <option value="">Day</option>
            <option v-for="day in 31" :value="day">{{ day }}</option>
          </select>
          <select id="project-start-month" v-model="newProjectStartMonth">
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select id="project-start-year" v-model="newProjectStartYear">
            <option value="">Year</option>
            <option v-for="year in 10" :value="new Date().getFullYear() + year">{{ new Date().getFullYear() + year }}</option>
          </select>
        </div>
        -->
        <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"

          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>

      </div>

        <div class="input-container">
          <label for="project-end">End Date:</label>
          <div class="date-picker">
            <select id="project-end-day" v-model="newProjectEndDay">
              <option value="">Day</option>
              <option v-for="day in 31" :value="day">{{ day }}</option>
            </select>
            <select id="project-end-month" v-model="newProjectEndMonth">
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select id="project-end-year" v-model="newProjectEndYear">
              <option value="">Year</option>
              <option v-for="year in 10" :value="new Date().getFullYear() + year">{{ new Date().getFullYear() + year }}</option>
            </select>
          </div>
        </div>

        <button class="add-button" @click="confirmAddProject">Add Project</button>
      </div>
    </div>


    <div class="home-container" ref="swiperContainer">
      <div class="item" v-for="item in items" :key="item.id" @mouseenter="hoverItem = item.id" @mouseleave="hoverItem = null"
  :class="{ 'hover': hoverItem === item.id }">
          <!-- Trash icon -->
          <i class="fas fa-trash-alt" v-if="hoverItem === item.id" @click="deleteItem(item)"  style="position: absolute; top: 5px; right: 5px;"></i>

          <!-- Edit icon -->
          <!-- <i class="fas fa-edit" v-if="hoverItem === item.id" style="position: absolute; top: 5px; right: 25px;"></i> -->

        <img :src="item.image" alt="item image">
        <p><b>{{ item.description }}</b></p>
      </div>
    </div>
    <div class="scroll-indicator" v-if="items.length > 3"  @click="scrollRight"></div>
  </div>


    <div class="titles">
      <div class="projects-title">
        <h1><b>Project Highlights</b></h1>
      </div>
    <div class="home-container" ref="swiperContainer2">
      <div class="itemDetail" v-for="item in details" :key="item.id" @mouseenter="hoverItem = item.id" @mouseleave="hoverItem = null"
  :class="{ 'hover': hoverItem === item.id }">
        <img :src="item.image" alt="itemDetail image">
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class="scroll-indicator" v-if="items.length > 3"  @click="scrollRight"></div>
  </div>
  </template>

<style>


@media only screen and (max-width: 500px) {
  .welcome-card {
    width: 375px;
    height: 200px;
    margin-right: 5px;
  }

  .welcome-card img {
    width: 100px !important;
    margin-right: 5px !important;
  }

  .welcome-text h1 {
    font-size: 2em !important;
    margin-bottom: 2px;
  }

  .welcome-text p {
    font-size: 1em !important;
  }

  .projects-title {
    margin-bottom: 50px;
    width: 80px !important;
    margin-left: 10px !important;
    margin-right: 25px;
  }

  .titles {
    font-size: 0.5em !important;
    margin-left: 10px !important;
    display: flex;
    margin-top: 25px;
    margin-right: 25px !important;
  }

  .item {
    width: 170px !important;
    height: 150px !important;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 5%;
    color: #fff;
    align-content: center;
  }

  .item p {
    font-size: 0.4em !important;
  }

  .item img {
  max-width: 75% !important;
  height: 75% !important;
  margin-top: 0px !important;
  }

  .itemDetail{
    transform: scale(1.6);
    margin-right: 60px !important;
    padding: 5% 0;
  }

  .add-project-button {
  z-index: 9999;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px auto 0;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 25%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container {
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding: 10% 0;
}

.containerDetails {
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  overflow-x: scroll;
}

.itemDetail img {
  max-width: 75% !important;
  height: 75% !important;
  margin-top: 0px !important;
}

.add-project-popup {
  transform: scale(0.9);
}

.popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  position: relative;
  width: 60%;
  max-width: 300px;
}

}

.add-project-button {
  z-index: 9999;
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px auto 0;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-project-button button {
  font-size: 1.8em;
  color:white;
  background-color:transparent;
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
  font-size: 24px;
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

.home-container {
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 50px 0;
}

.home-container::-webkit-scrollbar {
  display: none;
}

.scroll-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid black;
  cursor: pointer;
}


.containerDetails {
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 50px 0;
}

.containerDetails::-webkit-scrollbar {
  display: none;
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
  background-color: transparent;
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
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-container label {
  margin-right: 10px;
}

.input-container input {
  border: 1px solid grey;
  padding: 5px;
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

.tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  margin-right: 10px;
  margin-left: 40px;
  margin-top: 5px;
  margin-bottom: 25px;
  cursor: pointer;
}

.active {
  color: white;
}

.tag-card {
  display: none;
  position: absolute;
  top: 25px;
  left: 0;
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tag-card h3 {
  margin-top: 0;
}


</style>
