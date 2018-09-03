<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    slot="activator"
                    :href="source"
                    icon
                    large
                    target="_blank"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="login.username" :rules="nameRules"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" v-model="login.password" :rules="nameRules"
                                type="password"></v-text-field>
                </v-form>
                {{login.username}}
                {{login.password}}
              </v-card-text>
              <v-alert v-if="isShow"
                :value="true"
                type="error"
              >
                {{errorMsg}}
              </v-alert>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="user_login()">Login</v-btn>
                <v-btn color="primary green accent-2" @click="user_register()">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "login",
    data: () => ({
      drawer: null,
      source: "sbdl",
      login:{
        username:'',
        password:''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      isShow: false,
      errorMsg:null,
    }),
    props: {
    },
    methods: {
      user_register(){
        if(this.$refs.form.validate()){
          axios.post('/register', {
            userinfo:{
              account: this.login.username,
              password: this.login.password
            }
          }).then((response) => {
            console.log(response);
            this.isShow = (response.data.type === "error");
            this.errorMsg = this.isShow ? response.data.msg : '';
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      user_login(){
        if(this.$refs.form.validate()){
          axios.post('/login', {
            userinfo: {
              account: this.login.username,
              password: this.login.password
            }
          }).then((response) => {
            console.log(response);
            this.isShow = (response.data.type === "error");
            this.errorMsg = this.isShow ? response.data.msg : '';
          }).catch((error) => {
            console.log(error);
          })

        }
      }
    }
  }
</script>

<style>

  /*@import '../../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';*/
  /*@import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';*/
</style>

<style scoped>
  @import '../../node_modules/vuetify/dist/vuetify.min.css';
</style>
