let numShapes = 10;
let colors =
  ['#FF3300',
    '#32A0D3',
    '#32d3b6',
    '#d4bbe8'];


// represents a shape without a type
class Shape {
  constructor(position, width, height, color, rotation) {
    this.position = position;
    this.rotation = rotation;
    this.width = width;
    this.height = height;
    this.color = color
    this.sizeUp = true;
  }


  // updates this shape for drawing
  update(speed) {
    this.updateSize(speed);
    this.updateRotation(speed);
  }

  // updates the size of the shape with this speed
  updateSize(speed) {
    // add/subtract this amount to each shape per frame
    let scale = 0.5;
    // switch the sizing every 20 frames
    if (frameCount % 20 - (speed * 400) === 0) {
      this.toggleSizeUp();
    }

    // add or subtract depending on the state
    if (this.sizeUp === true) {
      this.width += scale;
      this.height += scale;
    } else {
      this.width -= scale;
      this.height -= scale;
    }
  }

  // updates the rotation of this shape with a given speed
  updateRotation(speed) {
    if (this.collide()) {
      this.rotation += 0.1;
      this.rotation += speed;
    } else {
      this.rotation += 0.001;
      this.rotation += speed;
    }
  }

  // moves this shape (always called in classes that extend)
  translate() {
    fill(this.color + toHex(transparency));
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
  }

  // determines if the mouse is colliding with a square around this shape
  collide() {
    return mouseX > this.position.x - this.width / 2
      && mouseX < this.position.x + this.width / 2
      && mouseY > this.position.y - this.height / 2
      && mouseY < this.position.y + this.height / 2;
  }

  // switches the sizing mode
  toggleSizeUp() {
    this.sizeUp = !this.sizeUp;
  }
}

// represents a circle shape
class Circle extends Shape {
  constructor(position, radius, color, rotation) {
    super(position, radius, radius, color, rotation);
  }

  // draws this circle
  draw() {
    push();
    this.translate();
    circle(5, 5, this.width);
    pop();
  }
}

// represents a rectangle shape
class Rectangle extends Shape {
  constructor(position, width, height, color, rotation) {
    super(position, width, height, color, rotation);
  }

  // draws this rectangle
  draw() {
    push();
    super.translate();
    rect(0, 0, this.width, this.height);
    pop();
  }


}

// represents a square shape that is a rectangle
class Square extends Rectangle {
  constructor(position, size, color, rotation) {
    super(position, size, size, color, rotation);
  }
}

// represents a triangle shape
class Triangle extends Shape {
  constructor(position, width, height, color, rotation) {
    super(position, width, height, color, rotation);
  }

  // draws this triangle
  draw() {
    push();
    this.translate();
    triangle(
      -1 * this.width / 2, this.height / 2,
      0, -1 * this.height / 2,
      this.width / 2, this.height / 2);
    pop();
  }
}

// represents a button that can be clicked and have its color changed
class Button extends Shape {
  constructor(x, y, width, height, color) {
    super(new CartPt(x, y), width, height, color, 0);
  }

  // draws this button
  draw() {
    push();
    this.translate();
    rect(0, 0, this.width, this.height, 10, 10, 10, 10);
    pop();
  }

  // changes the color of this button (for hovering)
  changeColor(color) {
    this.color = color;
  }
}

// represents a piece of text
class Text {
  constructor(x, y, width, height, text, color, size) {
    this.position = new CartPt(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.text = text;
    this.size = size;
  }

  // draws this text
  draw() {
    push();
    fill(this.color + toHex(transparency));
    translate(this.position.x, this.position.y);
    textSize(this.size);
    text(this.text, 0, 0, this.width, this.height);
    pop();
  }
}

// represents a question that is a button with text on top of it
class Question extends Text {
  constructor(x, y, question, isCorrect, textSize) {
    super(x, y, 425, 70, question, '#FFFFFF', textSize);
    this.boxColor = '#444444';
    this.isCorrect = isCorrect;
  }

  // draws this question button and text
  draw() {
    new Button(this.position.x, this.position.y, 450, 70, this.boxColor).draw();
    super.draw();
  }

  // chagnes the color if the mouse is above this question
  hover() {
    if (this.collide()) {
      this.boxColor = '#222222';
    }
  }

  // determines if the mouse is above this button
  collide() {
    return mouseX > this.position.x - 225
      && mouseX < this.position.x + 225
      && mouseY > this.position.y - 35
      && mouseY < this.position.y + 35;
  }
}

// represents a point on the screen
class CartPt {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // returns the angle from this position to the middle of the scene
  angleToMiddle() {
    return atan2(
      Math.abs((height * 0.5) - this.y + 100),
      Math.abs((width * 0.5) - this.x + 100));
  }

  // returns the distance to the middle of the scene
  distToOrigin() {
    return 50;
  }

  // adds the given CartPt to this one
  set(other) {
    this.x = other.x;
    this.y = other.y;
  }
}
