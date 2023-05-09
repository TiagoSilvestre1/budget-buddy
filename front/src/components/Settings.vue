<script lang="ts">
import item4 from '@/assets/1.png'
import { mapGetters } from 'vuex'
export default {
  data(): {
    on: boolean
    edit_name: string | null
    edit_email: string | null
    name: string | null
    phone: string | null
    email: string | null
    isEditing: false | true
    profileImg: string | '@/assets/1.png'
    showAddProjectPopup: boolean | null
    fav: true
    menu: false
    message: false
    hints: true
  } {
    return {
      on: false,
      edit_name: '',
      edit_email: '',
      name: '',
      phone: '',
      email: '',
      isEditing: false,
      profileImg: item4,
      showAddProjectPopup: false,
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  },
  methods: {
    editProfile() {
      this.isEditing = true
      this.showAddProjectPopup = true
    },
    saveProfile() {
      this.isEditing = false
    },
    onFileChange(event) {
      this.profileImg = URL.createObjectURL(event.target.files[0])
    },
    confirmAddProject() {
      if (this.profileImg) {
        this.showAddProjectPopup = false
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  created() {
    this.edit_name = this.getUser.name
    this.edit_email = this.getUser.mail
  }
}
</script>
<template>
  <div class="s-main-container" style="padding: 10px">
    <h1>Settings</h1>
    <v-card :class="[`elevation-8`]" class="image-block" style="margin: 20px">
      <img :src="profileImg" alt="Profile image" />
      <v-btn
        @click="showAddProjectPopup = true"
        icon="mdi-pencil"
        style="position: absolute; top: 5px; right: 5px"
      ></v-btn>

      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-pencil" style="position: absolute; top: 5px; right: 5px" v-bind="props">
          </v-btn>
        </template>

        <v-card style="min-width: 6cm">
          <v-card-text>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Choose a profile picture"
              prepend-icon="mdi-camera"
              label="Profile picture"
            ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" variant="text" @click="menu = false"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
    <div class="input-block" style="padding: 20px; max-width: 15cm">
      <h3><b>Personal data</b></h3>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="edit_name"
              label="Name"
              append-icon="mdi-content-save"
              @click:append="name = edit_name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="edit_email"
              label="Email"
              append-icon="mdi-content-save"
              @click:append="email = edit_email"
              :disabled="true"
            ></v-text-field>
          </v-col>
        </v-row>

        <div style="height: 200px"></div>
      </v-container>
    </div>
  </div>
</template>

<style>
.s-main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input-block {
  background-color: rgba(255, 204, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.input-block input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.image-block {
  max-width: 100%;
  text-align: center;
}

.image-block img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
