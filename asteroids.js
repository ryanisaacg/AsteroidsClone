


function random(limit) {

	return Math.random() * limit

}



function getSign(number) {

	return Math.abs((number) / number)

}



function limit(number, absLimit) {

	if(Math.abs(number) > absLimit)

		number = getSign(number) * absLimit

	return number

}



function print(obj) {

	console.log(obj)

}
function getGraphics(canvasName) {
	c = document.getElementById(canvasName)
	graphics = c.getContext("2d")
	return graphics;
}
function getImage(path) {
	var img = new Image()
	img.src = path
	return img
}
var Keyboard = {
	left : false,
	right : false,
	up : false, 
	set : function(keyCode, value) {
		this[keyCode.toString()] = value
	}
}
document.addEventListener('keydown', function(event) { Keyboard.set(event.keyCode, true) })
document.addEventListener('keyup', function(event) { Keyboard.set(event.keyCode, false) })
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};
Math.toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};

var Vector = function(x,  y){this.x=x
this. y= y
}



function angleToVector(direction, magnitude) {

	var v = new Vector(0, 0)

	v.x = Math.cos(Math.toRadians(direction)) * magnitude

	v.y = Math.sin(Math.toRadians(direction)) * magnitude

	return v

}



function addVector(v1, v2) {

	return new Vector(v1.x + v2.x, v1.y + v2.y)

}



function wrap(vector, width, height) {

	var v = new Vector(vector.x, vector.y)

	if(v.x > width + 16)

		v.x = v.x - width

	if(v.x < -16)

		v.x = width + v.x

	if(v.y > height + 16)

		v.y = v.y - height

	if(v.y < -16)

		v.y = height + v.y

	return v

}



function limit(vector, amt) {

	v = new Vector(vector.x, vector.y)

	if(v.x > amt)

		v.x = amt

	if(v.x < -amt)

		v.x = -amt

	if(v.y > amt)

		v.y = amt

	if(v.y < -amt)

		v.y = -amt

	return v

}



function inArea(point, area, width, height) {

	return (point.x >= area.x && point.y >= area.y) &&

		(point.x <= area.x + width && point.y <= area.y + height)

}


var Entity = function(pos,  vector,  rotation,  img){this.pos=pos
this. vector= vector
this. rotation= rotation
this. img= img
}

g = getGraphics("canvas")


var shipTex, flareTex;

shipTex = getImage("images\\ship.png")

flareTex = getImage("images\\flare.png")

asteroidTex = getImage("images\\asteroids.png")


player = new Entity(new Vector(0, 0), new Vector(0, 0), 0, shipTex)

player.delay = 0

asteroids = []

for(var i = 0; i < 3; i++) {

	asteroids.push(new Entity(new Vector(random(960), random(540)), new Vector(random(2) - 1, random(2) - 1),0,asteroidTex))

}

bullets = []



function drawEntity(graphics, entity) {

	graphics.translate(entity.pos.x, entity.pos.y)

	graphics.rotate(entity.rotation * Math.PI / 180)

	graphics.drawImage(entity.img, -entity.img.width / 2, -entity.img.height / 2)

	graphics.rotate(-entity.rotation * Math.PI / 180)

	graphics.translate(-entity.pos.x, -entity.pos.y)

}



function step() {

	
	var WIDTH = 960, HEIGHT = 540

	var accel = false

	if(player.delay > 0)

		player.delay -= 1

	if(Keyboard["37"])

		player.rotation -= 4

	if(Keyboard["39"])

		player.rotation += 4

	if(accel = Keyboard["38"]) 

		player.vector = addVector(player.vector, angleToVector(player.rotation, 0.1))

	if(Keyboard["32"] && player.delay <= 0) {

		bullets.push(new Entity(player.pos, angleToVector(player.rotation, 5), 0, null))

		player.delay = 20

	}

	player.pos = wrap(addVector(player.pos, player.vector), WIDTH, HEIGHT)

	player.vector = limit(player.vector, 5)

	for(var i = 0; i < bullets.length; i++) {

		bullets[i].pos = wrap(addVector(bullets[i].pos, bullets[i].vector, WIDTH, HEIGHT))

		if(bullets[i].pos.x < 0 || bullets[i].pos.x > WIDTH || bullets[i].pos.y < 0 || bullets[i].pos.y > HEIGHT) {

			delete bullets[i]

			bullets.splice(i, 1)

		}

	}

	for(var j = 0; j < asteroids.length; j++) {

		asteroids[j].pos = wrap(addVector(asteroids[j].pos, asteroids[j].vector), WIDTH, HEIGHT)

		for(var i = 0; i < bullets.length; i++) {

			var aWidth = asteroids[j].img.width, aHeight = asteroids[j].img.height;

			var aPos = new Vector(asteroids[j].pos.x - aWidth / 2, asteroids[j].pos.y - aHeight / 2)

			if(inArea(bullets[i].pos, aPos, aWidth, aHeight)) {

				delete asteroids[j]

				delete bullets[i]

				asteroids.splice(j, 1)

				bullets.splice(i, 1)

			}

			delete aWidth

			delete aHeight

			delete aPos

		}

	}

	

	
	g.clearRect(0, 0, 970, 560)

	player.img = shipTex

	drawEntity(g, player)

	if(accel){

		player.img = flareTex

		drawEntity(g, player)

	}

	for(var i = 0; i < asteroids.length; i++)

		drawEntity(g, asteroids[i])

	g.fillStyle = "#FFFFFF"

	for(var i = 0; i < bullets.length; i++) 

		g.fillRect(bullets[i].pos.x - 1, bullets[i].pos.y - 1, 2, 2)

}

setInterval(step, 1000 / 60)
