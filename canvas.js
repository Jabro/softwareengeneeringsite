window.Canvas = (function () {
	var canvas = {
		canvasElement : null,
		context : null,
		init: function() {
			canvasElement = document.getElementById('canvas');
			context = canvasElement.getContext('2d');
		},
		drawline: function(x, y) {
			context.beginPath();
		  	context.moveTo(0,0);
		 	context.lineTo(x,y);
		 	context.stroke();
		},
		clear: function() {
			context.clear();
		},
		drawpoint: function(x, y, radius) {
			// redraw the line
			context.beginPath();
			context.moveTo(x, y);
			context.arc(x, y, /* radius */radius, 0, 2 * Math.PI, false);
	        context.fill();
		},
		movingcircle: function(startX, startY) {
			var x = startX;
			var y = startY;
			setInterval(function() {
				canvas.clear();
				x = x + 10;
				canvas.drawpoint(x, y, 10);
			}, 100);
		},
		activateMouseFollowingCircle: function() {
			canvasElement.onmousemove = function(event) {
				var positions = canvas.getMousePosition(event);
				console.log(positions);
				canvas.drawpoint(positions.x, positions.y, 10);
			};
		},
		getMousePosition: function(event) {
		   var parentOffset = $(canvasElement).offset(); 
		   //or $(this).offset(); if you really just want the current element's offset
		   console.log(canvasElement.pageX);
		   var relX = event.pageX - parentOffset.left;
		   var relY = event.pageY - parentOffset.top;
		   return {x: relX, y: relY};
		}
	};
	var controller = {
		init: function() {
			canvas.init();
			//canvas.movingcircle(30, 30);
			canvas.activateMouseFollowingCircle();
		}
	};
	return {
		init: function() {
			controller.init();
		}
	};
})();


//BEGIN OF Stackoverflow solution for clearing a canvas element
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};
//END OF  Stackoverflow solution for clearing a canvas element

window.addEventListener("DOMContentLoaded", function() {
	Canvas.init();
	console.log("affe");
}, false);