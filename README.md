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

会出现codemirror.js中drawSelectionCursor函数执行两次，导致光标会跳到文档最前面

------------------------------
[demo](https://zhongerjin.github.io/Note/dist)
