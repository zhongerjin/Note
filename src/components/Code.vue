<template>
  <div class="editingArea">
    <div class="toggle" @click="interesting"></div>
    <textarea ref="textarea"></textarea>
    <div class="showingArea pad10" v-html="markdown"></div>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/mode/javascript/javascript'
  import marked from 'marked/marked.min'

  export default {
    name: "codes",
    data() {
      return {
        jsonEditor: null,
        markdown: null,
        hhh: null
      }
    },
    props: {
      value: String,
      isFocus: Boolean,
      isSbdl: Boolean
    },
    watch: {
      value(value, oldValue) {
        console.log(oldValue);
        if (value !== oldValue) {
          this.jsonEditor.setValue(this.value);
        }
      },
      isFocus(isFocus) {
        console.log(isFocus);
        if(!isFocus){return false;}
        this.jsonEditor.focus();
        this.jsonEditor.setCursor(this.jsonEditor.lineCount(), 0);
      },
      hhh(value) {
        console.log('www');
        this.$emit('input', value);
      }
    },
    mounted() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        // lineNumbers: true,
        mode: 'javascript',
        autoRefresh: true,
        tabSize: 2,
        smartIndent: false,
        theme: 'shadowfox'
      });
      this.jsonEditor.setValue(this.value);
      this.markdown = marked(this.value);
      this.jsonEditor.on('change', cm => {
        // this.$emit('changed', cm.getValue());
        // this.$emit('input', cm.getValue());
        // this.hhh = cm.getValue();
        this.markdown = marked(cm.getValue());
      })
      this.jsonEditor.on('blur', cm => {
        this.hhh = cm.getValue();
      });
    },
    methods: {
      interesting(){
        this.$emit('changeSbdl', !this.isSbdl);
      }
    }
  }
</script>

<style>
  @import '../../node_modules/codemirror/lib/codemirror.css';
  @import '../../node_modules/codemirror/theme/shadowfox.css';
</style>

<style scoped lang="stylus">
  .editingArea
    display flex
    min-height 88.8vh
    max-height 88.8vh
    position relative
    .toggle
      position absolute
      width .8vw
      height 5vh
      background-color #7e7
      left 0
      bottom 12vh
      z-index 999
      display flex
      align-items center
      justify-content center
      cursor pointer
</style>

<style>
  .pad10{
    padding: .8vh .8vw;
  }
  .editingArea{
    display: flex;
    /*justify-content: center;*/
    min-height: 88.8vh;
    max-height: 88.8vh;
  }
  .CodeMirror{
    max-width: 38vw;
    min-width: 38vw;
    height: auto;
    padding: .8vh .8vw;
    transition: .2s ease;
  }
  .CodeMirror-sizer{
    max-width: 41vw;
    min-width: 41vw;
  }
  .showingArea{
    padding-top: 0;
    width: 38vw;
    overflow: auto;
    transition: .2s ease;
  }
</style>

