(function (global) {
    // dom加载事件，来源http://www.cnblogs.com/rubylouvre/archive/2009/12/30/1635645.html
    new function () {
        dom = [];
        dom.isReady = false;
        dom.isFunction = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Function]";
        }
        dom.Ready = function (fn) {
            dom.initReady(); //如果没有建成DOM树，则走第二步，存储起来一起杀
            if (dom.isFunction(fn)) {
                if (dom.isReady) {
                    fn(); //如果已经建成DOM，则来一个杀一个
                } else {
                    dom.push(fn); //存储加载事件
                }
            }
        }
        dom.fireReady = function () {
            if (dom.isReady) return;
            dom.isReady = true;
            for (var i = 0, n = dom.length; i < n; i++) {
                var fn = dom[i];
                fn();
            }
            dom.length = 0; //清空事件
        }
        dom.initReady = function () {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function () {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false); //清除加载函数
                    dom.fireReady();
                }, false);
            } else {
                if (document.getElementById) {
                    document.write("<script id=\"ie-domReady\" defer='defer'src=\"//:\"><\/script>");
                    document.getElementById("ie-domReady").onreadystatechange = function () {
                        if (this.readyState === "complete") {
                            dom.fireReady();
                            this.onreadystatechange = null;
                            this.parentNode.removeChild(this)
                        }
                    };
                }
            }
        }
    }
    // 加载样式
    addCss();

    // 提供两个方法，一个是domready，一个是slide();
    var slide = {};
    slide["dom"] = dom;
    slide["createSlide"] = newSlide;
    global.slide = slide;

    var slidecount = 1;

    function newSlide(obj) {
        // id, obj, interval, ready
        if (dom.isReady) {
            createDOM(obj.id, obj.params, obj.isNewtag || false, obj.interval || 3, obj.infinite || false, slidecount);
            slidecount++;
        } else if (obj.ready) {
            createDOM(obj.id, obj.params, obj.isNewtag || false, obj.interval || 3, obj.infinite || false, slidecount);
            slidecount++;
        } else {
            dom.Ready(function () {
                createDOM(obj.id, obj.params, obj.isNewtag || false, obj.interval || 3, obj.infinite || false, slidecount);
                slidecount++;
            });
        }
    }

    // 创建dom,height:高,width:宽,number:图片数量，orient:方向,
    // isNewTag:点击图片是否打开新页面
    // interval:滚动间隔,infinite:是否无缝滚动，index 第几个slide
    function createDOM(id, obj, isnewtag, interval, infinite, index) {
        var count = obj.length;
        // 获取容器dom
        var container = document.getElementById(id);

        var containerHeight = container.clientHeight;
        var containerWidth = container.clientWidth;
        // 检测容器是否由高和宽，否则抛错
        if (!(containerHeight && containerWidth)) {
            throw new Error("container of " + id + " should be with explicit height and width (父容器需要明确的高和宽)");
        }

        // 如果是无缝滚动
        if (infinite) {
            container.innerHTML = "<div class='slide'>" + "<a class='slide-banner-btn slide-btn-prev' slide-index='" + index + "'>" + "<i></i>" + "</a>" + "<a class='slide-banner-btn slide-btn-next' slide-index='" + index + "'>" + "<i></i>" + "</a>" + "<ul class='slidelist' slide-index='" + index + "'>" + addimg(index, obj, true) + "</ul>" + "<ul class='slide-dots' slide-index='" + index + "'>" + repeat("<li class='slide-dot' slide-index='" + index + "'></li>", count) + "</ul>" + "</div>"
            var slidelist = getElementByAttr("slidelist", "slide-index", index);
            slidelist.style.width = (count + 1) * 100 + "%";
            slidelist.style.left = "-100%";
            // 取消css动画，因为无缝滚动我还不知道如何使用css实现
            slidelist.style["-webkit-transition"] = "all 0 ease 0";
            slidelist.style["transition"] = "all 0 ease 0";
        } else {
            container.innerHTML = "<div class='slide'>" + "<a class='slide-banner-btn slide-btn-prev' slide-index='" + index + "'>" + "<i></i>" + "</a>" + "<a class='slide-banner-btn slide-btn-next' slide-index='" + index + "'>" + "<i></i>" + "</a>" + "<ul class='slidelist' slide-index='" + index + "'>" + addimg(index, obj) + "</ul>" + "<ul class='slide-dots' slide-index='" + index + "'>" + repeat("<li class='slide-dot' slide-index='" + index + "'></li>", count) + "</ul>" + "</div>"
            slidelist = getElementByAttr("slidelist", "slide-index", index);
            slidelist.style.width = count * 100 + "%";
        }

        // 设置图片大小
        var imglist = getElementsByAttr("slide-img", "slide-index", index);
        each(imglist, function (item, index) {
            item.setAttribute("style", "height:" + containerHeight + "px;width:" + containerWidth + "px");
        });

        // 点击图片打开新页面事件代理
        EventUtil.addHandler(slidelist, "click", function (event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            var imghref = target.getAttribute("href");
            if (!startWith(imghref, "http")) {
                imghref = "http://" + imghref;
            }
            if (isnewtag) {
                window.open(imghref);
            } else {
                window.open(imghref, "_self");
            }
        });

        // 注册左右a标签onmouseover和onmouseout事件，用于辅助判断是否真正离开区域
        var a = getElementsByAttr("slide-banner-btn", "slide-index", index);
        var outbtn = true;
        each(a, function (item, index, arr) {
            item.onmouseover = function () {
                outbtn = false;
                if (outli) {
                    each(a, function (item, index, arr) {
                        item.style.opacity = "0.7";
                    });
                }
            }
            item.onmouseout = function () {
                outbtn = true;
            }
        });
        var outli = true;
        slidelist.onmouseover = function () {
            outli = false;
            each(a, function (item, index, arr) {
                item.style.opacity = "0.3";
            });
        }
        slidelist.onmouseout = function () {
            outli = true;
            if (outbtn)
                each(a, function (item, index, arr) {
                    item.style.opacity = "0";
                });
        }

        var dot = getElementByAttr("slide-dots", "slide-index", index);
        // 点点点居中偏移
        var left = -(18 * count) / 2;
        dot.style.margin = "0 0 0 " + left + "px";

        var dots = getElementsByAttr("slide-dot", "slide-index", index);
        var offset = 0;
        // 点击点点点可以跳转到指定位置
        each(dots, function (item, idx) {
            item.onclick = function () {
                // 动画
                if (infinite) {
                    // 获取点击前的index
                    var oldval = getIndex(offset, count);
                    if (idx > oldval) {
                        offset = offset - roll(oldval, idx, slidelist, childlist);
                    } else if (idx < oldval) {
                        offset = offset - roll(oldval, idx + count, slidelist, childlist);
                    }
                } else {
                    slidelist.style.left = (-idx * 100) + "%";
                    offset = -idx;
                }
                each(dots, function (item, index) {
                    if (index == idx) {
                        item.style.background = "white";
                    } else {
                        item.style.background = "gray";
                    }
                });
            }
        });

        var prev = getElementByAttr("slide-btn-prev", "slide-index", index);
        var next = getElementByAttr("slide-btn-next", "slide-index", index);

        var slidedone = true;
        var childlist = infinite ? getChildElements(slidelist) : null;
        next.onclick = function () {
            if (infinite) {
                // 防止在滑动结束前多次点击
                if (slidedone) {
                    slidedone = false;
                    offset = offset - roll(0, 1, slidelist, childlist, function () {
                        slidedone = true;
                    });
                    var index = getIndex(offset, count);
                    each(dots, function (item, idx) {
                        if (index == idx) {
                            item.style.background = "white";
                        } else {
                            item.style.background = "gray";
                        }
                    });
                }
            } else {
                offset--;
                var index = Math.abs(offset % count);
                each(dots, function (item, idx) {
                    if (index == idx) {
                        item.style.background = "white";
                    } else {
                        item.style.background = "gray";
                    }
                })
                slidelist.style.left = (-index * 100) + "%";
            }
            // autoroll();
        }

        prev.onclick = function () {
            if (infinite) {
                if (slidedone) {
                    slidedone = false;
                    offset = offset - roll(1, 0, slidelist, childlist, function () {
                        slidedone = true;
                    });
                    var index = getIndex(offset, count);
                    each(dots, function (item, idx) {
                        if (index == idx) {
                            item.style.background = "white";
                        } else {
                            item.style.background = "gray";
                        }
                    });
                }
            } else {
                offset++;
                var index = Math.abs(offset % count);
                each(dots, function (item, idx) {
                    if (index == idx) {
                        item.style.background = "white";
                    } else {
                        item.style.background = "gray";
                    }
                });
                slidelist.style.left = (-index * 100) + "%";
            }
            // autoroll();
        }
        //        autoroll();
        // 自动滚动
        var cleartimer;

        function autoroll() {
            if (cleartimer)
                clearInterval(cleartimer);
            cleartimer = setInterval(function () {
                next.click();
                //    修正在一些情况下，div的宽高并不是最初的宽和高
                if (container.clientWidth != containerWidth) {
                    containerWidth = container.clientWidth;
                    slidelist.style.width = containerWidth * count + "px";
                    each(imglist, function (item) {
                        item.setAttribute("style", "height:" + containerHeight + "px;width:" + containerWidth + "px");
                    })
                }
            }, interval * 1000);
        }
    }

    // 遍历器
    function each(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            callback(arr[i], i, arr);
        }
    }

    // repeat create dom innerHTML style
    function repeat(str, count) {
        return (new Array(count + 1)).join(str);
    }

    // 添加图片到li str字符串,index:slide-index,obj:数组对象，对象包含点击跳转链接和图片链接
    function addimg(index, obj, infinite) {
        var strli = "";
        var length = obj.length;
        for (var i = 0; i < length; i++) {
            strli += "<li class='slidelist-card'><img class='slide-img' href='" + obj[i].href + "' src='" + obj[i].src + "' slide-index='" + index + "'></img></li>";
        }
        // 如果是无缝滚动，则需要在滚动列表首部添加obj的最后一个元素
        if (infinite) {
            strli = "<li class='slidelist-card'><img class='slide-img' href='" + obj[length - 1].href + "' src='" + obj[length - 1].src + "' slide-index='" + index + "'></img></li>" + strli;
        }
        return strli;
    }

    // 根据属性获取dom类数组的值
    function getElementByAttr(id, attr, target) {
        var dom = document.getElementsByClassName(id);
        for (var i = 0; i < dom.length; i++) {
            if (dom[i].getAttribute(attr) == target) {
                return dom[i];
            }
        }
        return null;
    }

    function getElementsByAttr(id, attr, target) {
        var dom = document.getElementsByClassName(id);
        var rtn = [];
        for (var i = 0; i < dom.length; i++) {
            if (dom[i].getAttribute(attr) == target) {
                rtn.push(dom[i]);
            }
        }
        if (rtn.length != 0) {
            return rtn;
        }
        return null;
    }

    // 根据js引入css样式，前提是css和js在同一个路径下，否则自己填写css路径
    function addCss() {
        var script = document.getElementsByTagName("script");
        var regx = /.*?slide.js$/;
        var regxmin = /.*?slide.min.js$/;
        each(script, function (item) {
            var path = item.getAttribute("src");
            if (regx.test(path)) {
                var prefix = path.substr(0, path.indexOf("slide.js"));
                loadCss(prefix + "slide.css");
                return;
            } else if (regxmin.test(path)) {
                var prefix = path.substr(0, path.indexOf("slide.min.js"));
                loadCss(prefix + "slide.min.css");
                return;
            }
        })
    }

    // 引用css样式as
    function loadCss(filename) {
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", filename);
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(css);
    }

    // startWith
    function startWith(target, str, ignorecase) {
        var start_str = target.substr(0, str.length);
        return ignorecase ? start_str.toLowerCase() === str.toLowerCase() :
            start_str === str;
    }

    // 事件系统,事件委托
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };
    
    // 滚动动画
    function roll(oldindex, newindex, elemt, childlist, callback) {
        var offset = newindex - oldindex;
        var absofs = Math.abs(offset);
        var infiOffset = 100;
        var tick = setInterval(function () {
            // 选择能整除的数
            infiOffset += ((100 * offset) / 20);
            if (infiOffset >= 100 * (absofs + 1) || infiOffset <= 0) {
                clearInterval(tick);
                if (offset > 0) {
                    for (var i = 0; i < absofs; i++) {
                        reSortli(elemt, childlist, "next");
                    }
                } else {
                    for (var i = 0; i < absofs; i++) {
                        reSortli(elemt, childlist, "prev");
                    }
                }
                elemt.style.left = "-100%";
                callback ? callback() : null;
            } else {
                elemt.style.left = -infiOffset + "%";
            }
        }, 10);
        return offset;
    }

    function getIndex(offset, count) {
        var index;
        if (offset >= 0) {
            index = count - (Math.abs(offset % count) || count);
        }
        else {
            index = Math.abs(offset % count);
        }
        return index;
    }

    //维护当前队列
    function reSortli(elemt, list, action) {
        if (action == "next") {
            elemt.removeChild(elemt.firstChild);
            var li = document.createElement("li");
            li.setAttribute("class", "slidelist-card");
            li.innerHTML = list[1].innerHTML;
            elemt.appendChild(li);
            list.push(list[1]);
            list.shift();
        } else if (action == "prev") {
            elemt.removeChild(elemt.lastChild);
            var li = document.createElement("li");
            li.setAttribute("class", "slidelist-card");
            li.innerHTML = list[list.length - 2].innerHTML;
            elemt.insertBefore(li, elemt.firstChild);
            list.unshift(list[list.length - 2]);
            list.pop();
        }
    }

    function getChildElements(elems) {
        var childs = elems.childNodes;
        var result = [];
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                result.push(childs[i]);
            }
        }
        return result;
    }
})(this)
// 支持amd加载
if (typeof define === "function" && define.amd) {
    define("slide", [], function () {
        return slide;
    });
}