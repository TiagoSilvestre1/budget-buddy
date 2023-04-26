<template>
  <v-app>
    <div class="background"></div>
    <v-main class="d-flex justify-center align-center">
		<v-col cols="12" lg="4" class="mx-auto" style="max-width: 900px;">
			<v-card class="pa-4 card-container" variant="outlined">
				<v-card-title>
					<v-row align="center">
						<v-col cols="6">
						<h2 class="indigo--text">Register</h2>
						</v-col>
						<v-col cols="6" class="text-right">
						<v-btn
							color="deep-orange" 
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
						:rules="nameRules"
						v-model="name"
						type="text"
						label="Name"
						placeholder="Name"
						prepend-inner-icon="mdi-account"
						required
					/>
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
					<v-text-field
						v-model="repeatPassword"
						:rules="passwordRules"
						:type="passwordRepeatShow?'text':'password'"
						label="Repeat Password"
						placeholder="Repeat Password"
						prepend-inner-icon="mdi-key"
						:append-icon="passwordRepeatShow ? 'mdi-eye':'mdi-eye-off'"
						@click:append="passwordRepeatShow = !passwordRepeatShow"
						required
					/>
					</v-card-text>

					<v-card-item>
						<div class="alternative-option mt-4">
							Already have an account? <span class="underline-on-hover" @click="goToLogin">Login</span>
						</div>
					</v-card-item>

					<v-card-actions class="justify-center">
					<v-btn @click="goHome" type="submit" color="deep-orange" variant="tonal">
						<span class="dark--text px-8">Back</span>
					</v-btn>
					<v-btn :loading="loading" type="submit" color="deep-orange" variant="flat">
						<span class="dark--text px-8">Register</span>
					</v-btn>
					
					</v-card-actions>
				</v-form>
			</v-card>
     	</v-col>
    </v-main>
    <v-snackbar top color="green" v-model="successMsg">
      Success creating account
    </v-snackbar>
	<v-snackbar top color="red" v-model="errorMsg">
      Error creating account
    </v-snackbar>
	<v-snackbar top color="orange" v-model="passwordNotEqual">
      Password doesn't match repeat Password
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
import * as API from '../services/api-service';
import { getTransitionRawChildren } from 'vue';

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
		successMsg:false,
		errorMsg:false,
		passwordNotEqual:false,
		passwordShow:false,
		passwordRepeatShow:false,
		name: '',
		nameRules: [
			( v: any) => !!v || 'Name is required',
			( v: string) => v != "" || 'Name must not be empty',
		],
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
		repeatPassword: '',

	}),
	methods:{
		clear(): void {
			// Not used at the moment, but can be in the future
			const refForm: any = this.$refs.form;
			refForm.reset();
		},
		async submitHandler(){
			// this.$refs.form functions only for pure Js, not Ts
			const refForm: any = this.$refs.form;
			
			// Bind the promise to an action 
			refForm.validate().then(async(result: any) => { 
				const isValid = result.valid;

				// Check that the values are in correct form
				if(!isValid) return
				if(this.password !== this.repeatPassword){
					this.loading = true;
					setTimeout(() => {
					this.loading = false;
					this.passwordNotEqual = true;
					}, 100);
				}

				// Access database and check credentials
				const res = await API.backendService.post('api/user/create' , {
					email: this.email,
					password: this.password,
					name: this.name
				});
				
				if (res.success) {
					this.loading = true;
					setTimeout(() => {
					this.loading = false;
					this.successMsg = true;
					}, 1500);
				} else {
					this.loading = true;
					setTimeout(() => {
					this.loading = false;
					this.errorMsg = true;
					}, 1500);
				}
			});
		},
		goToLogin(){
			this.$router.push({ path: 'login'})
		},
		goHome(){
			this.$router.push({ path: '/'})
		},
		getPasswordValue() {
			return this.password;
		},
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
		color: #ff5722;
		cursor: pointer;
	}
</style>