let easyButton, mediumButton, hardButton;
let difficultyHasBeenSetup = false;

// selection screen setup 
function selectionSetup() {
	difficultyHasBeenSetup = true;

  	backButton = new Button(width / 2 - 225, height - 55, 125, 50, wallColor);
  	easyButton = new Button(width / 2 - 225, height / 2 + 100, 200, 50, wallColor);
  	mediumButton = new Button(width / 2, height / 2 + 100, 200, 50, wallColor);
  	hardButton = new Button(width / 2 + 225, height / 2 + 100, 200, 50, wallColor);	
}

// selection screen draw
function selectionDraw() {
	background(backgroundColor);

	if (!difficultyHasBeenSetup) {
		selectionSetup();
	}


	if (backButton.mouseCollide()) {
		backButton.overlayText("back", 35, highlightColor);
	} else {
		backButton.overlayText("back", 30, highlightColor);
	}

	strokeWeight(3);
	stroke(wallColor);
	noFill();

	// draw rectangles that are the different cell sizes
	rect(width / 2 - 225, height / 2, 50);
	rect(width / 2, height / 2, 25);
	rect(width / 2 + 225, height / 2, 15);

	title.overlayText("Select a Cell Size", 75, wallColor);
	if (easyButton.mouseCollide()) {
		easyButton.overlayText("easy", 35, highlightColor);
	} else {
		easyButton.overlayText("easy", 30, highlightColor);
	}

	if (mediumButton.mouseCollide()) {
		mediumButton.overlayText("medium", 35, highlightColor);
	} else {
		mediumButton.overlayText("medium", 30, highlightColor);
	}

	if (hardButton.mouseCollide()) {
		hardButton.overlayText("hard", 35, highlightColor);
	} else {
		hardButton.overlayText("hard", 30, highlightColor);
	}
}

// handler for mouse clicks in the selection screen
function selectionClicked() {
	if (backButton.mouseCollide()) {
		// returns to the start
		selectionState = false;
		startState = true;
	} else if (easyButton.mouseCollide()) {
		// sets big cells
		cellSize = 50;
		selectionState = false;
		mazeState = true;
	} else if (mediumButton.mouseCollide()) {
		// sets medium sized cells
		cellSize = 25;
		selectionState = false;
		mazeState = true;
	} else if (hardButton.mouseCollide()) {
		// sets small cells
		cellSize = 15;
		selectionState = false;
		mazeState = true;
	}
}