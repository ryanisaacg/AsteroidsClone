
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


var Rectangle = function(x,  y,  width,  height){this.x=x
this. y= y
this. width= width
this. height= height
}

function translateRect(rect, vector) {

	return new Rectangle(rect.x + vector.x, rect.y + vector.y, rect.width, rect.height)

}
function getType(x) {
	if(typeof x == 'number') {
		if(x % 1 == 0) {
			return 'int'
		}
		else {
			return 'float'
		}
	}
	if(typeof x == 'string') {
		return 'string'
	}
	if(typeof x == 'object') {
		return 'object'
	}
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

var WIDTH = 960, HEIGHT = 540

var Ship = function(rect,  vector,  rotation){this.rect=rect
this. vector= vector
this. rotation= rotation
}

g = getGraphics("canvas")



player = new Ship(new Rectangle(WIDTH / 2, 0, 32, 32), new Vector(0, 0), 0)




function drawShip(graphics, ship) {

	graphics.translate(ship.rect.x, ship.rect.y)

	graphics.rotate(ship.rotation * Math.PI / 180)

	var width, height;

	width = ship.rect.width

	height = ship.rect.height

	graphics.fillRect(-width / 2, -height / 2, width, height)

	graphics.rotate(-ship.rotation * Math.PI / 180)

	graphics.translate(-ship.rect.x, -ship.rect.y)

}




function step() {

	if(Keyboard["37"])

		player.rotation -= 4

	if(Keyboard["39"])

		player.rotation += 4

	if(Keyboard["38"]) {

		player.vector = addVector(player.vector, angleToVector(player.rotation, 0.1))

		console.log(player)

	}

	v = addVector(player.rect, player.vector)

	player.rect.x = v.x

	player.rect.y = v.y

	

	g.clearRect(0, 0, 960, 540)

	g.fillStyle = "#FFFFFF"

	drawShip(g, player)

}

function main() {

	setInterval(step, 1000 / 60)

}

main()
