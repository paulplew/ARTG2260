class World {

  constructor() {
    this.previousState = -1;
    this.currentState = 0
    this.questionNumber = 0;
    this.score = 0;
    this.correct = false;
  }

  next() {
    if (this.currentState === 1) {
      this.set(4);
      if (this.questionNumber < numberOfQuestions - 1) {
        this.previousState = this.currentState;
        this.currentState = 4;
      }
    } else if (this.currentState === 4) {
      if (this.questionNumber < numberOfQuestions - 1) {
        this.correct = false;
        this.questionNumber += 1;
        this.set(1);
      } else {
        this.set(2);
      }
    } else {
      this.previousState = this.currentState;
      this.currentState += 1;
    }
  }

  set(state) {
    this.previousState = this.currentState;
    this.currentState = state;
  }

  draw() {
    switch (this.currentState) {
      case 0:
        this.drawStart();
        break;
      case 1:
        this.drawPlay();
        break;
      case 2:
        this.drawEnd();
        break;
      case 4:
        this.answered();
        break;
      default:
        this.currentState = 0;
        this.score = 0;
        this.questionNumber = 0;
        setup();
        break;
    }
  }

  click() {
    switch (this.currentState) {
      case 0:
        this.clickStart();
        break;
      case 1:
        this.clickPlay();
        break;
      case 2:
        this.clickAnywhere();
        break;
      case 4:
        this.clickAnywhere();
        break;
    }
  }

  drawStart() {
    let titleRectangle = new Button(width / 2, height / 4, 350, 100, '#333333', 0);
    let startButton = new Button(width / 2, height / 2, 200, 75, '#444444');
    // let highscoresButton = new Button(width / 2, (2 * height / 4) + 100, 200, 75, '#444444');

    let title = new Text(width / 2, height / 4, 350, 100, "Trivia", '#FFFFFF', 70);
    let start = new Text(width / 2, height / 2, 200, 75, "Start", '#FFFFFF', 30);
    // let highscore = new Text(width / 2, (height / 2) + 100, 200, 75, "Highscores", '#FFFFFF', 25);

    if (startButton.collide()) {
      startButton.changeColor('#222222');
      // } else if (highscoresButton.collide()) {
      // highscoresButton.changeColor('#222222');
    }

    titleRectangle.draw();
    title.draw();

    startButton.draw();
    start.draw();

    // highscoresButton.draw();
    // highscore.draw();
  }

  clickStart() {
    let startButton = new Button(width / 2, height / 2, 200, 75, '#444444');
    // let highscoresButton = new Button(width / 2, (2 * height / 4) + 100, 200, 75, '#444444');

    if (startButton.collide()) {
      fadeOut = true;
      // } else if (highscoresButton.collide()) {
      //   this.set(3);
    }
  }

  drawPlay() {
    let items = [];
    items.push(new Button(width / 2, height / 2, 500, 550, '#777777'));
    items.push(new Button(width / 2, height / 2 - 230, 580, 150, '#333333'));
    items.push(new Text(width / 2, height / 2 - 230, 550, 150, json.questions[this.questionNumber]['question'], '#FFFFFF', 30));

    let questions = [];
    questions.push(new Question(width / 2, height / 2 - 80,
      json.questions[this.questionNumber].answers[0].text,
      json.questions[this.questionNumber].answers[0].isCorrect, 25));
    questions.push(new Question(width / 2, height / 2 + height / 8 - 80,
      json.questions[this.questionNumber].answers[1].text,
      json.questions[this.questionNumber].answers[1].isCorrect, 25));
    questions.push(new Question(width / 2, height / 2 + (2 * height / 8) - 80,
      json.questions[this.questionNumber].answers[2].text,
      json.questions[this.questionNumber].answers[2].isCorrect, 25));
    questions.push(new Question(width / 2, height / 2 + (3 * height / 8) - 80,
      json.questions[this.questionNumber].answers[3].text,
      json.questions[this.questionNumber].answers[3].isCorrect, 25));

    for (let i = 0; i < items.length; i++) {
      items[i].draw();
    }

    for (let i = 0; i < questions.length; i++) {
      questions[i].hover();
      questions[i].draw();
    }
  }

  clickPlay() {
    let questions = [];
    questions.push(new Question(width / 2, height / 2 - 80,
      json.questions[this.questionNumber].answers[0].text,
      json.questions[this.questionNumber].answers[0].isCorrect, 30));
    questions.push(new Question(width / 2, height / 2 + height / 8 - 80,
      json.questions[this.questionNumber].answers[1].text,
      json.questions[this.questionNumber].answers[1].isCorrect, 30));
    questions.push(new Question(width / 2, height / 2 + (2 * height / 8) - 80,
      json.questions[this.questionNumber].answers[2].text,
      json.questions[this.questionNumber].answers[2].isCorrect, 30));
    questions.push(new Question(width / 2, height / 2 + (3 * height / 8) - 80,
      json.questions[this.questionNumber].answers[3].text,
      json.questions[this.questionNumber].answers[3].isCorrect, 30));

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].collide()) {
        if (questions[i].isCorrect) {
          this.score += 100;
          this.correct = true;
        }
        fadeOut = true;
        break;
      }
    }
  }

  drawEnd() {
    new Button(width / 2, height / 2, 500, 550, '#777777').draw();
    new Button(width / 2, height / 2, 450, 500, '#444444').draw();
    new Text(width / 2, height / 2, 425, 300, 'Congratulations,' +
      ' you got ' + this.score.toString() + "/" + numberOfQuestions * 100 + " possible points!\n\nClick anywhere to restart.", '#FFFFFF', 30).draw();
  }

  clickAnywhere() {
    fadeOut = true;
  }

  answered() {
    new Button(width / 2, height / 2, 500, 550, '#777777').draw();
    new Text(width / 2, (height / 2) + 25, 425, 400, json.questions[this.questionNumber].feedback, "#FFFFFF", 25).draw();


    if (this.correct) {
      new Text(width / 2, height / 4, 425, 100, "Correct", '#30F330', 50).draw();
    } else {
      new Text(width / 2, height / 4, 425, 100, "Wrong", '#FF3030', 50).draw();
    }
  }

  drawBackground() {
    background('#00000030');
    if (this.currentState === 2) {
      drawShapes(0.1);
    } else {
      drawShapes(0);
    }
  }
}


