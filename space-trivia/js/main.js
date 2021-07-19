let transparency = 0;
let fadeOut = false;
let fadeIn = true;
let world;
let json;
let numberOfQuestions;
let answers = [];
let font;

// preload function
function preload() {
  font = loadFont("./font/roboto-mono.ttf");
  world = new World();
  json = loadJSON('triviaQuestions.json');
}

// setup function
function setup() {
  if (windowWidth > 600 && windowHeight > 600) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 600);

  }

  textFont(font);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  shapes = setupShapes();
  numberOfQuestions = json['numberOfQuestions'];
}

// draw function
function draw() {
  world.drawBackground();

  if (fadeIn && transparency < 200) {
    transparency += 15;
  } else if (fadeIn && transparency >= 200) {
    fadeIn = false;
  } else if (fadeOut && transparency > 0) {
    transparency -= 15;
  } else if (fadeOut && transparency <= 0) {
    fadeOut = false;
    fadeIn = true;
    world.next();
  }

  world.draw();
}

function mouseClicked() {
  world.click();
}

function drawShapes(speed) {
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].update(speed);
    shapes[i].draw();
  }
}

function setupShapes() {
  let shapeList = [];
  for (var i = 0; i < numShapes; i++) {
    let type = random(0, 4);

    let w = 20 + Math.floor(Math.random() * 51);
    let h = 20 + Math.floor(Math.random() * 51);

    let posn = new CartPt(
      w + Math.floor(Math.random() * (width - (w * 2))),
      h + Math.floor((Math.random() * (height - (h * 2)))));
    let color = colors[Math.floor(Math.random() * colors.length)];
    let rotation = random(0, TWO_PI);
    if (type <= 1) {
      shapeList.push(new Circle(posn, w, color, rotation));
    } else if (type > 1 && type <= 2) {
      shapeList.push(new Rectangle(posn, w, h, color, rotation));
    } else if (type > 2 && type <= 3) {
      shapeList.push(new Square(posn, w, color, rotation));
    } else if (type > 3 && type <= 4) {
      shapeList.push(new Triangle(posn, w, w, color, rotation));
    }
  }
  return shapeList;
}

function toHex(num) {
  if (num <= 0) {
    return "00";
  } else if (num <= 15) {
    return "0" + (num >>> 0).toString(16);
  } else if (num >= 255) {
    return "FF";
  } else {
    return (num >>> 0).toString(16);
  }
}
