let startHasBeenSetup = false;

// start setup function
function startSetup() {
	startHasBeenSetup = true;
    animateButton = new Button(width / 2, (2 * height / 3) - 75, 300, 100, "#00000000");
    generateButton = new Button(width / 2, (2 * height / 3) + 75, 300, 100, "#00000000");
	title = new Button(width / 2, height / 4, 500, 200, "#00000000");
}
 
// start draw function
function startDraw() {
	background(backgroundColor);

	if (!startHasBeenSetup) {
    	startSetup();
	}

    if (animateButton.mouseCollide()) {
        animateButton.overlayText("Animate", 50, highlightColor);
    } else {
    	animateButton.overlayText("Animate", 45, wallColor);
    }

    if (generateButton.mouseCollide()) {
        generateButton.overlayText("Generate", 50, highlightColor);
    } else {
        generateButton.overlayText("Generate", 45, wallColor);
    }
    
    title.overlayText("Maze Maker", 75, wallColor);
}
 
// handler for mouse clicks in the start screen
function startClicked() {
	if (animateButton.mouseCollide()) {
		startState = false;
		animate = true;
		selectionState = true;
	} else if (generateButton.mouseCollide()) {
        startState = false;
        animate = false;
        selectionState = true;
    }
}