let circles = [];

let friction;
let gravity;
let mouseMag = false;

let size = 0;

let isStart = true;
let isTransition = false;
let fadeIn = false;
let play = false;
let ending = false;

let isBlue = true;
let isRed = false;
let isGreen = false;


// setup function
function setup() {
	if (windowWidth > 600 && windowHeight > 600) {
		createCanvas(windowWidth, windowHeight);
	} else {
  		createCanvas(600, 600);
	}
  	noStroke();

  	// create a slider that will control gravity on the balls
  	// then hide it
  	gSlider = createSlider(-50, 50, 15, 5);
  	gSlider.position(20, height - 40);
  	gSlider.hide();

  	// create a slider that will control friction on the balls
  	// then hide it
	fSlider = createSlider(0, 10, 1);
  	fSlider.position(20, height - 80);
  	fSlider.hide();

  	// create a check box that is used to toggle gravitational
  	// attraction to the mouse and then hide it
  	magnetBox = createCheckbox("", false);
  	magnetBox.position(width - 45, height - 79);
  	magnetBox.changed(toggleMagnet);
  	magnetBox.hide();
}

// draw function
function draw() {
	if (isStart) { // until you click the start button 
  		rectMode(CENTER);
  		textAlign(CENTER, CENTER);
		background('#000000');
		startScreen();
	} else if (isTransition) {
		size ++;
		transitionScreen(size);
	} else if (fadeIn) {
		fill('#e8e8e8');
		size ++;
		fadeInControls(size);
	} else if (play) {
		background('#ffffff');
		drawControls();
		
		// iterate through the list of balls and update then draw them one by one
		for (var i = circles.length - 1; i >= 0; i--) {
			let temp = circles[i]; 
			temp.update();
			temp.draw();
		}
	} else if (ending) {
		// iterate through the list of balls and update then draw them one by one
		background('#ffffff');
		for (var i = circles.length - 1; i >= 0; i--) {
			let temp = circles[i]; 
			temp.updateNoBounding();
			temp.draw();
			if (temp.isOffScreen()) {
				circles.splice(i, 1);
			}
		}
		drawControls();
		fadeOut();
	}
}

class Particle {
	// constructs a new particle or circle
	constructor(posX, posY) {
		this.radius = Math.round(random(5, 20)); 				// a rounded number between 5 and 20
		if (isBlue) { 										// if the color is blue set a blue color
			this.red = random(139 ,170);						// from this range that I like
			this.green = random(180,220);
			this.blue = random(201,241);
		} else if (isRed) {									// if the color is red set a red color
			this.red = random(201 ,241);						// from this range that I like
			this.green = random(139,179);
			this.blue = random(151,191);
		} else if (isGreen) {								// if the color is green set a green color
			this.red = random(139, 179);						// from this range that I like
			this.green = random(201, 241);
			this.blue = random(153, 193);
		} else {											// if something goes wrong set the color to black
			this.red = 0;
			this.green = 0;
			this.blue = 0;
		}
		this.position = new CartPt(posX, posY); 			// position is based on the current 
																// location of the mouse
		this.velocity = new CartPt(0, 0);						// the velocity is initialized to 0
	}

	// updates the particle's velocity and position if it is outside the frame of the screen it reverses the velocity and
	// places the circle in the correct position 
	update() { 
		this.updateVelocity();
		this.position.addToX(this.velocity.x);
		this.position.addToY(this.velocity.y);
		this.checkBoundaryCollision();
	}

	// used for the ending state will add values to the position based on the position
	updateNoBounding() {
		this.position.addToX((this.position.x - (width / 2)) * 0.1);
		this.position.addToY((this.position.y - (height / 2)) * 0.1);
	}

	// updates the velocity based on the current gravity, friction and mouseMagnet
	updateVelocity() {
		if (mouseMag) { 									// if the mouse magnet is on
			let dy = mouseY - this.position.y;				// find the distance between the mouse and 
																// the ball in the y direction
			let dx = mouseX - this.position.x;					// find the distance in the X direction
			let theta = atan2(dy, dx);							// calculate the angle from the ball
																// to the mouse
			this.velocity.addToX(gravity * cos(theta));			// add the cos of that angle to X
			this.velocity.addToY(gravity * sin(theta));			// and the sin of that angle to Y
		} else { 											// OTHERWISE
			this.velocity.addToX(0);							// the velocity in the X direction is constant
			this.velocity.addToY(gravity);						// and gravity is added to Y
		}
		this.velocity.multiplyYBy(friction);					// this is used to implement the friction 
		this.velocity.multiplyXBy(friction);					// it multiplies the velocity by a value between 0 and 1
	}

	// checks if the ball has collided with the sides of the screen
	checkBoundaryCollision() {
	    if (this.position.x > width - this.radius) {		// if the ball is off the left
	      	this.position.x = width - this.radius;				// set position to the left
	      	this.velocity.x *= -1;								// negate velocity in X
	    } else if (this.position.x < this.radius) {			// if the ball is off the right
	      	this.position.x = this.radius;						// set position to the right
	      	this.velocity.x *= -1;								// negate velocity
	    }	

	    if (this.position.y > height - this.radius - 100) {	// if the ball is off the bottom
	      	this.position.y = height - this.radius - 100;		// set the position to the bottom
	      	this.velocity.y *= -1;								// negate velocity
	    } else if (this.position.y < this.radius) {			// if the ball is off the top
	      	this.position.y = this.radius;						// set the position to the top
	      	this.velocity.y *= -1;								// negate velocity
	    }
  	}

  	// determines if the ball is on the screen
  	isOffScreen() {
  		return this.position.x > width 							// if the position is off right
  		|| this.position.y > height 							// if the position is off the bottom
  		|| this.position.x < 0 									// if the position is off left
  		|| this.position.y < 0;									// if the position is off the top
  	}

  	// draws the particles
  	draw() {
	  	push(); 
		fill(this.red, this.green, this.blue);					// place the color

		// SEIZURE MODE
		// let red = random(0, 255);	
		// let green = random(0, 255);
		// let blue = random(0, 255);
		// fill(red, green, blue);

		translate(this.position.x, this.position.y);  			// move the circle to the right place
		circle(0, 0, (this.radius * 2));						// draw the circle 
		noFill();												// set no fill for the arc
		stroke(255);											// set the stroke for the arc
		strokeWeight(2);										// set stroke weight
		let angle = atan2(this.position.y, this.position.x);	// find the angle between the ball and the corner
		arc(0, 0, this.radius, this.radius, angle - PI,   		// draw an arc at the angle
			angle + QUARTER_PI - PI);		
		noStroke();												// set no stroke

		pop();
  	}
}

// represents a point on the screen
class CartPt {
	constructor(x, y) { // constructor takes in two numbers
		this.x = x; 		// x position (width)
		this.y = y;			// y position (height)
	}

	// adds the given value to Y
	addToY(y) {
		this.y += y;
	}

	// adds the given value to X
	addToX(x) {
		this.x += x;
	}

	// multiplies X by the given value
	multiplyXBy(mult) {
		this.x *= mult;
	}

	// multiplies y by the given value
	multiplyYBy(mult) {
		this.y *= mult;
	}
}

function mouseDragged() {
	if (play 												// if it is the play state 
		&& mouseY < height - 100) {							// and the mouse is in the play area

		if (circles.length < 200) {							// if the length of the circles is less than 200
  			circles.push(new Particle(mouseX, mouseY));			// add a new circle
		}
  		else {												// OTHERWISE if the length is over 200 
  			circles.shift();
  			circles.push(new Particle(mouseX, mouseY));			// remove one circle and add a new one
  		}
  	}
}

// mouse clicked event handler for start button and color buttons
function mouseClicked() {
	if (isStart 							// if the start state is active
		&& (mouseX < (width / 2) + 100) 	// and the mouse is within the 
		&& (mouseX > (width / 2) - 100)		// bounds of the start box
		&& (mouseY < (height / 2) + 40) 	// when it is clicked
		&& (mouseY > (height / 2) - 40)) {
		endStart();
	}else if (play
		&& mouseX > width - 170 			// if it is the play state
		&& mouseX < width - 150 			// and the mouse is clicked
		&& mouseY > height - 40				// within the red box
		&& mouseY < height - 20) {
		isRed = true; 							// set red on and 
		isGreen = false;						// blue and green off
		isBlue = false;
	} else if (play							// if it is the play state
		&& mouseX > width - 140 			// and the mouse is clicked
		&& mouseX < width - 120 			// within the green box
		&& mouseY > height - 40
		&& mouseY < height - 20) {
		isRed = false;							// set green on and 
		isGreen = true; 						// red and blue off
		isBlue = false;
	} else if (play							// if it is the play state
		&& mouseX > width - 110 			// and the mouse is clicked
		&& mouseX < width - 90 				// within the blue box
		&& mouseY > height - 40
		&& mouseY < height - 20) {
		isRed = false;							// set blue on and 
		isGreen = false;						// red and green off
		isBlue = true;
	} else if (play
		&& mouseX > (width / 2) - 25	// if it is the play state and the
		&& mouseX < (width / 2) + 25 		// mouse is clicked in the reset
		&& mouseY > (height - 60)			// box
		&& mouseY < (height - 40)) {
		play = false;						// set to ending state
		ending = true;
		gSlider.hide();						// hide the sliders and checkbox
		fSlider.hide();
		magnetBox.hide();
	}

}

function keyPressed() {
	if (isStart) {						// if a key is pressed in the start state
		endStart();							// end the start state
	} else if (play) {					// if a key is pressed in the play state
		if (circles.length < 200) {							// if the length of the circles is less than 200
  			circles.push(new Particle(random(0, width - 20),
  			 random(0, height - 120)));						// add a new circle at a random position
		}
  		else {												// OTHERWISE if the length is over 200 
  			circles.shift();
  			circles.push(new Particle(random(0, width - 20), 
  			random(0, height - 120)));			// remove one circle and add a new one
  		}
	}
}

// toggles the magnet on the box switch
function toggleMagnet() {
	mouseMag = !(mouseMag);
}

// function for drawing the controls at the bottom of the screen
function drawControls() {
	// draw a rectangle at the bottom of the screen to house the controls
	fill('#e8e8e8');
	rect(0, height - 100, width, 100);

	// draw a top rectangle to add some depth to the control box
	fill(179);
	rect(0, height - 100, width, 3);

	// draw three squares to represent the backgrounds of the colors
	if (isRed) {								// if the color is red
		fill(209, 139, 151); 						// draw a slightly larger
		rect(width - 172, height - 42, 24, 24);		// and darker square	
	}
	 else if (isGreen) {						// if the color is green
  		fill(139, 201, 143);						// draw a slightly larger
  		rect(width - 142, height - 42, 24, 24);		// and darker square
	} else if (isBlue) {						// if the color is blue
		fill(139, 180, 201);						// draw a slightly larger
		rect(width - 112, height - 42, 24, 24);		// and darker square
	}

	// draw three squares to represent the colors
	fill(229, 159, 171); 
	rect(width - 170, height - 40, 20, 20);
  	fill(159, 221, 173);
  	rect(width - 140, height - 40, 20, 20);
	fill(159, 200, 221);
	rect(width - 110, height - 40, 20, 20);

	// draw other squares if the mouse is above the squares
	if (mouseX > width - 170 					// if the mouse is within
		&& mouseX < width - 150       			// the bounds of the red
		&& mouseY > height - 40 				// square
		&& mouseY < height - 20) {
		fill(249, 179, 191); 						// draw a brighter red square
		rect(width - 170, height - 40, 20, 20);
	} else if (mouseX > width - 140 			// if the mouse is within
		&& mouseX < width - 120 				// the bounds of the green square
		&& mouseY > height - 40
		&& mouseY < height - 20) {
  		fill(179, 241, 193);						// draw a brighter green square
  		rect(width - 140, height - 40, 20, 20);
	} else if (mouseX > width - 110				// if the mouse is within
		&& mouseX < width - 90 					// the bounds of the blue square
		&& mouseY > height - 40
		&& mouseY < height - 20) {
		fill(179, 220, 241);						// draw a brighter blue square
		rect(width - 110, height - 40, 20, 20);
	} 

	// set the gravity and friction variables based on the values
	// of their sliders
	gravity = gSlider.value() / 100;
	friction = 1 - (fSlider.value() / 1000);

	// draw text on the bottom of the screen for the controls
	fill('#000000');
	text("Gravity: " + Math.round(gravity * 100), gSlider.height * 2 + gSlider.width, height - 25); 
	text("Friction: " + Math.round((-1000 * (friction - 1))), fSlider.height * 2 + fSlider.width, height - 65);
	text(circles.length + " Balls", width - 65, height - 25);
	document.title = circles.length + " Balls";
	text("Mouse gravity", width - 125, height - 65);
	
	// reset button
	if (mouseX > (width / 2) - 25				// if the mouse is within the box
		&& mouseX < (width / 2) + 25 			// containing the reset text
		&& mouseY > (height - 60)
		&& mouseY < (height - 40)) {
		fill(140);									// brighten everything in the
		rectMode(CENTER);							// reset box
		rect(width / 2, height - 50, 50, 20);
		rectMode(CORNER);
		fill(255);
		textAlign(CENTER, CENTER);
		text("RESET", width / 2, height - 50);
		textAlign(LEFT, BASELINE);		
	} else {									// OTHERWISE
		fill(100);									// draw the reset box normally
		rectMode(CENTER);
		rect(width / 2, height - 50, 50, 20);
		rectMode(CORNER);
		fill(215);
		textAlign(CENTER, CENTER);
		text("RESET", width / 2, height - 50);
		textAlign(LEFT, BASELINE);		
	}
}



// draws the starting screen of the game
function startScreen() {
	document.title = "Start";
	if ((mouseX < (width / 2) + 100) 
		&& (mouseX > (width / 2) - 100)
		&& (mouseY < (height / 2) + 40) 
		&& (mouseY > (height / 2) - 40)) { 	// if the mouse is within the bounds of the
											// start button
		fill(79);								// sets the fill to this color
	} else {								// otherwise
		fill('#000000');						// sets the fill to black
	}	
											//THEN
	rect(width / 2, height / 2, 200, 80);		// draws a rectangle to act as the start
												// button
	fill('#e8e8e8');							// sets the fill to another color
	text("Start", width / 2, height / 2);		// draws the 'start' text
}

// called when the start button is clicked
function endStart() {
	textAlign(LEFT, BASELINE);					// sets the text align to default
	isStart = false;							// turns off the start state
	isTransition = true;						// turns on the first transition
}

// draws the transition screen and its animation
function transitionScreen() {
	
	if (size <= 50) {						// should run 50 iterations

												// r is the radius of the circle
		r = map(size, 0, 50, 0, width * 2);		// maps size to r

												// bw is used for setting the color
		bw = map(size, 0, 50, 79, 255);	    	// maps size to bw

		fill(bw); 								// set fill
		circle(width / 2, height / 2, r);		// draw the circle

	} else {								// if the previous has run the specified number of times
		size = 0;								// reset size
		rectMode(CORNER);						// change rect mode to corner (NORMAL)
		fadeIn = true;							// set fade in to true will then be used in draw()
		isTransition = false;					// set transition to false so it can be reset later on
	}
}

// animates the fading in of the controls
function fadeInControls() {
	if (size < 20) {						// should run 20 times

												// r is used as the height of the drawn rectangle
		r = map(size, 0, 20, 0, 97);	 		// maps size to r

		rect(0, height - r, width, r);			// draws a rectangle of the correct height in the 
												// correct place
	} else { 								// if the previous has run the specified number of times
		size = 0;								// resets size
		gSlider.show();							// sets the gravity slider to visible
		fSlider.show();							// sets the friction slider to visible
		magnetBox.show();						// sets the check box to visible
		fadeIn = false;							// turns off this animation 
		play = true;
												// marking it as done
	}
}

function fadeOut() {	
	document.title = "Resetting";
	if (circles.length <= 0 && size < 100) { 	// should run 40 times to fade to black
		r = map(size, 0, 100, 255, 0);				// map size from white to black	

		fill(r);									// fill of r (0 -> 255)
		rect(0, 0, width, height);					// draw a rectangle the size of the screen
		size++;
	} else if (size >= 100) {					// if the previous has run 40 times
		size = 0;									// reset size
		ending = false;								// set the ending state to false
		isStart = true;								// set the start state to true
		rect(0, 0, width, height);					// draw the final rectangle
	}
}
