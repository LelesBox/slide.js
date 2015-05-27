/*var slidelist = getElementByAttr("slidelist", "slide-index", 1);
// var a = document.getElementsByClassName("slide-banner-btn");
var a = getElementsByAttr("slide-banner-btn", "slide-index", 1);

// 注册左右a标签onmouseover和onmouseout事件，用于辅助判断是否真正离开区域
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
slidelist.onmouseover = function() {
	outli = false;
	each(a, function(item, index, arr) {
		item.style.opacity = "0.3";
	});
}
slidelist.onmouseout = function() {
	outli = true;
	if (outbtn)
		each(a, function(item, index, arr) {
			item.style.opacity = "0";
		})
}

// test
// var dot = document.getElementById("slide-dots");
var dot = getElementByAttr("slide-dots", "slide-index", 1);
dot.style.margin = "0 0 0 -27px";


// 点点点
// var dots = document.getElementsByClassName("slide-dot");
var dots = getElementsByAttr("slide-dot", "slide-index", 1);
var offset = 0;
// var prev = document.getElementsByClassName("slide-btn-prev")[0];
var prev = getElementByAttr("slide-btn-prev", "slide-index", 1);

// var next = document.getElementsByClassName("slide-btn-next")[0]
var next = getElementByAttr("slide-btn-next", "slide-index", 1);
next.onclick = function() {
	offset--;
	var index = Math.abs(offset % 3);
	each(dots, function(item, idx) {
		if (index == idx) {
			item.style.background = "gray";
		} else {
			item.style.background = "white";
		}
	})
	slidelist.style.left = (-index * 100) + "%";
}
prev.onclick = function() {
	offset++;
	var index = Math.abs(offset % 3);
	each(dots, function(item, idx) {
		if (index == idx) {
			item.style.background = "gray";
		} else {
			item.style.background = "white";
		}
	})
	slidelist.style.left = (-index * 100) + "%";
}

// 自动滚动
setInterval(function() {
	next.click();
}, 2 * 1000);

function each(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i], i, arr);
	}
}



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
}*/