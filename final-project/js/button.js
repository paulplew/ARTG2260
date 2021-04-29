// represents a button
function Button(x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;

	// draws a rectangle for this button
	this.draw = function() {
		noStroke();
		fill(this.color);
		rect(this.x, this.y, this.w, this.h, 10, 10, 10, 10);
	};

	// overlays text over the button background with the given
	// size and color
	this.overlayText = function(string, size, color) {
		this.draw();
		textSize(size);
		fill(color);
		text(string, this.x, this.y);
	}

	// determines if the mouse is over this button
	this.mouseCollide = function() {
		return (mouseX >= this.x - this.w / 2 
			&& mouseX <= this.x + this.w / 2
			&& mouseY >= this.y - this.h / 2
			 && mouseY <= this.y + this.h / 2);
	}
}