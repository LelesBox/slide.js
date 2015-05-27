

// dom加载事件，来源http://www.cnblogs.com/rubylouvre/archive/2009/12/30/1635645.html
new function() {
	dom = [];
	dom.isReady = false;
	dom.isFunction = function(obj) {
		return Object.prototype.toString.call(obj) === "[object Function]";
	}
	dom.Ready = function(fn) {
		dom.initReady(); //如果没有建成DOM树，则走第二步，存储起来一起杀
		if (dom.isFunction(fn)) {
			if (dom.isReady) {
				fn(); //如果已经建成DOM，则来一个杀一个
			} else {
				dom.push(fn); //存储加载事件
			}
		}
	}
	dom.fireReady = function() {
		if (dom.isReady) return;
		dom.isReady = true;
		for (var i = 0, n = dom.length; i < n; i++) {
			var fn = dom[i];
			fn();
		}
		dom.length = 0; //清空事件
	}
	dom.initReady = function() {
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", function() {
				document.removeEventListener("DOMContentLoaded", arguments.callee, false); //清除加载函数
				dom.fireReady();
			}, false);
		} else {
			if (document.getElementById) {
				document.write("<script id=\"ie-domReady\" defer='defer'src=\"//:\"><\/script>");
				document.getElementById("ie-domReady").onreadystatechange = function() {
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
var obj = [{
	href: "www.baidu.com",
	src: "http://ww4.sinaimg.cn/bmiddle/663aa05ajw1esi2l21dhvj20q90b4wg2.jpg"
}, {
	href: "www.qq.com",
	src: "http://ww3.sinaimg.cn/bmiddle/d9e473cfjw1esge8i8x0tj20sg0lc75x.jpg"
}, {
	href: "www.163.com",
	src: "http://ww3.sinaimg.cn/bmiddle/005AWTo8gw1eq9yc8chx6g30dw0dw7wh.gif"
}]
dom.Ready(function() {
	createDOM("test", obj, 5, 2);
});
// 创建dom,height:高,width:宽,number:图片数量，orient:方向,interval:滚动间隔,index 第几个flow
function createDOM(id, obj, interval, index) {
	var count = obj.length;
	// 获取容器dom
	var container = document.getElementById(id);

	var containerHeight = container.clientHeight;
	var containerWidth = container.clientWidth;
	// 检测容器是否由高和宽，否则抛错
	if (!(containerHeight && containerWidth)) {
		throw new Error("container should be with explicit height and width (父容器需要明确的高和宽)");
	}

	container.innerHTML = "<div class='flow'>" + "<a class='flow-banner-btn flow-btn-prev' flow-index='" + index + "'>" + "<i></i>" + "</a>" + "<a class='flow-banner-btn flow-btn-next' flow-index='" + index + "'>" + "<i></i>" + "</a>" + "<ul class='flowlist' flow-index='" + index + "'>" + addimg(index, obj) + "</ul>" + "<ul class='flow-dots' flow-index='" + index + "'>" + repeat("<li class='flow-dot' flow-index='" + index + "'></li>", count) + "</ul>" + "</div>"

	var flowlist = getElementByAttr("flowlist", "flow-index", index);

	flowlist.style.width = count * 100 + "%";

	// 设置图片大小
	var imglist = getElementsByAttr("flow-img", "flow-index", index);
	each(imglist, function(item) {
		item.setAttribute("style", "height:" + containerHeight + "px;width:" + containerWidth + "px");
	})

	// 注册左右a标签onmouseover和onmouseout事件，用于辅助判断是否真正离开区域
	var a = getElementsByAttr("flow-banner-btn", "flow-index", index);
	var outbtn = true;
	each(a, function(item, index, arr) {
		item.onmouseover = function() {
			outbtn = false;
			if (outli) {
				each(a, function(item, index, arr) {
					item.style.opacity = "0.3";
				})
			}
		}
		item.onmouseout = function() {
			outbtn = true;
		}
	});
	var outli = true;
	flowlist.onmouseover = function() {
		outli = false;
		each(a, function(item, index, arr) {
			item.style.opacity = "0.3";
		});
	}
	flowlist.onmouseout = function() {
		outli = true;
		if (outbtn)
			each(a, function(item, index, arr) {
				item.style.opacity = "0";
			})
	}

	var dot = getElementByAttr("flow-dots", "flow-index", index);
	// 点点点居中偏移
	var left = -(18 * count) / 2;
	dot.style.margin = "0 0 0 " + left + "px";

	var dots = getElementsByAttr("flow-dot", "flow-index", index);
	var offset = 0;
	// 点击点点点可以跳转到指定位置
	each(dots, function(item, idx) {
		item.onclick = function() {
			flowlist.style.left = (-idx * 100) + "%";
			offset = -idx;
			each(dots, function(item, index) {
				if (index == idx) {
					item.style.background = "white";
				} else {
					item.style.background = "gray";
				}
			});
		}
	});

	var prev = getElementByAttr("flow-btn-prev", "flow-index", index);
	var next = getElementByAttr("flow-btn-next", "flow-index", index);

	next.onclick = function() {
		offset--;
		var index = Math.abs(offset % count);
		each(dots, function(item, idx) {
			if (index == idx) {
				item.style.background = "white";
			} else {
				item.style.background = "gray";
			}
		})
		flowlist.style.left = (-index * 100) + "%";
	}
	prev.onclick = function() {
		offset++;
		var index = Math.abs(offset % count);
		each(dots, function(item, idx) {
			if (index == idx) {
				item.style.background = "white";
			} else {
				item.style.background = "gray";
			}
		})
		flowlist.style.left = (-index * 100) + "%";
	}

	// 自动滚动
	setInterval(function() {
		next.click();
	}, interval * 1000);
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

// 添加图片到li str字符串,index:flow-index,obj:数组对象，对象包含点击跳转链接和图片链接
function addimg(index, obj) {
	var strli = "";
	for (var i = 0; i < obj.length; i++) {
		strli += "<li class='flowlist-card'><img class='flow-img' href='" + obj[i].href + "' src='" + obj[i].src + "' flow-index='" + index + "'></img></li>";
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
	var regx = /.*?flow.js$/;
	var regxmin = /.*?flow.min.js$/;
	each(script, function(item) {
		var path = item.getAttribute("src");
		if (regx.test(path)) {
			var prefix = path.substr(0, path.indexOf("flow.js"));
			loadCss(prefix + "flow.css");
			return;
		} else if (regxmin.test(path)) {
			var prefix = path.substr(0, path.indexOf("flow.min.js"));
			loadCss(prefix + "flow.min.css");
			return;
		}
	})
}

// 引用css样式
function loadCss(filename) {
	var css = document.createElement("link");
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", filename);
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(css);
}