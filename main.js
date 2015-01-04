//Constants
var LEFT_BORDER, TOP_BORDER;
LEFT_BORDER = 480
TOP_BORDER = 360
//Load and initialize content
var shipTex = new Image(), back = new Image()
shipTex.src = "imges/ship.png"
var ship = Object.create(Entity)
ship.setTex(shipTex)
back.src = "images/background.png"
//Set up game logic
function start(){
	ship.position.x = 120
	ship.position.y = 120
}

//Update game state
function update() {
	//Handle key input
	if(Keyboard.left) {
		ship.rotation -= 4
	}
	if(Keyboard.right) {
		ship.rotation += 4
	}
	if(Keyboard.up) {
		var v = getVector(ship.rotation, 0.1)
		ship.accel = add(ship.accel, v)
	}
	ship.accel.x = limit(ship.accel.x, 10)
	ship.accel.y = limit(ship.accel.y, 10)		
	//Handle ship physics
	ship.position.x += ship.accel.x
	ship.position.y += ship.accel.y
}

//Draw all game objects
function draw(canvas) {
	var camera = new Vector(ship.position.x - LEFT_BORDER, ship.position.y - TOP_BORDER)
	//Draw background
	var bkgOffset = new Vector(camera.x % 64, camera.y % 64)
	for(var i = -64; i < LEFT_BORDER * 2 + 64; i += 64)
		for(var j = -64; j < TOP_BORDER * 2 + 64; j+= 64)
			canvas.drawImage(back, i - ~~bkgOffset.x, j - ~~bkgOffset.y)
	console.log(camera)
	ship.draw(canvas, camera)
}