#slide.js

该js不依赖任何类库
目前只支持IE8+,在IE9下没有动画效果

1. 需要一个富容器，最好是div(因为只测试了div)，要有明确的长宽，哪怕是百分比也行

#方法
>该js文件只暴露两个方法

###slide.dom.Ready
dom加载完成后执行方法，例如：
```
slide.dom.Ready(function(){
   console.log('domReady');
})
```

###slide.createSlide(elementID,object,[interval,isDomReady])
用于创建一个slide，其中参数：
'elementID' 表示父容器的id值；
'object'是数组参数，单个结构如下：
>href:跳转的连接，
src:图片链接，
isNewTag:是否在新窗口打开，不填默认false

'interval'表示滚动时间间隔，单位为s，不填默认为3
'isDomReady' 在动态加载的情形下，如使用requirejs加载网页，我们无法判断父容器是否ready，所以我们需要手动让它设为true，使他能强制执行。不填默认为false

###使用方法(引用)
如果选择min版本，需要保证slide.min.js和slide.min.css在同一个路径下，
同理，非min版本下。slide.js和slide.css需要在同一路径下

###例子
打开index.html即可
