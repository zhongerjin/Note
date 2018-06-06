<template>
  <div>
    <ul>
      <li><a href="javascript:void(0)" @click="goback()">goback</a></li>
    </ul>
    <input type="text" v-model="doubleValue">
    <p>{{doubleValue}}</p>
    <div v-for="(value, key, index) in arrs">
      <span :key="key" @click="changeInput(key)">{{value.value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fucking-vue",
    data() {
      return {
        message: null,
        sbdl:null,
        value:5,
        arrs: [
          {value: '1'},
          {value: '2'},
          {value: '3'}
        ]
      }
    },
    computed: {
      doubleValue: {
        edit(data){

        },
        get(){
          //this function will determine what is displayed in the input
          return this.value;
        },
        set(newVal){
          //this function will run whenever the input changes
          this.value = newVal;
          this.arrs[this.$store.state.notefile.number || 0].value = this.value;
        }
      }
    },
    methods: {
      goback() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      changeInput(key) {
        console.log(key);
        this.doubleValue = this.arrs[key].value;
        this.arrs[key].value = this.doubleValue;
        this.$store.commit('setData',{
          which: 'number',
          data: key,
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  ul
    li a
      color: #42b983
      .sbdl &
        padding: 6px
      &:hover
        color: aquamarine;
</style>
