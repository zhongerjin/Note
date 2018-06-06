<template>
  <div>
    <input type="text" @keyup.enter="addOne" v-model="sbdl">
    <div v-for="(value, key, index) in Fuckdl">
        <span>
          {{value}}
        </span>
      <button @click="delOne(key)">X</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "todo-list",
    data() {
      return {
        Fuckdl: [],
        sbdl: ''
      }
    },
    methods: {
      addOne() {
        this.Fuckdl.push(this.sbdl);
        this.sbdl = '';
      },
      delOne(key){
        this.Fuckdl.splice(key, 1);
      }
    }
  }
</script>

<style scoped>

</style>
