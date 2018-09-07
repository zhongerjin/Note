<template>
  <v-app id="inspire">
    <canvas id="canvas"></canvas>
    <v-content>
      <v-container fluid fill-height>
        <div class="mx-auto">
          <div class="mx-auto-chil">
            <div class="tab-navs">
              <div class="navs-slider" ref="nav-slider" :class="this.navs_mode">
                <router-link to="/register">register</router-link>
                <router-link to="/login">login</router-link>
                <span class="navs-slider-bar"></span>
              </div>
            </div>
          <zhicomponent></zhicomponent>
          </div>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Bus from './bus';
  import zhicomponent from './ZhiComponent'
  import ZhiCanvas from './ZhiCanvas.js'
    export default {
        name: "zhi",
      data: () => ({
        ActiveIndex: 0,
        navs_mode: null
      }),
      created(){
        this.navs_mode = (this.$route.path.replace(/\//, "")) === 'register'? 'nav-register' : 'nav-login';
        Bus.$emit("choiceType", this.navs_mode);
      },
      methods: {
          changeType(type){
            Bus.$emit('changetype', type);
            this.navs_mode = `nav-${type}`;
          }
      },
      watch: {
        '$route'(to){
          console.log(to.path.match(/\w+/g)[0]);
          this.changeType(to.path.match(/\w+/g)[0]);
        }
      },
      components: {
        zhicomponent
      },
      mounted(){
        ZhiCanvas(30);
      }
    }
</script>

<style scoped lang="sass">
  #inspire
    /*background: url("../../assets/login_page.jpg") center/100% 100% no-repeat*/
  #canvas
    position: absolute
  .mx-auto-chil
    display: flex
    align-items: flex-start
    flex-direction: column
    height: 257px
  .navs-slider
    position: relative
    display: inline-block
  .navs-slider a
    text-decoration: none
    color: #5e5e5e
    width: 8vw
    display: inline-block
    text-align: center
    opacity: .5
    &.router-link-active
      color: #2196f3
      opacity: 1 !important
  .navs-slider .navs-slider-bar
    width: 3vw
    height: .5vh
    background-color: #2196f3
    position: absolute
    left: 0
    bottom: -1vh
    margin: 0 2.3vw
    transition: .3s ease
  .navs-slider.nav-login .navs-slider-bar
    left: 8.6vw
  #particles
    position: absolute
    width: 100%
    height: 100%
    background-size: cover
    background: #b61924 no-repeat 50% 50%

</style>

<style scoped>
  @import '../../../node_modules/vuetify/dist/vuetify.min.css';
</style>
