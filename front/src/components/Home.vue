<script lang="ts">
import Swiper from 'swiper'
import item1 from '@/assets/flatKitchen.png'
import item2 from '@/assets/robotlele.png'
import item3 from '@/assets/save.png'
import item4 from '@/assets/1.png'
import { backendService, type API } from '@/services/api-service'
import { mapGetters, useStore } from 'vuex'
import { ref } from 'vue'
import { HttpStatusCode, type AxiosResponse } from 'axios'
import type { Project } from '@/interfaces/project'

const date = ref(new Date())
const popover = ref(true)

export default {
  emits: ['update'],
  data(): {
    loading: boolean
    dialog: boolean
    projects: Project[]
    collaborates: Project[]
    tags: { id: number; title: string; color: string }[]
    swiper: Swiper | null
    hoverItem: string | null
    hoverItem2: string | null
    new_project_name: string | null
    newProjectImage: string | null
    new_project_budget: number | null
    new_project_start_date: Date | null
    new_project_end_date: Date | null
    possibleImages: String[]
    possibleImagesIndex: number
    store: any
  } {
    return {
      loading: false,
      dialog: false,
      projects: [],
      collaborates: [],
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
        }
      ],
      swiper: null,
      hoverItem: null,
      hoverItem2: null,
      new_project_name: null,
      newProjectImage: null,
      new_project_start_date: null,
      new_project_end_date: null,
      new_project_budget: null,
      possibleImages: [],
      possibleImagesIndex: 0,
      store: useStore()
    }
  },

  mounted() {
    this.initializeSwiper()
  },
  updated() {
    this.initializeSwiper()
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  created() {
    this.populateProjects()
    this.listImages()
  },
  methods: {
    populateProjects() {
      backendService
        .get('api/project/byUserId?user_id=' + this.getUser.id)
        .then((response: API) => {
          if ('success' in response && response.success === true) {
            this.possibleImagesIndex = 0
            this.projects = response.data.owned
            this.projects.forEach((element: any) => {
              element['image'] = this.getNewImage()
            })
            this.collaborates = response.data.collaborates
            this.collaborates.forEach((element: any) => {
              element['image'] = this.getNewImage()
            })
          }
        })
    },

    initializeSwiper() {
      const swiperContainer = document.getElementById('swiperContainer')
      if (swiperContainer) {
        if (!this.swiper) {
          this.swiper = new Swiper(swiperContainer, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            grabCursor: true
          })
        } else {
          this.swiper.update()
        }
      }
    },
    goToSettings() {
      this.$router.push('/settings')
    },

    onFileChange(event: any) {
      this.newProjectImage = URL.createObjectURL(event.target.files[0])
    },
    /*
    		title: string;
		owner_id: string,
		total_budget: number | undefined,
		start_date: any,
		end_date: any
    */
    confirmAddProject() {
      this.dialog = false
      const project = {
        id: 0,
        image: this.newProjectImage || item4,
        description: this.new_project_name
      }

      const backend_project = {
        owner_id: this.getUser.id,
        title: this.new_project_name,
        total_budget: this.new_project_budget,
        start_date: this.new_project_start_date,
        end_date: this.new_project_end_date
      }

      backendService
        .post('api/project/create', backend_project, true)
        .then((response: AxiosResponse) => {
          if (response.status === HttpStatusCode.Ok) {
            this.populateProjects()
            this.$emit('update', 'project')
          }
        })
    },
    deleteProject(pid: string) {
      backendService
        .post(`api/project/delete`, { id: pid }, true)
        .then((response: AxiosResponse) => {
          if (response.status === HttpStatusCode.Created) this.populateProjects()
          this.$emit('update', 'project')
        })
    },
    scrollRight() {
      const container: any = this.$refs.swiperContainer
      container.scrollLeft += 100
    },
    listImages() {
      this.possibleImages = []
      this.possibleImages.push('/src/assets/icons/614.png')
      this.possibleImages.push('/src/assets/icons/15094.png')
      this.possibleImages.push('/src/assets/icons/79761.png')
      this.possibleImages.push('/src/assets/icons/148465.png')
      this.possibleImages.push('/src/assets/icons/167096.png')
      this.possibleImages.push('/src/assets/icons/497433.png')
      this.possibleImages.push('/src/assets/icons/544081.png')
      this.possibleImages.push('/src/assets/icons/694188.png')
      this.possibleImages.push('/src/assets/icons/838064.png')
      this.possibleImages.push('/src/assets/icons/950299.png')
      this.possibleImages.push('/src/assets/icons/1022179.png')
      this.possibleImages.push('/src/assets/icons/1067555.png')
      this.possibleImages.push('/src/assets/icons/1148917.png')
      this.possibleImages.push('/src/assets/icons/1518185.png')
      this.possibleImages.push('/src/assets/icons/1548088.png')
      this.possibleImages.push('/src/assets/icons/1663834.png')
      this.possibleImages.push('/src/assets/icons/1670382.png')
      this.possibleImages.push('/src/assets/icons/1688506.png')
      this.possibleImages.push('/src/assets/icons/1716995.png')
      this.possibleImages.push('/src/assets/icons/1732035.png')
    },
    getNewImage(): String {
      return this.possibleImages[this.possibleImagesIndex++ % this.possibleImages.length]
    },
    async selectProject(id: string) {
      let obj = this.projects.find((val) => val._id === id)
      if (obj == null) obj = this.collaborates.find((val) => val._id === id)
      await this.store.dispatch('project/SelectProject', obj)
    }
  }
}
</script>

<template>
  <div>
    <div class="welcome-card">
      <img src="../assets/user.png" alt="Profile image" />
      <i
        class="fas fa-edit"
        style="position: absolute; top: 5px; right: 25px; cursor: pointer"
        @click="goToSettings"
      ></i>
      <div class="welcome-text">
        <h1>
          <b> Welcome to Budget-Buddy {{ getUser.name }}!</b>
        </h1>
        <p>Start counting more</p>
      </div>
    </div>
  </div>

  <div class="title-button-container">
    <h3><b>Your Projects</b></h3>
    <v-dialog v-model="dialog" :fullscreen="true">
      <template v-slot:activator="{ props }">
        <v-btn variant="outlined" icon="mdi-plus" v-bind="props"> </v-btn>
      </template>

      <v-card style="max-width: 100%; overflow-x: hidden">
        <v-card-title>
          <v-btn icon class="dialog-close-button" @click="dialog = false" style="float: right">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="new_project_name" label="Project name"></v-text-field>

          <!--<v-file-input
    accept="image/png, image/jpeg, image/bmp"
    prepend-icon="mdi-camera"
    label="Project image"
    ></v-file-input>-->

          <label for="project-tag">Tags</label>
          <div style="display: inline-block">
            <span
              class="tag"
              v-for="(tag, index) in tags"
              :key="index"
              :style="{ backgroundColor: tag.color }"
              :class="{ active: tag.color }"
              @click="selectTag(tag)"
            >
              {{ tag.title }}
              <div class="tag-card">
                <h3>{{ tag.title }}</h3>
              </div>
            </span>
          </div>

          <v-text-field
            label="Budget"
            v-model="new_project_budget"
            prefix="€"
            type="number"
          ></v-text-field>
          <h4>Start date</h4>
          <VueDatePicker v-model="new_project_start_date" :enable-time-picker="false" />
          <br />
          <h4>End date</h4>
          <VueDatePicker v-model="new_project_end_date" :enable-time-picker="false" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="confirmAddProject" color="primary" variant="tonal" block
            >Add Project</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="titles" v-if="projects.length > 0">
    <div class="home-container" ref="swiperContainer">
      <a
        v-for="project in projects"
        :key="project._id"
        :href="'/project/' + project._id"
        @click="selectProject(project._id)"
      >
        <div
          class="item"
          @mouseenter="hoverItem = project._id"
          @mouseleave="hoverItem = null"
          :class="{ hover: hoverItem === project._id }"
        >
          <!-- Trash icon -->
          <i
            class="fas fa-trash-alt"
            v-if="hoverItem === project._id"
            @click="deleteProject(project._id)"
            style="position: absolute; top: 5px; right: 5px"
          ></i>
          <!-- Edit icon -->
          <!-- <i class="fas fa-edit" v-if="hoverItem === item.id" style="position: absolute; top: 5px; right: 25px;"></i> -->
          <img :src="project.image" alt="item image" />
          <p>
            <b>{{ project.title }}</b>
          </p>
        </div>
      </a>
      <div class="scroll-indicator" v-if="projects.length > 3" @click="scrollRight"></div>
    </div>
  </div>
  <v-row v-else>
    <v-col cols="12">
      <h4 style="padding-left: 30px;">You haven't created any project</h4>
    </v-col>
  </v-row>

  <div style="height: 1cm"></div>

  <h3 style="padding-left: 10px;"><b>Other Projects</b></h3>

  <div class="titles" v-if="collaborates.length > 0">
    <div class="home-container" ref="swiperContainer2">
      <a
        v-for="project in collaborates"
        :key="project._id"
        :href="'/project/' + project._id"
        @click="selectProject(project._id)"
      >
        <div
          class="item"
          @mouseenter="hoverItem2 = project._id"
          @mouseleave="hoverItem2 = null"
          :class="{ hover: hoverItem2 === project._id }"
        >
          <!-- Trash icon -->
          <i
            class="fas fa-trash-alt"
            v-if="hoverItem2 === project._id"
            @click="deleteProject(project._id)"
            style="position: absolute; top: 5px; right: 5px"
          ></i>
          <!-- Edit icon -->
          <!-- <i class="fas fa-edit" v-if="hoverItem === item.id" style="position: absolute; top: 5px; right: 25px;"></i> -->
          <img :src="project.image" alt="item image" />
          <p>
            <b>{{ project.title }}</b>
          </p>
        </div>
      </a>
    </div>
    <div class="scroll-indicator" v-if="projects.length > 3" @click="scrollRight"></div>
  </div>
  <v-row v-else>
    <v-col cols="12">
      <h4 style="padding-left: 30px;padding-top: 20px;">You aren't collaborating in any project</h4>
    </v-col>
  </v-row>
</template>

<style>
@media only screen and (max-width: 500px) {
  .welcome-card {
    width: 100%;
    height: 200px;
    margin-right: 5px;
    min-height: fit-content;
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

  .itemDetail {
    transform: scale(1.6);
    margin-right: 60px !important;
    padding: 5% 0;
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

.welcome-card {
  background-color: rgba(255, 204, 0, 0.5);
  margin-bottom: 40px;
  min-height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  width: 100%;
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

  margin-left: 10px !important;
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
  padding: 15px 0;
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

.input-container input[type='text'],
.input-container input[type='file'] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.add-button {
  background-color: rgba(255, 204, 0, 0.5);
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: rgba(255, 204, 0, 0.714);
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

.title-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.right-button {
  display: inline-block;
}
</style>
