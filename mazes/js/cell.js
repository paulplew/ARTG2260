// represents a cell in a maze generated using the depth first method
function Cell(x, y) {
	// this mazes position
	this.x = x;
	this.y = y;
	this.color = "#FFFFFF00";
	// the sides of this maze that contain walls
	this.sides = [true, true, true, true];

	this.exit = false;

	// has this cell been visited before
	this.visited = false

	// visits this cell
	this.visit = function() {
		this.visited = true;
	}

	// draws this cell with the highlight color
	this.highlight = function() {
		noStroke();
      	fill(highlightColor);
      	rect(
      		(offsetX / 2) + (this.x * cellSize) + cellSize / 2,
      		(offsetY / 2) + (this.y * cellSize) + cellSize / 2,
      		cellSize - 3, 
      		cellSize - 3);
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
    
	// draw this cell and its walls
	this.draw = function() {
		strokeWeight(3);
		let xPos = (offsetX / 2) + (this.x * cellSize);
		let yPos = (offsetY / 2) + (this.y * cellSize);
		stroke(wallColor);

		// place a wall on the top of the cell
		if (this.sides[0]) {
			line(xPos, yPos, xPos + cellSize, yPos);
		}
		// place a wall on the right of the cell
		if (this.sides[1]) {
			line(xPos + cellSize, yPos, xPos + cellSize, yPos + cellSize);
		}
		// place a wall on the bottom of the cell
		if (this.sides[2]) {
			line(xPos + cellSize, yPos + cellSize, xPos, yPos + cellSize);
		}
		// place a wall on the left of the cell
		if (this.sides[3]) {
			line(xPos, yPos + cellSize, xPos, yPos);
		}

		if (this.x === 0 && this.y === 0) {
			this.sides[3] = false;
		} else if (this.x === rows - 1 && this.y === cols - 1) {
			this.sides[1] = false;
		}

		noStroke();
      	fill(this.color);
      	rect(
      		(offsetX / 2) + (this.x * cellSize) + cellSize / 2,
      		(offsetY / 2) + (this.y * cellSize) + cellSize / 2,
      		cellSize - 3, 
      		cellSize - 3);
	};
}