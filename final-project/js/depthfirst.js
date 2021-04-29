let future = [];
let depthHasBeenSetup = false;
let win = false;
let offsetX, offsetY, current;
let backButton, refreshButton, saveButton, playButton, restartButton;
let millisecs = 0; 
let seconds = 0;
let minutes = 0;

// sets up the depth first maze generator
function depthFirstSetup() {
	mazeGenerateState = true;
	future = [];
	maze = [];
	rows = floor(width  / cellSize) - 1;
	cols = floor((height - 100) / cellSize) - 1;

	offsetX = width - (rows * cellSize);
	offsetY = height - 100 - (cols * cellSize);

	depthHasBeenSetup = true;
 	for (let j = 0; j < cols; j++) {
    	for (let i = 0; i < rows; i++) {
      	let cell = new Cell(i, j);
      	maze.push(cell);
    	}	
  	}

  	current = maze[0];

  	backButton = new Button(width / 2 - 225, height - 55, 125, 50, wallColor);
  	refreshButton = new Button(width / 2 - 75, height - 55, 125, 50, wallColor);
  	saveButton = new Button(width / 2 + 75, height - 55, 125, 50, wallColor);
  	playButton = new Button(width / 2 + 225, height - 55, 125, 50, wallColor);
}

// draws the maze generation using a depth first search algorithm 
function mazeDraw() {
	if (!depthHasBeenSetup) {
		background(backgroundColor);
		depthFirstSetup();
	} else if (mazeGenerateState) {
		background(backgroundColor);
		if (backButton.mouseCollide()) {
	    	backButton.overlayText("back", 35, highlightColor);
		} else {
	   		backButton.overlayText("back", 30, highlightColor);
		}
	    
		if (future.length === 0) {
			if (refreshButton.mouseCollide()) {
		        refreshButton.overlayText("new", 35, highlightColor);
		    } else {
		    	refreshButton.overlayText("new", 30, highlightColor);
		    }

			if (saveButton.mouseCollide()) {
		        saveButton.overlayText("save", 35, highlightColor);
		    } else {
		    	saveButton.overlayText("save", 30, highlightColor);
		    }

		    if (playButton.mouseCollide()) {
		        playButton.overlayText("play", 35, highlightColor);
		    } else {
		    	playButton.overlayText("play", 30, highlightColor);
		    }
		}


		for(let i = 0; i < maze.length; i++) {
			maze[i].draw();
		}

		if (animate) {
			updateNext();
		} else {
			generateMaze();
		}
	} else if (mazePlayState) {
		background(backgroundColor);
		if (backButton.mouseCollide()) {
	    	backButton.overlayText("back", 35, highlightColor);
		} else {
	   		backButton.overlayText("back", 30, highlightColor);
		}

		if (refreshButton.mouseCollide()) {
	        refreshButton.overlayText("restart", 35, highlightColor);
	    } else {
	    	refreshButton.overlayText("restart", 30, highlightColor);
	    }

	    timer(width / 2 + 225, height - 52);
  		textSize(35);
	    text(nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(millisecs, 1), width / 2 + 225, height - 52);

	    current.highlight();
		for (let i = 0; i < maze.length; i++) {
			maze[i].draw();
		}
	} else if (mazeEndState) {
		background(highlightColor);

		if (backButton.mouseCollide()) {
	    	backButton.overlayText("home", 35, highlightColor);
		} else {
	   		backButton.overlayText("home", 30, highlightColor);
		}

		fill(backgroundColor);
  		textSize(35);
	    text(nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(millisecs, 1), width / 2 + 225, height - 52);
		for (let i = 0; i < maze.length; i++) {
			maze[i].draw();
		}

	}
}

// updates the next cell on the stack
function updateNext() {
	current.visit();
	if (future.length > 0) {
		current.highlight();
	}
	let next = current.neighbor();

	// if there is at least one neighbor (next is defined)
	if (next) {
	    next.visit();
	    future.push(current);
	    removeWalls(current, next);
	    current = next;
	} else if (future.length > 0) {
		current = future.pop();
	}
}

// generates the entire maze in one frame 
function generateMaze() {
	// while there are cells to be updated
	updateNext();
	while (future.length > 0) {
		updateNext();
	}
}

// handler for the mouse click in the maze state
function playClicked() {
	if (mazeGenerateState) {
		generateStateClicked();
	} else if (mazePlayState) {
		playStateClicked();
	} else if (mazeEndState) {
		endStateClicked();
	}		
}

// handler for the mouse click in the generation state
function generateStateClicked() {
	if (backButton.mouseCollide()) {
		// returns to the start screen
		depthHasBeenSetup = false;
		mazeState = false;
		mazePlayState = false;
		mazeGenerateState = true;
		selectionState = true;
	} else if (future.length === 0) {
		// if these buttons are active
		if (refreshButton.mouseCollide()) {
			// resets up the maze to be generated again
			depthHasBeenSetup = false;
		} else if (saveButton.mouseCollide()) {
			// draws one frame and saves that frame to be printed later
			background('#FFFFFF');
			push();
			translate(0, 50);
			for(let i = 0; i < maze.length; i++) {
				maze[i].draw();
			}
			pop();
			saveCanvas("maze", "jpg");
		} else if (playButton.mouseCollide()) {
			// starts the maze game
			mazeGenerateState = false
			mazePlayState = true;
		}
	}
}

// handler for the mouse click in the play state
function playStateClicked() {
	if (backButton.mouseCollide()) {
		// resets the clock and returns one screen
		for (let i = 0; i < maze.length; i++) {
			maze[i].color = "#FFFFFF00";
		}
		current = maze[getIndex(0, 0)];
		millisecs = 0;
		seconds = 0;
		minutes = 0;
		mazePlayState = false;
		mazeGenerateState = true;
	} else if (refreshButton.mouseCollide()) {
		// resets the clock and restarts the maze
		for (let i = 0; i < maze.length; i++) {
			maze[i].color = "#FFFFFF00";
		}
		current = maze[getIndex(0, 0)];
		millisecs = 0;
		seconds = 0;
		minutes = 0;
	}
}

// handler for the mouse click in the end state
function endStateClicked() {
	// returns to the start
	if (backButton.mouseCollide()) {
		startState = true;
		mazeState = false;
		mazeEndState = false;
		depthHasBeenSetup = false;
	}
}

// handler for the key pressed in the maze state
function mazeKeyPressed(keyCode) {
	if (mazePlayState) {
		playStateKeyPressed(keyCode);
	}
}

// handler for the key pressed in the play state
function playStateKeyPressed(keyCode) {
	// 38 == UP
	// 39 == RIGHT
	// 40 == DOWN
	// 37 == LEFT

	if(keyCode === 38 && !current.sides[0]) { // top
			current.color = backgroundColor;
			current = maze[getIndex(current.x, current.y - 1)];
	} else if(keyCode === 39 && !current.sides[1]) { // right
		if (current.x === rows - 1 && current.y === cols - 1) {
			current.color = backgroundColor;
			mazePlayState = false;
			mazeEndState = true;
		} else {
			current.color = backgroundColor;
			current = maze[getIndex(current.x + 1, current.y)];
		}
	} else if(keyCode === 40 && !current.sides[2]) { // bottom
		current.color = backgroundColor;
		current = maze[getIndex(current.x, current.y + 1)];
	} else if(keyCode === 37 && !current.sides[3]) { // left
		if (current.x > 0 && current.y > 0) {
			current.color = backgroundColor;
			current = maze[getIndex(current.x - 1, current.y)];
		}
	}
}

// removes the walls between two cells depending on
// where they are in relation to each other
function removeWalls(a, b) {
  let x = a.x - b.x;
  if (x === 1) { // b to the left of a
    a.sides[3] = false;
    b.sides[1] = false;
  } else if (x === -1) { // a to the left of b
    a.sides[1] = false;
    b.sides[3] = false;
  }

  let y = a.y - b.y;
  if (y === 1) { // a above b
    a.sides[0] = false;
    b.sides[2] = false;
  } else if (y === -1) { // b above a
    a.sides[2] = false;
    b.sides[0] = false;
  }
}

