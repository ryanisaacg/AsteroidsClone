


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



function distance(p1, p2) {

	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

}




function intersect(p1, d1, p2, d2) {

	var x = inArea(p2, p1, d1.x, d1.y) ||

	inArea(addVector(new Vector(d2.x, 0), p2), p1, d1.x, d1.y) ||

	inArea(addVector(new Vector(0, d2.y), p2), p1, d1.x, d1.y) ||

	inArea(addVector(new Vector(d2.x, d2.y), p2), p1, d1.x, d1.y)

	return x

}




function direction(p1, p2) {

	return (360 + Math.toDegrees(Math.atan2((p1.y - p2.y), (p1.x - p2.x)))) % 360

}



function simplify(vector) {

	var newVector = new Vector(vector.x, vector.y)

	if(newVector.y > newVector.x && newVector.y != 0) {

		newVector.x /= newVector.y

		newVector.y = 1

	}

	else if(newVector.x > newVector.y && newVector.x != 0) {

		newVector.y /= newVector.x

		newVector.x = 1

	}

	return newVector

}


var Entity = function(pos,  vector,  rotation,  img){this.pos=pos
this. vector= vector
this. rotation= rotation
this. img= img
}

var prevTime

g = getGraphics("canvas")


var shipTex, flareTex;

shipTex = getImage("images\\ship.png")

flareTex = getImage("images\\flare.png")

asteroidTex = getImage("images\\asteroids.png")

asteroidMedTex = getImage("images\\asteroidsMedium.png")

ufoTex = getImage("images\\ufo.png")

shieldPowerup = getImage("images\\shield.png")


player = new Entity(new Vector(0, 0), new Vector(0, 0), 0, shipTex)

player.delay = 0

player.shielded = false

asteroids = []

powerups = []

for(var i = 0; i < 3; i++)

	asteroids.push(new Entity(new Vector(random(960), random(540)), new Vector(random(2) - 1, random(2) - 1),0,asteroidTex))

bullets = []

enemyBullets = []

enemy = undefined

var difficulty = 0, score = 0

function reset() {

	if(difficulty == 1) {

			score = 0

	}

	difficulty = 1

	player = new Entity(new Vector(0, 0), new Vector(0, 0), 0, shipTex)

	player.delay = 0

	player.shielded = false

	asteroids = []

	for(var i = 0; i < 3; i++)

		asteroids.push(new Entity(new Vector(random(960), random(540)), new Vector(random(2) - 1, random(2) - 1),0,asteroidTex))

	bullets = []

	do

		{

			enemy = new Entity(new Vector(random(WIDTH), random(HEIGHT)), new Vector(random(2) - 1, random(2) - 1), 0, ufoTex)

		}

		while(distance(player.pos, enemy.pos) < 128)

	enemyBullets = []

	enemy.delay = 40

	powerups = []

}



function drawEntity(graphics, entity) {

	graphics.translate(entity.pos.x, entity.pos.y)

	graphics.rotate(entity.rotation * Math.PI / 180)

	graphics.drawImage(entity.img, -entity.img.width / 2, -entity.img.height / 2)

	graphics.rotate(-entity.rotation * Math.PI / 180)

	graphics.translate(-entity.pos.x, -entity.pos.y)

}


function drawText(graphics, text, position) {

	g.fillStyle = "#FF0000"

	g.font="20px Georgia";

	g.fillText(text, position.x, position.y);

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

		var b = new Entity(player.pos, addVector(angleToVector(player.rotation, 7), player.vector), 0, null)

		b.life = 60

		bullets.push(b)

		player.delay = 20

	}

	
	player.pos = wrap(addVector(player.pos, player.vector), WIDTH, HEIGHT)

	player.vector = limit(player.vector, 5)


	for(var i = 0; i < bullets.length; i++) {

		bullets[i].pos = wrap(addVector(bullets[i].pos, bullets[i].vector), WIDTH, HEIGHT)

		bullets[i].life--

		if(!bullets[i].life) {

			bullets.splice(i, 1)

			continue

		}

		if(enemy) {

			var aWidth = enemy.img.width, aHeight = enemy.img.height;

			var aPos = new Vector(enemy.pos.x - aWidth / 2, enemy.pos.y - aHeight / 2)

			if(inArea(bullets[i].pos, aPos, aWidth, aHeight)) {

				enemy = undefined

				bullets.splice(i, 1)

			}

		}

	}

	for(var i = 0; i < enemyBullets.length; i++) {

		enemyBullets[i].pos = wrap(addVector(enemyBullets[i].pos, enemyBullets[i].vector), WIDTH, HEIGHT)

		enemyBullets[i].life--

		if(enemyBullets[i].life <= 0)

			enemyBullets.splice(i, 1)

		if(player) {

			var aWidth = player.img.width, aHeight = player.img.height;

			var aPos = new Vector(player.pos.x - aWidth / 2, player.pos.y - aHeight / 2)

			if(inArea(enemyBullets[i].pos, aPos, aWidth, aHeight)) {

				if(player.shielded) {

					player.shielded = false

					enemyBullets.splice(i, 1)

				}

				else {

					print("Dead.")

					reset()

					difficulty = 1

				}

			}

		}

	}

	for(var j = 0; j < asteroids.length; j++) {

		asteroids[j].pos = wrap(addVector(asteroids[j].pos, asteroids[j].vector), WIDTH, HEIGHT)

		var aWidth = asteroids[j].img.width, aHeight = asteroids[j].img.height;

		var aPos = new Vector(asteroids[j].pos.x - aWidth / 2, asteroids[j].pos.y - aHeight / 2)

		for(var i = 0; i < bullets.length; i++) {

			if(inArea(bullets[i].pos, aPos, aWidth, aHeight)) {

				var x = asteroids[j].img == asteroidTex

				var p = asteroids[j].pos

				asteroids.splice(j, 1)

				bullets.splice(i, 1)

				score += difficulty

				if(random(9 + difficulty) <= 3) {

					powerups.push(new Entity(aPos, null, 0, shieldPowerup))

				}

				if(x) {

					for(var n = 0; n < 2; n++)

						asteroids.push(new Entity(p, new Vector(random(2) - 1, random(2) - 1), 0, asteroidMedTex))

				}

				continue

			}

		}

		if(intersect(player.pos, new Vector(player.img.width, player.img.height), aPos, new Vector(aWidth, aHeight))) {

			if(player.shielded) {

				player.shielded = false

				asteroids.splice(j, 1)

			}

			else {

				print("Dead.")

				reset()

				difficulty = 1

			}

		}

	}

	for(var i = 0; i < powerups.length; i++) {

		if(intersect(powerups[i].pos, new Vector(powerups[i].img.width, powerups[i].img.height), player.pos, new Vector(player.img.width, player.img.height)))

			switch(powerups[i].img) {

				case shieldPowerup:

					player.shielded = true

					powerups.splice(i, 1)

					break

			}

	}

	if(!enemy) {

		score += difficulty

		difficulty += 1

		print("Kill confirmed!")

		do

		{

			enemy = new Entity(new Vector(random(WIDTH), random(HEIGHT)), new Vector(random(2) - 1, random(2) - 1), 0, ufoTex)

		}

		while(distance(player.pos, enemy.pos) < 128)

		enemy.delay = 40

	}

	enemy.rotation += 2

	enemy.pos = wrap(addVector(enemy.pos, enemy.vector), WIDTH, HEIGHT)

	enemy.delay -= 1

	if(enemy.delay <= 0) {

		var velocity = angleToVector(direction(player.pos, enemy.pos), difficulty)

		var eb = new Entity(enemy.pos, velocity, 0, null)

		eb.life = 80 + ((-1 / difficulty) + 60)

		enemyBullets.push(eb)

		enemy.delay = 120 - ((-1 / difficulty) + 60)

	}

	if(intersect(player.pos, new Vector(player.img.width, player.img.height), enemy.pos, new Vector(enemy.img.width, enemy.img.width))) {

		print("Dead.")

		reset()

	}

	

	
	g.clearRect(0, 0, 970, 560)

	player.img = shipTex

	drawEntity(g, player)

	if(accel){

		player.img = flareTex

		drawEntity(g, player)

	}

	g.strokeStyle = "#FF0000"

	if(player.shielded) {

		g.beginPath()

		g.arc(player.pos.x, player.pos.y, 20, 0, 2 * Math.PI, true)

		g.stroke()

	}

	for(var i = 0; i < asteroids.length; i++)

		drawEntity(g, asteroids[i])

	g.fillStyle = "#FFFFFF"

	for(var i = 0; i < bullets.length; i++) 

		g.fillRect(bullets[i].pos.x - 2, bullets[i].pos.y - 2, 4, 4)

	g.fillStyle = "#00FF00"

	for(var i = 0; i < enemyBullets.length; i++) 

		g.fillRect(enemyBullets[i].pos.x - 2, enemyBullets[i].pos.y - 2, 4, 4)


	for(var i = 0; i < powerups.length; i++)

		drawEntity(g, powerups[i])

	drawEntity(g, enemy)

	drawText(g, score.toString() , new Vector(32, 32))

	drawText(g, "x" + difficulty.toString() , new Vector(32, 64))

}

setInterval(step, 1000 / 60)
