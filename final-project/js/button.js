function Button(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = function() {
		noStroke();
		fill(highlightColor);
		rect(this.x, this.y, this.w, this.h, 10, 10, 10, 10);
	};

	this.overlayText = function(string) {
		this.draw();

		fill(wallColor);
		text(string, this.x, this.y);
	}

	this.mouseCollide = function() {
		return (mouseX >= this.x - this.w / 2 
			&& mouseX <= this.x + this.w / 2
			&& mouseY >= this.y - this.h / 2
			 && mouseY <= this.y + this.h / 2);
	}
}