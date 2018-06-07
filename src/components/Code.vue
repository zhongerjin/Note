<template>
  <div class="editingArea">
    <textarea ref="textarea"></textarea>
    <div class="showingArea" v-html="markdown"></div>
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
      isFocus: Boolean
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
        lineNumbers: true,
        mode: 'javascript',
        // autoRefresh: true,
        tabSize: 2,
      });
      this.jsonEditor.setValue(this.value);
      this.markdown = marked(this.value);
      this.jsonEditor.on('change', cm => {
        // this.handleInput(cm);
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
    }
  }
</script>

<style>
  @import '../../node_modules/codemirror/lib/codemirror.css';
</style>
<!--<style scoped lang="stylus">-->
  <!--.editingArea-->
    <!--display flex-->
    <!--justify-content center-->
  <!--.CodeMirror-->
    <!--height auto-->
  <!--.CodeMirror-sizer-->
    <!--min-width 41vw-->
    <!--max-width 41vw-->
<!--</style>-->

<style>
  .editingArea{
    display: flex;
    justify-content: center;
  }
  .CodeMirror{
    max-width: 41vw;
    min-width: 41vw;
    height: auto;
  }
  .CodeMirror-sizer{
    max-width: 41vw;
    min-width: 41vw;
  }
  .showingArea{
    width: 38vw;
    overflow: auto;
  }
</style>

