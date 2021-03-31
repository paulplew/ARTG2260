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

// draws and updates all the circles that exist
function drawCircles() {
	// lerp the location of the mouse circle so it moves smoothly
	mouseCircle.x = lerp(mouseCircle.x, mouseX, 0.05);
	mouseCircle.y = lerp(mouseCircle.y, mouseY, 0.05);
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
	oldCircles.push(new Circle(mouseCircle.x, mouseCircle.y));
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
