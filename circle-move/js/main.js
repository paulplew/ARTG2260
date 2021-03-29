let mouseCircle;
let oldCircles = [];
let colors = [
'#B58900',
'#CB4B16',
'#DC322F',
'#D33682',
'#6C71C4',
'#268BD2',
'#2AA198',
'#859900'
];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	frameRate(60);

	mouseCircle = new Circle(width / 2, height / 2);
}

function draw() {
	if (windowWidth > width || windowHeight > height 
		|| windowWidth < width || windowHeight < height) {
		createCanvas(windowWidth, windowHeight);
	} 
	background('#FDF6E33A');
	if (oldCircles.length === 0) {
		erasing = false;
		document.title = "Click Me!"
	} else if (erasing) {
		if (frameCount % 10 === 0) {
			if (document.title === "Erasing...") {
				document.title = "Erasing"
			} else {
				document.title += "."
			}
		oldCircles.shift();
		}
	}
	drawCircles();
}

class Circle {
	constructor(positionX, positionY) {
		this.x = positionX;
		this.y = positionY;
		this.radius = 30;
		this.increasing = true;
		this.life = 0;
		this.c1 = color(colors[(int)(Math.random() * colors.length)]);
		this.c2 = color(colors[(int)(Math.random() * colors.length)]);
	}

	get positionX() {
		return this.x;
	}

	get positionY() {
		return this.y;
	}

	update() {
		this.life ++;
		if (this.life % 20 === 0) {
			this.increasing = !this.increasing;
		}
 		
 		if (this.life % 100 === 0) {
 			this.c1 = this.c2;
 			this.c2 = color(colors[(int)(Math.random() * colors.length)]);
 		}
		if (this.increasing) {
			this.radius += 0.5;
		} else {
			this.radius -= 0.5;
		}
	}

	set(newX, newY) {
		this.x = newX;
		this.y = newY;
	}

	draw() {
		let inter = map(this.life % 100, 0, 99, 0, 1);
		let c = lerpColor(this.c1, this.c2, inter);
		fill(c);
		push();
      	translate(this.x, this.y);
      	circle(0, 0, this.radius);
     	pop();
	}
}

function drawCircles() {
	mouseCircle.set(lerp(mouseCircle.positionX, mouseX, 0.05), lerp(mouseCircle.positionY, mouseY, 0.05));
	mouseCircle.update();
	mouseCircle.draw();

	for (let i = 0; i < oldCircles.length; i++) {
		oldCircles[i].update();
		oldCircles[i].draw();
	}
}

function mouseClicked() {
	oldCircles.push(new Circle(mouseCircle.positionX, mouseCircle.positionY));
}

function keyPressed() {
	if (keyCode === 82) {
		document.title = "Erasing."
		erasing = true;
	} else {
		oldCircles.shift();
	}
}