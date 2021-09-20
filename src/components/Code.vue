<template>
  <div class="editingArea" :class="(sideBarIsClose ? 'recover' : '')">
    <div class="toggle" @click="toggleSideBar"></div>
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
        Editor: null,
        markdown: null,
        editorValue: null,
        sideBarIsClose: false,
        isChangeNote: false
      }
    },
    props: {
      value: String,
      isFocus: Boolean,
      isRecover: Boolean,
      valueNumber: Number,
      isDelNote: Boolean
    },
    watch: {
      valueNumber(value, oldValue){
        //当数据全部为空时，会将valueNumber设置未-1，以达到清空编辑器和标题框的效果
        if(value !== oldValue && oldValue !== -1){
          this.isChangeNote = true;
        }
      },
      value(value, oldValue) {
        if (this.isChangeNote || this.isDelNote) {
          this.isChangeNote = false;
          this.Editor.setValue(this.value);
        }
      },
      isFocus(isFocus) {
        if(!isFocus){return false;}
        this.Editor.focus();
        this.Editor.setCursor(this.Editor.lineCount(), 0);
      },
      editorValue(value, oldValue) {
        if(value !== oldValue){
          this.$emit('input', value);
        }
      }
    },
    mounted() {
      this.Editor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: 'javascript',
        autoRefresh: true,
        tabSize: 2,
        smartIndent: false,
        theme: 'shadowfox'
      });
      this.Editor.setValue(this.value);
      this.markdown = marked(this.value);
      this.Editor.on('change', cm => {
        this.editorValue = cm.getValue();
        this.markdown = marked(cm.getValue());
      });
      this.Editor.on('focus', cm => {
        this.$emit('changeInputFocus', false);
      });
      this.Editor.on('blur', cm => {
        this.editorValue = cm.getValue();
        this.changeIsFocus();
      });
    },
    methods: {
      toggleSideBar(){
        this.sideBarIsClose = !this.isRecover;
        this.$emit('changeRecover', this.sideBarIsClose);
      },
      changeIsFocus(){
        this.$emit('changeIsFocus', false);
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
      background-color #7daa74
      left 0
      bottom 12vh
      z-index 999
      display flex
      align-items center
      justify-content center
      cursor pointer
  .pad10
    padding .8vh .8vw
  .showingArea
    padding-top 0
    width 37.5vw
    overflow auto
    transition .2s ease
  .editingArea.recover
    .toggle
      background-color #7e7
</style>

<style lang="stylus">
  .CodeMirror
    max-width 38vw
    min-width 38vw
    height auto
    padding .8vh .8vw
    transition .2s ease
    .CodeMirror-sizer
      max-width 41vw
      min-width 41vw
</style>
