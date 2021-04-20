let startButton;
let title;
let startHasBeenSetup = false;

function startSetup() {
	startHasBeenSetup = true;
	startButton = new Button(width / 2, 2 * height / 3, 300, 100);
	title = new Button(width / 2, height / 4, 500, 150);
}

function startDraw() {
	background(backgroundColor);

	if (!startHasBeenSetup) {
    	startSetup();
	}

    textSize(32);
    if (startButton.mouseCollide()) {
        highlightColor = '#FEB95FBB';
        startButton.overlayText("START");
    	highlightColor = '#FEB95F'
    } else {
    	startButton.overlayText("START");
    }

    textSize(75);
    title.overlayText("MAZE")
}

function startClicked() {
	if (startButton.mouseCollide()) {
		startState = false;
		playState = true;
	}
}