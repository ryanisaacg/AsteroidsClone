var c =document.getElementById("canvas");
var ctx=c.getContext("2d");

var ONE_FRAME_TIME = 1000 / 60 ;
var mainloop = function() {
	ctx.clearRect ( 0 , 0 , 960, 720);
	draw(ctx)
	update()
};
setInterval( mainloop, ONE_FRAME_TIME );