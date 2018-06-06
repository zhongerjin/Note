<template>
  <div class="big_box">
    <div class="box-left">
      <button class="addNode" @click="addNote">addNote</button>
      <div class="nodelist">
        <div class="node" v-for="(value, index) in sbdl" @click="changeNode(index)">
          <span>{{value.title.trim().substring(0,15)}}</span>
          {{value.text.trim().substring(0,15)}}
        </div>
      </div>
    </div>
    <div class="input-exia" ref="interesting">
      <input type="text" v-model="sbdl[nowActiveNote]['title']" ref="focus_input" @keyup.enter="changeFocus">
      <!--<textarea v-model="sbdl[nowActiveNote]['text']" ref="focus_textarea" @input="(isFocus = false)"></textarea>-->
      <Codes v-model="sbdl[nowActiveNote]['text']" :isFocus="isFocus" />
      <!--<codemirror v-model="sbdl[nowActiveNote]['text']" @input="(isFocus = false)"></codemirror>-->
    </div>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/mode/javascript/javascript'
  import Codes from './Code'
  import { codemirror } from 'vue-codemirror'

  export default {
    name: "best",
    data() {
      return {
        nowActiveNote: 0,
        sbdl: [],
        isFocus: false,
      }
    },
    components: {
      Codes,
      codemirror
    },
    methods: {
      addNote() {
        let new_note = {
          title: '无标题文档',
          text: 'asd'
        };
        this.sbdl.push(new_note);
        this.nowActiveNote = this.sbdl.length - 1;
        // this.isFocus = true;
        // this.$refs.focus_input.focus();
      },
      changeNode(key) {
        console.log(key);
        this.nowActiveNote = key;
      },
      changeFocus() {
        // console.log('asd');
        this.isFocus = true;
        // this.isFocus = false;
        // this.$refs.focus_textarea.focus();
      }
    },
    computed: {},
    created() {
      this.sbdl = this.$store.state.notefile.sbdl || this.sbdl;
      this.FuckingNote = this.sbdl[0] || {};
      Object.keys(this.FuckingNote).length === 0 ? this.addNote() : null;
    },
    mounted() {
      // console.log(this.$refs.interesting);
      // var myCodeMirror = CodeMirror.fromTextArea(this.$refs.focus_textarea);
      // console.log(myCodeMirror);
      // console.log('mounted');
    },
    destroyed() {
      this.$store.dispatch('saveNotes', this.sbdl);
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el, {value}) {
          console.log(value);
          if (value) {
            el.focus()
          }
        },
        update(el, {value}) {
          console.log(value);
          if (value) {
            el.focus()
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  ::-webkit-scrollbar
    height: 8px;
    width: 8px;
    background: transparent;
    border-radius: 4px
    visibility hidden

  ::-webkit-scrollbar
    height: 8px;
    width: 8px;
    background: transparent;
    border-radius: 4px

  ::-webkit-scrollbar-button
    display: none

  ::-webkit-scrollbar-track
    background-color: transparent

  ::-webkit-scrollbar-track-piece
    background: transparent

  ::-webkit-scrollbar-thumb
    width: 8px;
    min-height: 15px;
    background: #64e9ad;
    border-radius: 4px

  ::-webkit-scrollbar-thumb:hover
    background: #2b5f47

  ::-webkit-scrollbar-thumb:active
    background: #2b5f47

  .big_box
    display flex
    .box-left
      width 20vw
      border 1px solid #42b983
      .addNode
        border none
        width inherit
        color #fff
        font-weight bold
        outline none
        padding 0
        height 8vh
        background-color #49eca2
      .nodelist
        height 88.8vh
        overflow-y auto
        .node
          display flex
          align-items center
          flex-direction column
          color #fff
          background-color #42b983
          border 1px solid #0003

  .input-exia
    display flex
    flex-direction column
    align-items center
    flex 1
    height 97vh
    input
      border 1px solid #42b983
      border-bottom none
      width 100%
      height 7.7vh
    textarea
      width 100%
      resize none
      flex 1
      padding 0
      border 1px solid #42b983

</style>

<style>
  @import '../../node_modules/codemirror/lib/codemirror.css';
</style>
