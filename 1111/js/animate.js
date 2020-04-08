function animate(obj, target, callback) {
	// 先清除之前的定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {

		var step = (target - obj.offsetLeft) / 15;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (obj.offsetLeft == target) {
			// 停止定时器 停止动画
			clearInterval(obj.timer);
			callback && callback();
		}
		obj.style.left = obj.offsetLeft + step + 'px';
	}, 15)
}
