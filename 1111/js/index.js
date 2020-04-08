;let Tools = {
	getRandom: function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}

;
window.addEventListener('load',function(){
	let position = 'absolute'
	let elements = []
	
	function Food(options = {}) {
		this.x = options.x || 0
		this.y = options.y || 0
	
		this.width = options.width || 20
		this.height = options.height || 20
	
		this.color = options.color || 'green'
	}
	//render 渲染
	Food.prototype.render = function(map) {
		//删除之前创建的食物
		remove();
		//随机生成x和y的值
		this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width
		this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height
		//动态创建div   页面上显示的食物
		let div = document.createElement('div')
		map.appendChild(div)
		elements.push(div)
		div.style.position = position
		div.style.left = this.x + 'px'
		div.style.top = this.y + 'px'
		div.style.width = this.width + 'px'
		div.style.height = this.height + 'px'
		div.style.backgroundColor = this.color
	}
	
	function remove() {
		for (var i = elements.length - 1; i >= 0; i--) {
			//删除页面中之前添加的div
			elements[i].parentNode.removeChild(elements[i])
			//删除elements中的元素
			elements.splice(i,1)
		}
	}
	window.Food = Food
})


;
window.addEventListener('load', function() {
	let position = 'absolute'
	let elements = []

	function Snake(options = {}) {
		//蛇的大小
		this.width = options.width || 20
		this.height = options.height || 20
		//蛇移动的方向
		this.direction = options.direction || 'right'
		//蛇的身体（蛇节）
		//蛇头
		//蛇身
		this.body = [{
				x: 3,
				y: 2,
				color: 'red'
			},
			{
				x: 2,
				y: 2,
				color: 'blue'
			},
			{
				x: 1,
				y: 2,
				color: 'blue'
			}
		]
	}
	Snake.prototype.render = function(map) {
		//删除之前的元素
		remove()
		//把每一个蛇节渲染到地图上
		for (let i = 0, len = this.body.length; i < len; i++) {
			let object = this.body[i]
			let div = document.createElement('div')
			map.appendChild(div)
			//记录当前蛇
			elements.push(div)
			div.style.position = position
			div.style.width = this.width + 'px'
			div.style.height = this.height + 'px'
			div.style.top = object.y * this.height + 'px'
			div.style.left = object.x * this.width + 'px'
			div.style.backgroundColor = object.color
		}
	}

	function remove() {
		for (let i = elements.length - 1; i >= 0; i--) {
			//删除div
			elements[i].parentNode.removeChild(elements[i])
			//删除数组中的元素
			elements.splice(i, 1)
		}
	}
	//控制蛇已移动的方法
	Snake.prototype.move = function(food,map) {
		//控制蛇的身体移动（当前蛇节 到上一个蛇节的位置）
		for (let i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x
			this.body[i].y = this.body[i - 1].y
		}
		//控制蛇头移动
		//判断蛇头移动的方向
		let head = this.body[0]
		switch (this.direction) {
			case 'right':
				head.x += 1;
				break;
			case 'top':
				head.y -= 1;
				break;
			case 'left':
				head.x -= 1;
				break;
			case 'bottom':
				head.y += 1;
				break;
		}
		//判断蛇头是否和食物的坐标符合
		let headX = head.x * this.width
		let headY = head.y * this.height
		if(headX === food.x && headY === food.y){
			//让蛇增加一节
			//获取蛇的最后一节
			let last = this.body[this.body.length-1]
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			})
			//在地图上再重新随机生成一个食物
			food.render(map)
		}

	}
	window.Snake = Snake
})


;
window.addEventListener('load', function() {
	let that;

	function Game(map = {}) {
		this.food = new Food()
		this.snake = new Snake()
		this.map = map
		that = this
	}
	Game.prototype.start = function() {
		//1.把蛇和食物对象，渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		// 2.开始游戏到逻辑
		//2.1让蛇移动起来
		//2.2当蛇遇到边界，游戏结束
		runSnake()
		//2.3通过键盘控制蛇移动的方向
		bindKey()
		//2.4当蛇遇到食物，做相应的处理

	}
	//通过键盘控制蛇的方向
	function bindKey() {
		document.addEventListener('keydown', function(e) {
			switch (e.keyCode) {
				case 37:
					this.snake.direction = 'left'
					break;
				case 38:
					this.snake.direction = 'top'
					break;
				case 39:
					this.snake.direction = 'right'
					break;
				case 40:
					this.snake.direction = 'bottom'
					break;
			}
		}.bind(that))
	}
	//让蛇移动
	function runSnake() {
		let timerId = setInterval(function() {
			//让蛇走一格 
			this.snake.move(this.food,this.map)
			this.snake.render(this.map)
			//2.2当蛇遇到边界，游戏结束(判断蛇是否遇到边界)
			//获取蛇头的坐标
			let maxX = this.map.offsetWidth / this.snake.width
			let maxY = this.map.offsetHeight / this.snake.height
			let headX = this.snake.body[0].x
			let headY = this.snake.body[0].y
			if (headX < 0 || headX >= maxX) {
				alert('game over')
				clearInterval(timerId)
			}
			if (headY < 0 || headY >= maxY) {
				alert('game over')
				clearInterval(timerId)
			}
		}.bind(that), 150)
	}
	let map = document.getElementById('map')
	let game = new Game(map)
	game.start()
})
