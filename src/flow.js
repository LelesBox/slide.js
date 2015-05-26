$(document).ready(function() {
	var flowlist = document.getElementById("flowlist");
	var a = document.getElementsByClassName("banner-btn");

	// 注册左右a标签onmouseover和onmouseout事件，用于辅助判断是否真正离开区域
	var out=true;
	each(a, function(item, index, arr) {
		item.onmouseover=function(){
			out=true;
		}
		item.onmouseout=function(){
			out=false;
		}
	});
	flowlist.onmouseover = function() {
		// 如果
		if()
		each(a, function(item, index, arr) {
			item.style.display = "inline-block";
		});
	}
	flowlist.onmouseout = function() {
		each(a, function(item, index, arr) {
			item.style.display = "none";
		});
	}
	var prev = document.getElementsByClassName("btn-prev")[0];
	var offset = 0;
	prev.onclick = function() {
		if (Math.abs(offset) < 200) {
			offset -= 100;
			flowlist.style.left = offset + "%";
		}
	}
	var next = document.getElementsByClassName("btn-next")[0]
	next.onclick = function() {
		if (Math.abs(offset) > 0) {
			offset += 100;
			flowlist.style.left = offset + "%";
		}
	}
})

// 创建dom,height:高,width:宽,number:图片数量，orient:方向,interval:滚动间隔
function createDom(height, width, number, orient, interval) {
	// 创建ul
	var flowul = document.createElement("ul");
	// var flexFlow
}

function each(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		callback(arr[i], i, arr);
	}
}