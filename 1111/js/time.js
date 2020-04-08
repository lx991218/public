;window.onload = function() {
				let clock = document.querySelector("#clock");
				//判断有没有这个绘制环境，有的话拿到画笔
				if (clock.getContext) {
					let ctx = clock.getContext('2d');
					setInterval(function(){
						ctx.clearRect(0,0,clock.width,clock.height)
						move();
					},1000)
					move();
					function move(){
						ctx.save()
						//初始化样式
						ctx.lineWidth = 8
						ctx.strokeStyle = 'black'
						ctx.lineCap = 'round'
						//变换起始点
						ctx.translate(200, 200)
						//将坐标轴转换 方便钟顺时针走
						ctx.rotate(-90 * Math.PI / 180)
						ctx.beginPath() //变换的最好放这个上面
						
						//外层空心圆盘
						ctx.save()
						ctx.strokeStyle = '#325fa2'
						ctx.lineWidth = 14
						ctx.beginPath()
						//画圆  圆心，半径 , 起始点，终止点
						ctx.arc(0, 0, 140, 0, 360 * Math.PI / 180)
						ctx.stroke()
						ctx.restore()
						
						
						//时钟刻度
						ctx.save()
						for (let i = 0; i < 12; i++) {
							ctx.rotate(30 * Math.PI / 180)
							ctx.beginPath()
							ctx.moveTo(100, 0)
							ctx.lineTo(120, 0)
							ctx.stroke()
						}
						ctx.restore()
						//分针刻度
						ctx.save()
						ctx.lineWidth = 4
						
						for (let i = 0; i < 60; i++) {
							if (i % 5 != 0) {
								ctx.beginPath()
								ctx.moveTo(117, 0)
								ctx.lineTo(120, 0)
								ctx.stroke()
							}
							ctx.rotate(6 * Math.PI / 180)
						}
						ctx.restore()
						
						//时针 分针 秒针 
						let date = new Date()
						let s = date.getSeconds()
						let m = date.getMinutes() + s / 60
						let h = date.getHours() + m / 60
						h = h > 12 ? h - 12 : h,
						
						//时针
						ctx.save()
						ctx.lineWidth = 14
						ctx.rotate(h*30*Math.PI/180)
						ctx.beginPath()
						ctx.moveTo(-20,0)
						ctx.lineTo(80,0)
						ctx.stroke()
						ctx.restore()
						
						//分针
						ctx.save()
						ctx.lineWidth = 10
						ctx.rotate(m*6*Math.PI/180)
						ctx.beginPath()
						ctx.moveTo(-28,0)
						ctx.lineTo(112,0)
						ctx.stroke()
						ctx.restore()
						
						//秒针
						ctx.save()
						ctx.lineWidth = 6
						ctx.strokeStyle = '#d40000'
						ctx.fillStyle = '#d40000'
						ctx.rotate(s*6*Math.PI/180)
						ctx.beginPath()
						ctx.moveTo(-30,0)
						ctx.lineTo(83,0)
						ctx.stroke()
							//表座
							ctx.beginPath()
							ctx.arc(0,0,10,0,360*Math.PI/180)
							ctx.fill()
							//秒头
							ctx.beginPath()
							ctx.arc(96,0,10,0,360*Math.PI/180)
							ctx.stroke()
						ctx.restore()
						
						ctx.restore()
					}
				}
			}