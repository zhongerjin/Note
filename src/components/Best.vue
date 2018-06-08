<template>
  <div class="big_box" :class="(recover ? 'rec' : '')">
    <div class="box-left">
      <button class="addNode" @click="addNote">addNote</button>
      <div class="nodelist">
        <div class="node" v-for="(value, index) in sbdl" @click="changeNode(index)"
        :class="(value.isActive ? 'active': '')">
          <span>{{value.title.trim().substring(0,15)}}</span>
          {{value.text.trim().substring(0,15)}}
        </div>
      </div>
    </div>
    <div class="input-exia" ref="interesting">
      <input type="text" v-model="sbdl[nowActiveNote]['title']" ref="focus_input" @keyup.enter="changeFocus" v-focus="isInputFocus">
      <!--<textarea v-model="sbdl[nowActiveNote]['text']" ref="focus_textarea" @input="(isFocus = false)"></textarea>-->
      <Codes v-model="sbdl[nowActiveNote]['text']" :isFocus="isFocus" @changeIsFocus="changeIsFocus"
             :isRecover="recover" @changeRecover="changeRecover"/>
    </div>
  </div>
</template>

<script>
  import Codes from './Code'

  export default {
    name: "best",
    data() {
      return {
        nowActiveNote: 0,
        sbdl: [],
        isInputFocus: false,
        isFocus: false,
        recover: false
      }
    },
    components: {
      Codes
    },
    methods: {
      addNote() {
        let new_note = {
          title: '无标题文档',
          text: 'asd',
          isActive: true,
        };
        this.sbdl.push(new_note);
        this.nowActiveNote = this.sbdl.length - 1;
        this.changeNode(this.nowActiveNote);
      },
      changeNode(key) {
        console.log(key);
        this.nowActiveNote = key;
        this.sbdl.forEach((obj) => obj['isActive'] = false);
        this.sbdl[key]['isActive'] = true;
        this.isInputFocus = true;
        this.isFocus = false;
      },
      changeFocus() {
        this.isInputFocus = false;
        this.isFocus = true;
      },
      changeRecover(value){
        console.log(value);
        this.recover = value;
      },
      changeIsFocus(value){
        this.isFocus = value;
      }
    },
    computed: {},
    created() {
      this.sbdl = this.$store.state.notefile.sbdl || this.sbdl;
      this.sbdl.length === 0 ? this.addNote() : null;
    },
    mounted() {
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
  $tran-mins = .2s ease
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
      transition $tran-mins
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
        .node.active
          background-color #379369
  .big_box.rec
    .box-left
      width 0vw
      border-left 0
  .input-exia
    display flex
    flex-direction column
    align-items center
    flex 1
    height 97vh
    border 1px solid #42b983
    border-left none
    input
      border none
      border-bottom  1px solid #42b983
      width 77vw
      height 7.7vh
      padding .8vh .8vw
      outline none
      transition .2s ease
    textarea
      width 100%
      resize none
      flex 1
      padding 0
      border 1px solid #42b983

</style>
<style lang="stylus">
  .big_box.rec
    input
      width 97vw
    .CodeMirror
      min-width 50vw
      max-width 50vw
    .showingArea
      width 45.7vw
</style>
