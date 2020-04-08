window.addEventListener('load', function() {
	var preview_img = document.querySelector('.preview_img');
	var mask = document.querySelector('.mask');
	var big = document.querySelector('.big');
	preview_img.addEventListener('mouseover', function() {
		mask.style.display = 'block';
		big.style.display = 'block';
	});
	preview_img.addEventListener('mouseout', function() {
		mask.style.display = 'none';
		big.style.display = 'none';
	});
	preview_img.addEventListener('mousemove', function(e) {
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var maskXMax = preview_img.offsetWidth - mask.offsetWidth;
		var maskYMax = preview_img.offsetHeight - mask.offsetHeight;
		maskX = x - mask.offsetWidth / 2;
		maskY = y - mask.offsetHeight / 2;
		if (maskX <= 0) {
			maskX = 0;
		} else if (maskX >= maskXMax) {
			maskX = maskXMax;
		}
		if (maskY <= 0) {
			maskY = 0;
		} else if (maskY >= maskYMax) {
			maskY = maskYMax;
		}
		mask.style.left = maskX + 'px';
		mask.style.top = maskY + 'px';
		var bigImg = document.querySelector('.bigImg');
		var bigXMax = bigImg.offsetWidth - big.offsetWidth;
		var bigYMax = bigImg.offsetHeight - big.offsetHeight;
		var bigX = maskX * bigXMax / maskXMax;
		var bigY = maskY * bigYMax / maskYMax;
		bigImg.style.left = -bigX+'px';
		bigImg.style.top = -bigY+'px';
	});
})
