var flowlist = getElementByAttr("flowlist", "flow-index", 1);
// var a = document.getElementsByClassName("flow-banner-btn");
var a = getElementsByAttr("flow-banner-btn", "flow-index", 1);

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

// test
// var dot = document.getElementById("flow-dots");
var dot = getElementByAttr("flow-dots", "flow-index", 1);
dot.style.margin = "0 0 0 -27px";


// 点点点
// var dots = document.getElementsByClassName("flow-dot");
var dots = getElementsByAttr("flow-dot", "flow-index", 1);
var offset = 0;
// var prev = document.getElementsByClassName("flow-btn-prev")[0];
var prev = getElementByAttr("flow-btn-prev", "flow-index", 1);

// var next = document.getElementsByClassName("flow-btn-next")[0]
var next = getElementByAttr("flow-btn-next", "flow-index", 1);
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
	flowlist.style.left = (-index * 100) + "%";
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
	flowlist.style.left = (-index * 100) + "%";
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
}