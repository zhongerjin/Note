<template>
  <textarea ref="textarea"></textarea>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/mode/javascript/javascript'
  export default {
    name: "codes",
    data(){
      return {
        jsonEditor: null
      }
    },
    props: {
      value: String,
      isFocus: Boolean
    },
    watch: {
      value(value, oldValue){
        console.log(oldValue);
        // const editor = this.jsonEditor.getValue();
        if(value !== oldValue){
          // this.jsonEditor.setValue(JSON.stringify(JSON.parse(this.value), null, 2))
          this.jsonEditor.setValue(this.value);
        }
      },
      isFocus(isFocus){
        console.log(isFocus);
      }
    },
    mounted() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: 'javascript',
        autoRefresh: true,
      });
      this.jsonEditor.setValue(this.value);
      this.jsonEditor.on('change', cm => {
        // this.handleInput(cm);
        // this.$emit('changed', cm.getValue());
        this.$emit('input', cm.getValue());
      })
    },
    methods: {
      // getValue(){
      //   console.log('yo');
      //   return this.jsonEditor.getValue();
      // },
      // handleInput(e){
      //   if(this.changeFn){
      //     this.changeFn(e.getValue());
      //   }
      // }
    }
  }
</script>

<style scoped>

</style>

<style>
  @import '../../node_modules/codemirror/lib/codemirror.css';
</style>
