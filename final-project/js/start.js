let animateButton;
let title;
let startHasBeenSetup = false;

function startSetup() {
	startHasBeenSetup = true;
	animateButton = new Button(width / 2, (2 * height / 3) - 75, 300, 100);
    generateButton = new Button(width / 2, (2 * height / 3) + 75, 300, 100);

	title = new Button(width / 2, height / 4, 500, 200);
}

function startDraw() {
	background(backgroundColor);

	if (!startHasBeenSetup) {
    	startSetup();
	}

    textSize(32);
    if (animateButton.mouseCollide()) {
        highlightColor = '#FEB95FBB';
        animateButton.overlayText("Animate");
    	highlightColor = '#FEB95F'
    } else {
    	animateButton.overlayText("Animate");
    }

    textSize(32);
    if (generateButton.mouseCollide()) {
        highlightColor = '#FEB95FBB';
        generateButton.overlayText("Generate");
        highlightColor = '#FEB95F'
    } else {
        generateButton.overlayText("Generate");
    }
    

    textSize(75);
    title.overlayText("Maze\nMaker")
}

function startClicked() {
	if (animateButton.mouseCollide()) {
		startState = false;
		playState = true;
	} else if (generateButton.mouseCollide()) {
        startState = false;
        animate = false;
        playState = true;
    }
}