var Keyboard = {
	left : false,
	right : false,
	up : false,
	set : function(keyCode, value) {
		switch(keyCode)
		{
			case 37:
				this.left = value
				break;
			case 38:
				this.up = value
				break;
			case 39:
				this.right = value
				break;
		}
	}
}
//Listen for keys
document.addEventListener('keydown', function(event) {
	Keyboard.set(event.keyCode, true)
});
document.addEventListener('keyup', function(event) {
	Keyboard.set(event.keyCode, false)
});