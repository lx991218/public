;
window.onload = function() {
	window.onresize = function(event) {
		document.location.reload(true);
	}
	const canvas = document.querySelector('canvas')
	canvas.width = document.documentElement.clientWidth
	canvas.height = document.documentElement.clientHeight
	if (canvas.getContext) {
		let ctx = canvas.getContext('2d')
		let img = new Image()
		img.src = 'img/22.jpg'
		img.onload = function() {
			draw()
		}

		function draw() {
			let flag = 0
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
			canvas.addEventListener('touchstart', function(ev) {
				//兼容
				ev = ev || event
				//拿到手指第一根事件

				let touchC = ev.changedTouches[0]
				let x = touchC.clientX - canvas.offsetLeft
				let y = touchC.clientY - canvas.offsetTop
				ctx.globalCompositeOperation = 'destination-out'
				ctx.lineWidth = 30
				ctx.lineCap = 'round'
				ctx.lineJoin = 'round'
				ctx.save()

				ctx.beginPath()
				ctx.moveTo(x, y)
				ctx.lineTo(x + 1, y + 1)
				ctx.stroke()
				ctx.restore()
			})
			canvas.addEventListener('touchmove', function(ev) {
				//兼容
				ev = ev || event
				//拿到手指第一根事件
				let touchC = ev.changedTouches[0]
				let x = touchC.clientX - canvas.offsetLeft
				let y = touchC.clientY - canvas.offsetTop
				ctx.save()
				ctx.lineTo(x, y)
				ctx.stroke()
				ctx.restore()
			})
			canvas.addEventListener('touchend', function() {
				let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
				let allPx = imgData.width * imgData.height
				for (let i = 0; i < allPx; i++) {
					if (imgData.data[4 * i + 3] === 0) {
						flag++
					}
				}
				if (flag >= allPx / 2) {
					canvas.style.opacity = 0
				}
			})
			canvas.addEventListener('transitionend', function() {
				this.remove()
			})
		}
	}
}
