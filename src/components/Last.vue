<template>
  <div>
    <button @click="addNote">asd</button>
    <div class="big_box">
      <div class="nodelist">
        <div v-for="note in notes" @click="changeNode(note)">
          {{note.text.trim()}}
        </div>
      </div>
      <textarea @input="editNode"
      :value="activeNodeText"></textarea>
    </div>
  </div>
</template>

<script>
    export default {
      name: "last",
      data(){
        return {
        }
      },
      methods:{
        addNote(){
          this.$store.dispatch('addNote');
        },
        changeNode(note){
          this.$store.dispatch('changeNode', note)
        },
        editNode(e){
          this.$store.dispatch('editNodetext', e.target.value)
        }
      },
      computed:{
        notes(){
          return this.$store.getters.notes
        },
        activeNodeText(){
          return this.$store.getters.activeNode.text
        }
      }
    }
</script>

<style scoped lang="stylus">
  .big_box
    display: flex
    justify-content: space-between
    align-items: center
</style>
