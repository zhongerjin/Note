<template>
  <div>
    <div v-show="this.types === 'login'" class="login">
      <v-card-text>
        <v-form ref="form">
          <v-text-field prepend-icon="person" name="login" label="Account" type="text" v-model="login.account" :rules="rules.nameRules"></v-text-field>
          <v-text-field
            v-model="login.password"
            :append-icon="login_pwd_show ? 'visibility_off' : 'visibility'"
            prepend-icon="lock"
            :type="login_pwd_show ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="login_pwd_show = !login_pwd_show"
          ></v-text-field>
        </v-form>
        {{login.account}}
        {{login.password}}
      </v-card-text>
    </div>
    <div v-show="this.types === 'register'" class="register">
      <v-card-text>
        <v-form ref="form">
          <v-text-field prepend-icon="fa-smile" name="username" label="Name" type="text" v-model="register.username" :rules="rules.nameRules"></v-text-field>
          <v-text-field prepend-icon="person" name="account" label="Account" type="text" v-model="register.account" :rules="rules.accountRules"></v-text-field>
          <v-text-field
            v-model="register.password"
            :append-icon="register_pwd_show ? 'visibility_off' : 'visibility'"
            prepend-icon="lock"
            :type="register_pwd_show ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="register_pwd_show = !register_pwd_show"
            :rules="rules.passwordRules"
          ></v-text-field>
          <v-text-field
            v-model="register.confirm_password"
            :append-icon="register_conf_pwd_show ? 'visibility_off' : 'visibility'"
            prepend-icon="lock"
            :type="register_conf_pwd_show ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="register_conf_pwd_show = !register_conf_pwd_show"
            :rules="rules.passwordConfirmRules"
          ></v-text-field>
        </v-form>
        {{register.username}}
        {{register.account}}
        {{register.password}}
      </v-card-text>
    </div>

  </div>
</template>

<script>
  import Bus from './bus';
    export default {
      name: "zhi-component",
      data(){
        return{
          types: null,
          register:{
            username:'',
            account:'',
            password:'',
            confirm_password:''
          },
          login:{
            account:'',
            password:''
          },
          rules: {
            nameRules:[
              v => !!v || 'Name is required',
              v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            accountRules:[
              v => !!v || 'Account is required',
              v => v.length <= 10 || 'Account must be less than 10 characters'
            ],
            passwordRules:[
              v => !!v || 'Password is required',
              v => v.length <= 10 || 'Password must be less than 10 characters'
            ],
            passwordConfirmRules:[
              // v => console.log(this)
              v => v.length <= 10 || 'Password must be less than 10 characters',
              (
                v => v === this.register.password || 'Password different'
              ).bind(this)
            ],
          },
          register_pwd_show: false,
          register_conf_pwd_show: false,
          login_pwd_show: false,
        }
      },
      created(){
        this.types = (this.$route.path.replace(/\//, "")) === 'register'? 'register' : 'login';
        Bus.$on("changetype", type => {
          this.types = type;
        })
      }
    }
</script>

<style scoped>

</style>

<style scoped>
  /*@import '../../../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';*/
  @import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';
  @import '../../../node_modules/vuetify/dist/vuetify.min.css';
</style>
