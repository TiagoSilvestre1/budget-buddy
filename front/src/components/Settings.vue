
<script lang="ts">
import item4 from '@/assets/1.png';
    export default{
        data(): {
            name: string | null, 
            phone: string | null, 
            email: string | null, 
            isEditing: false | true,
            profileImg: string | '@/assets/1.png',
            showAddProjectPopup: boolean | null,}{
            return {
            name: '',
            phone: '',
            email: '',
            isEditing: false,
            profileImg: item4,
            showAddProjectPopup: false,
            }
        },
        methods: {
            editProfile() {
            this.isEditing = true;
            this.showAddProjectPopup = true;
            },
            saveProfile() {
            this.isEditing = false;
            },
            onFileChange(event) {
            this.profileImg = URL.createObjectURL(event.target.files[0]);
            },
            confirmAddProject() {

                if (this.profileImg) {
                this.showAddProjectPopup = false;
            }
           
        },

        }
        }
</script>
<template>
    <div class="container">
      <div class="card yellow">
        <form class="profile-form" @submit.prevent="saveProfile">
          <H1><b>Personal Info</b></H1>
          <div class="form-group">
            <label for="name"><b>Name:</b></label>
            <input type="text" id="name" v-model="name">
          </div>
          <div class="form-group">
            <label for="phone"><b>Phone:</b></label>
            <input type="tel" id="phone" v-model="phone">
          </div>
          <div class="form-group">
            <label for="email"><b>Email:</b></label>
            <input type="email" id="email" v-model="email">
          </div>
          <button class="save-button" :disabled="!name || !phone || !email" type="submit">Save</button>
        </form>
      </div>
      <div class="card-noShade white">
        <div class="add-project-button">
        <button @click="showAddProjectPopup = true"><i class="fas fa-edit"></i></button>
        <div class="add-project-popup" v-if="showAddProjectPopup">
        <div class="popup-content">
        <button class="close-button" @click="showAddProjectPopup = false">x</button>
        <h2>Update Your Profile Picture</h2>
        
        <div class="input-container">
          <label for="project-image">Profile Image:</label>
          <input id="project-image" type="file" accept="image/*" @change="onFileChange">
        </div>
        <button class="add-button-Up" @click="confirmAddProject">Update</button>
     </div>
        </div>
        </div>
        
        <div class="profile-img">
        <img :src="profileImg" alt="Profile image">
        </div>

      </div>
    </div>
  </template>
  
  <style>

    @media screen and (max-width: 767px) {
      .container {
        flex-direction: column-reverse;
      }
      .card, .card-noShade {
        flex-basis: column;
      }
      .profile-form {
        margin-left: 0;
      }
    }

    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .profile-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }


  
    .card {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      padding: 1rem;
      margin: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .card-noShade {
      padding: 1rem;
      margin: 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
  
    .yellow {
      background-color: rgba(255, 204, 0, 0.5);
      flex-basis: 20%;
      justify-content: center;
    }
  
    .white {
      background-color: transparent;
      flex-basis: 30%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .profile-img {
      width: 80%;
      height: 80%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  
    .profile-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  
    .profile-img i {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
      background-color: transparent;
      padding: 0.25rem;
      cursor: pointer;
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  
    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
    }
  
    input {
      height: 2rem;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid #ccc;
      font-size: 1.1rem;
      background-color: white;
      border: 2px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  
    .save-button {
      background-color: rgba(255, 204, 0, 0.8);
      border: none;
      border-radius: 0.25rem;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      padding: 0.5rem;
      cursor: pointer;
    }
  
    .save-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .add-project-popup {
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    width: 100% !important;
    height: 100% !important;
    color: black;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    }

.popup-content {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important;
  background-color: white;
  color: black;
  padding: 40px;
  border-radius: 20px;
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
}

.add-project-popup .popup-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 80%;
  max-width: 600px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.popup-content h2 {
  margin-bottom: 20px;
}

.close-button {
  position: absolute;
  color: black !important;
  top: 10px;
  right: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-container label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-container input[type="file"] {
  margin-top: 0.5rem;
  margin-bottom: 6 rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}


.add-button-Up {
  background-color: rgb(255, 204, 0) !important;
  color: black !important;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
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
  background-color: rgb(255, 204, 0);
  border: none;
  outline: none;
}

.add-project-button button:hover {
  cursor: pointer;
}

  </style>