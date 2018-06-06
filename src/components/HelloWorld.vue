<template>
  <div>
    <button @click="addPage">asd</button>
    <div v-for="(value, key, index) in allPage">
      <div @click="changePage(key)">{{value.data}}</div>
    </div>

    <div v-for="(value, key, index) in allPage" v-if="value.display">
      <input type="text" ref="key" v-model="value.data">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      allPage:[
        {display:true, data:'1'},
        {display:false, data:'2'},
        {display:false, data:'3'},
      ],
      index:4
    }
  },methods:{
      addPage(){
          this.allPage.forEach((e)=>{
              e.display = false;
          });
          this.allPage.push({
            display:true,
            data: this.index++,
          });
      },
      changePage(value){
          this.allPage.forEach((e)=>{
            e.display = false;
          });
          this.allPage[value].display = true;
      }
  },
  created(){
    this.allPage = this.$store.state.notefile.allPage || this.allPage;
  },
  destroyed(){
    this.$store.commit('increment');
    console.log(this.$store.state.notefile.count);
    this.$store.dispatch('saveNote', this.allPage);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  h1, h2
    font-weight: normal
  ul
    list-style-type: none
    padding: 0
    li
      display: inline-block
      margin: 0 10px
  a
    color: #42b983
</style>
