//Holds data for a 2D point
var Vector = function(x, y){
	this.x = x
	this.y = y
}
//Get a vector based on direction and magnitude
getVector = function(angle, magnitude){
	v = new Vector(0, 0)
	v.x = Math.cos(Math.radians(angle)) * magnitude
	v.y = Math.sin(Math.radians(angle)) * magnitude
	return v
}
//Add two vectors, returning a new one
add = function(v1, v2){
	return new Vector(v1.x + v2.x, v1.y + v2.y)
}
var Entity = {
	position : new Vector(0, 0),
	rotation : 0,
	accel : new Vector(0, 0),
	tex : null,
	Entity : function(x, y) {
		this.position = Object.create(Vector)
		this.position.x = x
		this.position.y = y
	},
	setTex : function(img) {
		tex = img
	},
	getTex : function() {
		return tex
	},
	draw : function(canvas, camera) {
		canvas.translate(this.position.x - camera.x, this.position.y - camera.y)
		canvas.rotate(this.rotation * Math.PI / 180)
		canvas.drawImage(this.getTex(), -32, -32)
		canvas.rotate(-this.rotation * Math.PI / 180)
		canvas.translate(-this.position.x + camera.x, -this.position.y + camera.y)
	},
}
limit = function(value, limit) {
	if(Math.abs(value) > Math.abs(limit))
		return getSign(value) * limit
	else
		return value
}

getSign = function(value) {
	return Math.abs(value) / value
}
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
