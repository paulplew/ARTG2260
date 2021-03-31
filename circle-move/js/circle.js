// class to represent a circle that can be drawn
function Circle(posnX, posnY) {
	this.x = posnX;
	this.y = posnY;
	this.radius = 30;
	this.increasing = true;
	this.life = 0;
	this.c1 = color(colors[(int)(Math.random() * colors.length)]);
	this.c2 = color(colors[(int)(Math.random() * colors.length)]);

	this.update = function() {
		this.life ++;
		// switch the boolean that represents increasing
		if (this.life % 20 === 0) {
			this.increasing = !this.increasing;
		}

		// set the first color to the second pick a new color
		if (this.life % 100 === 0) {
			this.c1 = this.c2;
			this.c2 = color(colors[(int)(Math.random() * colors.length)]);
		}
		
		// resize the circle
		if (this.increasing) {
			this.radius += 0.5;
		} else {
			this.radius -= 0.5;
		}
	}

	this.draw = function() {
		// liner interpolate the color from the old color
		// to the new color
		let inter = map(this.life % 100, 0, 99, 0, 1);
		let c = lerpColor(this.c1, this.c2, inter);
		fill(c);
		
		// draw this circle
		push();
		translate(this.x, this.y);
		circle(0, 0, this.radius);
		pop();
	}

	this.collideWith = function(other) {
		// checks if the circle has collided with another circle
		if (other instanceof Circle) {
			let distX = other.x - this.x;
			let distY = other.y - this.y;
			let distance = Math.sqrt((distX * distX) + (distY * distY));
			return distance <= (this.radius + other.radius) / 2;
		} else {
			return false;
		}
	}
}