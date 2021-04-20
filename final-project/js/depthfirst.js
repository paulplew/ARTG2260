let future = [];
let depthHasBeenSetup = false;
let offsetX, offsetY, current;

// sets up the depth first maze generator
function depthFirstSetup() {
	rows = floor(width / cellSize);
	cols = floor(height / cellSize);

	offsetX = width - (rows * cellSize);
	offsetY = height - (cols * cellSize);

	depthHasBeenSetup = true;
 	for (let j = 0; j < cols; j++) {
    	for (let i = 0; i < rows; i++) {
      	let cell = new DepthFirstCell(i, j);
      	maze.push(cell);
    	}	
  	}

  	// maze[getIndex(cols - 1, rows - 1)].exit = true;
  	current = maze[0];
}

// represents a maze generation using depth first algorithm
function depthFirstDraw() {
	background(backgroundColor);

	if (!depthHasBeenSetup) {
		depthFirstSetup();
	} 

	for(let i = 0; i < maze.length; i++) {
		maze[i].draw();
	}

	if (animate) {
		updateNext();
	} else {
		generateMaze();
	}
}

function updateNext() {
	current.visit();
	current.highlight();
	let next = current.neighbor();

	// if there is at least one neighbor (next != undefined)
	if (next) {
	    next.visit();
	    future.push(current);
	    removeWalls(current, next);
	    current = next;
	} else if (future.length > 0) {
		current = future.pop();
	}
}

function generateMaze() {
	updateNext();
	while (future.length > 0) {
		updateNext();
	}
}

// represents a cell in a maze generated using the depth first method
function DepthFirstCell(x, y) {
	// this mazes position
	this.x = x;
	this.y = y;

	// the sides of this maze that contain walls
	this.sides = [true, true, true, true];

	this.exit = false;

	// has this cell been visited before
	this.visited = false

	// visits this cell
	this.visit = function() {
		this.visited = true;
	}

	this.highlight = function() {
		noStroke();
      	fill(highlightColor);
      	rect(
      		(offsetX / 2) + (this.x * cellSize) + cellSize / 2,
      		(offsetY / 2) + (this.y * cellSize) + cellSize / 2,
      		cellSize - 1, 
      		cellSize - 1);
	}

	// updates the list of this cells neighbors
	this.neighbor = function() {
		let neighbors = [];

		let top = maze[getIndex(this.x, this.y - 1)]
		let bottom = maze[getIndex(this.x, this.y + 1)]
		let left = maze[getIndex(this.x - 1, this.y)]
		let right = maze[getIndex(this.x + 1, this.y)]

		if (top && !top.visited) {
			neighbors.push(top);
		}
		if (bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if (left && !left.visited) {
			neighbors.push(left);
		}
		if (right && !right.visited) {
			neighbors.push(right);
		}

		if (neighbors.length > 0) {
      		let r = floor(random(0, neighbors.length));
      		return neighbors[r];
    	} else {
      		return undefined;
    	}
	}
    
	// draw this cell
	this.draw = function() {
		let xPos = (offsetX / 2) + (this.x * cellSize);
		let yPos = (offsetY / 2) + (this.y * cellSize);
		stroke(wallColor);

		// place a wall on the top of the cell
		if (this.sides[0]) {
			line(xPos, yPos, xPos + cellSize, yPos);
		}
		// place a wall on the bottom of the cell
		if (this.sides[1]) {
			line(xPos + cellSize, yPos, xPos + cellSize, yPos + cellSize);
		}
		// place a wall on the right of the cell
		if (this.sides[2]) {
			line(xPos + cellSize, yPos + cellSize, xPos, yPos + cellSize);
		}
		// place a wall on the left of the cell
		if (this.sides[3]) {
			line(xPos, yPos + cellSize, xPos, yPos);
		}
	};
}