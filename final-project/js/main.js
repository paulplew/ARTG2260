let startState = true;
let playState = false;
let generateState = false;

let depthFirst = true;
let kruskal = false;

let animate = true;

let print = false;

let backgroundColor = '#A188A680';
let wallColor = '#00000088';
let highlightColor = '#FEB95F';

let maze = [];
let cellSize = 50;
let rows;
let cols;

function setup() {
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	strokeWeight(2);
	noStroke();
	createCanvas(windowWidth, windowHeight);
	frameRate(24);
}

function draw() {
	if (startState) {
		startDraw();
	} else if (playState) {
		if (depthFirst) {
			depthFirstDraw();
		}
	} else if (generateState) {

	}
}

function mouseClicked() {
	if (startState) {
		startClicked();
	}
}

function getIndex(x, y) {
	if (x < 0 || y < 0 || x > rows - 1 || y > cols - 1) {
		return -1;
	}
	return x + (y * rows);
}

function removeWalls(a, b) {
  let x = a.x - b.x;
  if (x === 1) {
    a.sides[3] = false;
    b.sides[1] = false;
  } else if (x === -1) {
    a.sides[1] = false;
    b.sides[3] = false;
  }
  let y = a.y - b.y;
  if (y === 1) {
    a.sides[0] = false;
    b.sides[2] = false;
  } else if (y === -1) {
    a.sides[2] = false;
    b.sides[0] = false;
  }
}