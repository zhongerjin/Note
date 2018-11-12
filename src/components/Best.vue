<template>
  <div class="big_box" :class="(recover ? 'rec' : '')">
    <div class="box-left">
      <button class="addNode" @click="newNote">addNote</button>
      <div class="nodelist">
        <div class="node" v-for="(value, index, key) in noteGroup" @click="changeNode(index)"
        :class="(value.isActive ? 'active': '')" :key = key>
          <div class="node-title">
            <div class="node-name">{{value.title.trim().substring(0,15)}}</div>
            <span class="node-icon node-delete" @click.stop="deleteNode(index)"></span>
            <!-- <span class="node-icon node-save" @click.stop="saveNode(index)"></span> -->
          </div>
          <div class="node-text">
            <span>{{value.text.trim().substring(0,15)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="input-exia" ref="interesting">
      <input type="text" v-model="noteTitle" ref="focus_input"
             @keyup.enter="changeFocus" v-focus="isInputFocus" @blur="inputBlur">
      <Codes v-model="noteText" :isFocus="isFocusByCodes" @changeIsFocus="changeIsFocus" @changeInputFocus="changeInputFocus"
             :isRecover="recover" @changeRecover="changeRecover" :valueNumber="nowActiveNote"/>
    </div>
  </div>
</template>

<script>
  import Codes from './Code'
  import axios from 'axios'
  import uuid from 'uuid'
import { debug } from 'util';

  export default {
    name: "best",
    data() {
      return {
        nowActiveNote: 0,
        noteGroup: [],
        isInputFocus: false,
        isFocusByCodes: false,
        recover: false,
      }
    },
    components: {
      Codes
    },
    methods: {
      newNote(){
        let new_note = {
          nId: uuid(),
          title: '无标题文档',
          text: 'interesting',
          isActive: true
        }
        this.addNote(new_note);
      },
      addNote(new_note) {
        this.noteGroup.push(new_note);
        this.nowActiveNote = this.noteGroup.length - 1;
        this.changeNode(this.nowActiveNote);
        // axios.post('/create', {
        //   notes: new_note
        // })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      },
      changeNode(key) {
        console.log(key);
        this.nowActiveNote = key;
        this.noteGroup.forEach((obj) => obj['isActive'] = false);
        this.noteGroup[key]['isActive'] = true;
        this.isInputFocus = true;
        this.isFocusByCodes = false;
      },
      deleteNode(key){
        console.log(`delete:${key}`);
        this.noteGroup.splice(key, 1);
        if(this.noteGroup.length === 0){
          this.nowActiveNote = -1;
          return false;
        }
        if(this.noteGroup.length === key){
          // key -= 1;
          key = this.nowActiveNote - 1;
        }
        if(this.noteGroup.length - 1 === key && (this.nowActiveNote < key || this.nowActiveNote > key)){
          key = this.noteGroup.length - 1;
        }
        this.changeNode(key);
      },
      changeFocus() {
        this.isInputFocus = false;
        this.isFocusByCodes = true;
      },
      changeRecover(value){
        console.log(value);
        this.recover = value;
      },
      changeIsFocus(value){
        this.isFocusByCodes = value;
      },
      changeInputFocus(value){
        this.isInputFocus = value;
      },
      inputBlur(){
        this.isInputFocus = false;
        // this.saveNode(this.nowActiveNote);
      },
      saveNode(key){
        // axios.post('/save', {
        //   notes: this.noteGroup[key]
        // })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      },
      saveNotes(){
        this.$store.dispatch('saveNotes', [this.noteGroup, this.nowActiveNote]);
        localStorage.setItem("note",JSON.stringify(this.$store.state))
      },
    },
    computed: {
      noteTitle:{
        get(){
          return (this.noteGroup.length === 0 ? '' : this.noteGroup[this.nowActiveNote]['title']);
        },
        set(value){
          if(this.noteGroup.length === 0){
            this.addNote({
              title: value,
              text: '',
              isActive: true
            })
          }
          this.noteGroup[this.nowActiveNote]['title'] = value;
        }
      },
      noteText:{
        get(){
          return (this.noteGroup.length === 0 ? '' : this.noteGroup[this.nowActiveNote]['text']);
        },
        set(value){
          if(this.noteGroup.length === 0){
            this.addNote({
              title: '',
              text: value,
              isActive: true
            })
          }
          this.noteGroup[this.nowActiveNote]['text'] = value;
        }
      }
    },
    created() {
      localStorage.getItem("note") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("note"))));
      this.noteGroup = this.$store.state.notefile.noteGroup || this.noteGroup;
      this.nowActiveNote = (this.$store.state.notefile.nowActiveNote > this.noteGroup.length - 1 ? this.noteGroup.length - 1 : this.$store.state.notefile.nowActiveNote)
        || this.nowActiveNote;
      this.noteGroup.length === 0 ? this.newNote() : null;
      this.changeNode(this.nowActiveNote);
      this.isInputFocus = true;
      window.addEventListener("beforeunload",()=>{
        this.saveNotes()
      });
    },
    mounted() {
    },
    destroyed() {
      this.saveNotes();
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
  $all-color = #42b983
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
      border 1px solid $all-color
      transition $tran-mins
      .addNode
        border none
        width inherit
        color #fff
        font-weight bold
        outline none
        padding 0
        height 8vh
        background-color #36dd92
      .nodelist
        height 88.8vh
        overflow-y auto
        .node
          display flex
          align-items center
          flex-direction column
          color #fff
          background-color $all-color
          border 1px solid #0003
          .node-title
            display flex
            width 15vw
            .node-name
              display inline-block
              flex 1
              white-space nowrap
              text-overflow ellipsis
              position relative
              overflow hidden
            .node-icon
              width 2vw
              height 3vh
              background-color springgreen
              display inline-block
              cursor pointer
              text-align center
              visibility collapse
            .node-icon.node-delete
              background url("../assets/delete.svg") center/100% 100% no-repeat
            .node-icon.node-save
              background url("../assets/save.svg") center/100% 100% no-repeat
          .node-text
            display flex
            padding-left 1vw
            width 16vw
        .node.active
          background-color #379369 !important
          .node-icon
            visibility visible
        .node
          &:hover
            background-color #3da978
            .node-icon
              visibility visible

  .big_box.rec
    .box-left
      width 0vw
      border-left 0
  .input-exia
    display flex
    flex-direction column
    flex 1
    height 97vh
    border 1px solid $all-color
    border-left none
    input
      border none
      border-bottom  1px solid $all-color
      height 7.7vh
      padding .8vh .8vw
      outline none
      transition .2s ease
    textarea
      width 100%
      resize none
      flex 1
      padding 0
      border 1px solid $all-color

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
