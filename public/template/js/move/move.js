function move(ele,json,callback){
	clearInterval(ele.timer);
	ele.timer = setInterval(() => {
		var onOff = true;
		for(var attr in json){
			// 1.因为透明属性值的不同及属性的设置的不同，需要单独获取当前值
			var iNow = attr=="opacity" ? getStyle(ele,attr)*100 : parseInt(getStyle(ele,attr))
		   //console.log(attr)

			var speed = (json[attr] - iNow)/8;
			speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);
			
			if(json[attr] != iNow) onOff = false;

			if(attr == "opacity"){
				// 2.和单独设置透明属性
				ele.style[attr] = (iNow + speed)/100;
				ele.style.filter = "alpha(opacity="+ (iNow+speed) +")";
			}else{
				ele.style[attr] = iNow + speed + "px";
			}
		}
		if(onOff){
			clearInterval(ele.timer);
			if(callback) callback();
		}
	}, 30);
}

function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return getComputedStyle(ele,false)[attr];
	}
}


//---------------------------------------------------------------------------------------------------
//阻止冒泡事件的兼容
function stopBublle(e){
	if(e.stopPropagation){
		e.stopPropagation()
	}else{
		e.cancelBubble = true
	}
}

//阻止默认事件的兼容

function stopDefault(e){
	if(e.preventDefault){
		e.preventDefault()
	}else{
		e.returnValue=false
	}
}

//事件监听的兼容

// if(obj.addEventListener){
// 	obj.addEventListener('click', function(){
// 		console.log(1)
// 	}, false)
// }else{
// 	obj.attachEvent('on' + click, function(){
// 		console.log(1)
// 	})
// }



















