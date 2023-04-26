<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="7" lg="4" class="mx-auto">
        <v-card class="pa-4 card-container" variant="outlined">
          <v-card-title>
            <v-row align="center">
				<v-col cols="6">
				<h2 class="indigo--text">Login</h2>
				</v-col>
				<v-col cols="6" class="text-right">
				<v-btn
					color="indigo" 
					variant="tonal"
					prepend-icon="mdi-theme-light-dark"
					title="toggle theme"
					@click="toggleTheme"
				></v-btn>
				</v-col>
			</v-row>
          </v-card-title>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                type="email"
                label="Email"
                placeholder="Email"
                prepend-inner-icon="mdi-email"
                required
              />
              <v-text-field
				v-model="password"
				:rules="passwordRules"
				:type="passwordShow?'text':'password'"
				label="Password"
				placeholder="Password"
				prepend-inner-icon="mdi-key"
				:append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
				@click:append="passwordShow = !passwordShow"
				required
              />
            </v-card-text>

			<v-card-item>
				<div class="alternative-option mt-4">
					Don't have an account? <span class="underline-on-hover" @click="goToRegister">Register</span>
				</div>
			</v-card-item>

            <v-card-actions class="justify-center">
              <v-btn @click="goHome" type="submit" color="indigo" variant="tonal">
                <span class="dark--text px-8">Back</span>
              </v-btn>
              <v-btn :loading="loading" type="submit" color="indigo" variant="flat">
                <span class="dark--text px-8">Login</span>
              </v-btn>
              
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Login success
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs'

export default {
	setup() {
		const theme = useTheme()
		return {
		theme,
		toggleTheme: () =>
			(theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')
		}
	},
	data: () => ({
		loading:false,
		snackbar:false,
		passwordShow:false,
		email: '',
		emailRules: [
			( v: any) => !!v || 'E-mail is required',
			( v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		password: '',
		passwordRules: [
			( v: any) => !!v || 'Password is required',
			( v: string | any[]) => (v && v.length >= 6) || 'Password must be 6  characters or more!',
		],
	}),
	methods:{
		clear(): void {
			// Not used at the moment, but can be in the future
			const refForm: any = this.$refs.form;
			refForm.reset();
		},
		submitHandler(){
			// this.$refs.form functions only for pure Js, not Ts
			const refForm: any = this.$refs.form;
			if (refForm.validate()){
				this.loading = true
				setTimeout(()=> {
					this.loading = false
					this.snackbar = true
				},3000)
			}
		},
		goToRegister(){
			this.$router.push({ path: 'register'})
		},
		goHome(){
			this.$router.push({ path: '/'})
		}
	}	
};
</script>

<style>
	.background{
		/* Try to find a nice background for this */
		height: 100%;
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		background-size: cover;
		z-index: -1;
	}

	.card-container {
		background-color: rgba(255, 255, 255, 0.9);
		padding: 32px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
	}

	.underline-on-hover:hover {
		text-decoration: underline;
	}

	.alternative-option > span {
		color: #0d6efd;
		cursor: pointer;
	}
</style>