// Global Variables
let mouseCircle;
let erasing = false;
let oldCircles = [];
let colors = [
	'#B58900',
	'#CB4B16',
	'#DC322F',
	'#D33682',
	'#6C71C4',
	'#268BD2',
	'#2AA198',
	'#859900'
];

// setup function
function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	frameRate(60);
	
	// start the circle that follows the mouse in the middle 
	// of the page
	mouseCircle = new Circle(width / 2, height / 2);
}

// draw function called each frame
function draw() {
	// if the window size has changed from the previous frame set
	if (windowWidth > width || windowHeight > height 
		|| windowWidth < width || windowHeight < height) {
		createCanvas(windowWidth, windowHeight);
	} 
	
	background('#FDF6E33A');
	
	// if the screen is erasing and the length of the old
	// circles is 0, stop erasing
	if (erasing && oldCircles.length === 0) {
		erasing = false;
		document.title = "Click Me!"

	// erase the last circle every 10 frames
	} else if (erasing) {
		if (frameCount % 5 === 0) {
			// change the title from `Erasing' to `Erasing...'
			if (document.title === "Erasing...") {
				document.title = "Erasing"
			} else {
				document.title += "."
			}
		oldCircles.shift();
		}
	}
	
	// draw all the circles
	drawCircles();
}

// class to represent a circle that can be drawn
class Circle {
	constructor(posnX, posnY) {
		this.x = posnX;
		this.y = posnY;
		this.radius = 30;
		this.increasing = true;
		this.life = 0;
		this.c1 = color(colors[(int)(Math.random() * colors.length)]);
		this.c2 = color(colors[(int)(Math.random() * colors.length)]);
	}

	// returns the X position
	get posnX() {
		return this.x;
	}

	// returns the Y position
	get posnY() {
		return this.y;
	}

	update() {
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

	// change the X and Y position of this circle
	set(newX, newY) {
		this.x = newX;
		this.y = newY;
	}
	
	// draw this circle
	draw() {
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

	// checks if the circle has collided with another circle
	collideWith(other) {
		if (other instanceof Circle) {
			let distX = other.posnX - this.posnX;
			let distY = other.posnY - this.posnY;
			let distance = Math.sqrt((distX * distX) + (distY * distY));
			return distance <= (this.radius + other.radius) / 2;
		} else {
			return false;
		}
	}
}

// draws and updates all the circles that exist
function drawCircles() {
	// lerp the location of the mouse circle so it moves smoothly
	mouseCircle.set(lerp(mouseCircle.posnX, mouseX, 0.05), lerp(mouseCircle.posnY, mouseY, 0.05));
	mouseCircle.update();
	mouseCircle.draw();

	// update and draw all the old circles
	for (let i = 0; i < oldCircles.length; i++) {
		let oldCircle = oldCircles[i];
		oldCircles[i].update();
		oldCircles[i].draw();

		if (oldCircle.life >= 50 && oldCircle.collideWith(mouseCircle)) {
			oldCircles.splice(i, 1);
		}
	}
}

// called when the mouse is clicked
function mouseClicked() {
	// add a new circle at the current position of the mouse circle
	oldCircles.push(new Circle(mouseCircle.posnX, mouseCircle.posnY));
}

// called when a key is pressed
function keyPressed() {
	// if 'r' is pressed
	if (keyCode === 82) {
		document.title = "Erasing."
		erasing = true;
	// remove the oldest circle
	} else {
		oldCircles.shift();
	}
}
