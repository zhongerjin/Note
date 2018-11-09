# note

> A Vue.js project born in the library

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

--------------------

待解决问题
```
cm.on('change', cm => {
	this.$emit('input', cm.getValue());
})
```

~~会出现codemirror.js中drawSelectionCursor函数执行两次，导致光标会跳到文档最前面~~

其实根本就不是这儿出了问题。。。。。。
--------------------------
真正的是问题是因为
```
watch:{
  value(value, oldValue) {
      console.log(oldValue);
      if (value !== oldValue) {
        this.Editor.setValue(this.value);
      }
  }
}
```
原本这个函数的作用是作为切换笔记，更新编辑器内容的。
编辑器内容发生变化，就会传递'input'事件给父组件,
父组件修改了传入的value，就会触发监听器从而setValue()

setValue相当于删除当前文档并打开一个新文档。所以光标才会一直在文档开始处

所以只要稍加判断，判断是否更换了笔记，如果更换了笔记才用setValue()

```
watch: {
    valueNumber(value, oldValue){
      if(value !== oldValue){
        this.isChangNote = true;
      }
    },
    value(value, oldValue) {
      if (this.isChangNote) {
        this.isChangNote = false;
        this.Editor.setValue(this.value);
      }
    }
  }
```
参考issues:

<https://github.com/codemirror/CodeMirror/issues/3734>

------------------------------
[demo](https://zhongerjin.github.io/Note/dist/#/note)
