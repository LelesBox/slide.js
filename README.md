#slide.js

#TODO
1. 需要一个富容器，最好是div(因为只测试了div)，要有明确的长宽，哪怕是百分比也行
2. (update)添加了无缝滚动功能,由于为了完成无缝滚动功能所以动画使用js来实现,我还不知道如何使用css实现.当然不使用无缝滚动时调用的是css滚动动画

#方法
>该js文件只暴露两个方法

###slide.dom.Ready
dom加载完成后执行方法，例如：
```
slide.dom.Ready(function(){
   console.log('domReady');
})
```

###slide.createSlide(obj)
```
obj={
id:"父元素id(必选),
params:"图片参数,具体属性看下面params(必选)",
isNewtag:"点击图片打开连接是否新窗口打开,默认false当前窗口打开(非必选)",
interval:"图片滚动间,默认为3s(非必选)",
infinite:"是否无缝滚动,默认false,不是无缝滚动",
ready:"是否前置添加,默认false(非必选),在动态生成的dom结构中使用"
}
params={
href:"点击图片打开的连接(非必选)",
src:"图片链接(必选)"
}
```

###例子
打开index.html即可
