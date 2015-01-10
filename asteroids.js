


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

	if(v.x > width)

		v.x = v.x - width

	if(v.x < 0)

		v.x = width + v.x

	if(v.y > height)

		v.y = v.y - height

	if(v.y < 0)

		v.y = height + v.y

	return v

}



var Rectangle = function(x,  y,  width,  height){this.x=x
this. y= y
this. width= width
this. height= height
}



function translateRect(rect, vector) {

	return new Rectangle(rect.x + vector.x, rect.y + vector.y, rect.width, rect.height)

}



var Entity = function(pos,  vector,  rotation,  img){this.pos=pos
this. vector= vector
this. rotation= rotation
this. img= img
}

g = getGraphics("canvas")



player = new Entity(new Vector(0, 0), new Vector(0, 0), 0, getImage("images\\ship.png"))




function drawEntity(graphics, entity) {

	graphics.translate(entity.pos.x, entity.pos.y)

	graphics.rotate(entity.rotation * Math.PI / 180)

	graphics.drawImage(entity.img, -entity.img.width / 2, -entity.img.height / 2)

	graphics.rotate(-entity.rotation * Math.PI / 180)

	graphics.translate(-entity.pos.x, -entity.pos.y)

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



function step() {

	var WIDTH = 960, HEIGHT = 540

	if(Keyboard["37"])

		player.rotation -= 4

	if(Keyboard["39"])

		player.rotation += 4

	if(Keyboard["38"]) 

		player.vector = addVector(player.vector, angleToVector(player.rotation, 0.1))

	player.pos = wrap(addVector(player.pos, player.vector), WIDTH, HEIGHT)

	player.vector = limit(player.vector, 5)

	

	g.clearRect(0, 0, 960, 540)

	g.fillStyle = "#FFFFFF"

	drawEntity(g, player)

}

function main() {

	setInterval(step, 1000 / 60)

}

main()
