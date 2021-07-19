let startState = true;
let selectionState = false;
let mazeState = false;
let mazePlayState = false;
let mazeGenerateState = false;

let depthFirst = true;
let kruskal = false;

let animate = true;

let print = false;

let backgroundColor = '#fe795f80';
let wallColor = '#333333';
let highlightColor = '#FEB95F';

let maze = [];
let cellSize = 25;
let rows;
let cols;

// setup function
function setup() {
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	noStroke();
	if (windowWidth < 675 && windowHeight > 300) {
		createCanvas(675, windowHeight)
	} else if (windowWidth >= 675 && windowHeight < 450) {
		createCanvas(windowWidth, 450);
	} else {
		createCanvas(windowWidth, windowHeight);
	}
	frameRate(24);
}
 

// draw function
function draw() {
	if (startState) {
		startDraw();
	} else if (selectionState) {
		selectionDraw();
	} else if (mazeState) {
		if (depthFirst) {
			mazeDraw();
		}
	}
}
 
// handler for mouse clicks
function mouseClicked() {
	if (startState) {
		startClicked();
	} else if (selectionState) {
		selectionClicked();
	} else if (mazeState) {
		playClicked();
	}
}

// handler for key presses
function keyPressed() {
	if (mazeState) {
		mazeKeyPressed(keyCode);
	}
}

// returns the index in a 1d array with the given x and y coordinates
// if the array was a 2d
function getIndex(x, y) {
	if (x < 0 || y < 0 || x > rows - 1 || y > cols - 1) {
		return -1;
	}
	return x + (y * rows);
}
 
// updates the milliseconds seconds and minutes of a timer
function timer(x, y) {
	// adapted from https://openprocessing.org/sketch/181522
	if (int(millis()/100)  % 10 != millisecs){
    	millisecs++;
  	}

  	if (millisecs >= 10){
    	millisecs -= 10;
    	seconds++;
  	}

  	if (seconds >= 60){
    	seconds -= 60;
    	minutes++;
  	}


}