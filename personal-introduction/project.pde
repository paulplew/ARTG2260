/*  Project 1: Personal Introduction
 *    Paul Plew
 */

//Variables
int activeFact = 0;
String factString = ""; // displays this text on the screen
float fillR; // used for color changing BG
float fillG;
float fillB;
boolean isImage; // used in logic for displaying images

// Images
PImage img; // placeholder for image
PImage meImg; 
PImage mountainsImg;
PImage familyImg;
PImage charlesImg;
PImage lincolnImg;
PImage alienImg;

// used for text box
int boxWidth = 740;
int boxHeight = 390;


// setup function
void setup() {
  size(800, 450); //scaled up
  textSize(36);
  textAlign(LEFT, CENTER); 
  fill(50);
  
  //Images
  meImg = loadImage("pic-of-me.jpg");
  mountainsImg = loadImage("beautiful-mountains.jpg");
  familyImg = loadImage("family.jpg");
  charlesImg = loadImage("charles.jpg");
  lincolnImg = loadImage("lincoln.jpg");
  alienImg = loadImage("alien.jpg");
}

// draw function
void draw() {
  background(200);
  calculateBG(); // call to calculageBG will produce a new Background
  fill(20); // fill color for Text
  isImage = false;
  switch(activeFact) {
    case 0:
      factString = "Hi, my name is P.T. Plew";
      break;
    case 1:
      factString = "I am a full two decades old (20)";
      break;
    case 2:
      img = meImg;
      factString = "This is me";
      isImage = true;
      break;
    case 3:
      factString = "standing on a log.";
      isImage = true;
      break;
    case 4:
      factString = "1 Year ago I transferred to Northeastern to pursue a combined degree in Computer Science and Design.";
      break;
    case 5:
      factString = "I'm from Los Angeles,\nand can we agree that 70\u00B0 winters are the best.";
      break;
    case 6:
      img = mountainsImg;
      factString = "I spend my freetime in the outdoors";
      isImage = true;
      break;
    case 7:
      factString = "Here is a picture I took high up in the Sierra's";
      isImage = true;
      break;
    case 8:
      factString = "I miss it.";
      isImage = true;
      break;
    case 9:
      factString = "But I miss my sister, my brother in law, and my two wonderful parents even more!";
      break;
    case 10:
      img = familyImg;
      factString = "Here we are";
      isImage = true;
      break;
    case 11:
      factString = "We are a tight knit family.";
      isImage = true;
      break;
    case 12:
      factString = "An introduction isn't complete without introducing the pets.\nWe have 4 furry friends!";
      break;
    case 13:
      img = charlesImg;
      factString = "First up is Charles";
      isImage = true;
      break;
    case 14:
      img = lincolnImg;
      factString = "Second is Lincoln";
      isImage = true;
      break;
    case 15:
      img = alienImg; 
      factString = "Then kita our cat and stone: the alien Chihuahua";
      isImage = true;
      break;
    default:
      factString = "Fin.";
      break;
  }
  
  show(); //displays the image and text or just text
}


// used to show the text and image
void show() {
  if (!isImage) { //if there isnt an image
    text(factString, 45, 45, boxWidth - 30, boxHeight - 30);
  }
  else { //if there is an image
    image(img, 50, ((height / 2) - (img.height / 2)));
    text(factString, (60 + img.width), 30, width - img.width - 80, boxHeight);
  }
}

// creates a new fill for the rect() in draw()
void calculateBG() {
  fillR = map(mouseX, 0, width, 144, 193); //map mouseX to chage the R value
  fillG = 250; // static G value
  fillB = map(mouseY, 0, height, 142, 244); //map mouseY to change the B value
  background(fillR, fillG, fillB); //Background with the previously calculated colors.
}


// adds one if the activeFact is less than 15 otherwise atciveFact is reset
void mouseClicked() {
  if (activeFact <= 15) {
    activeFact++;
  }
  else {
    activeFact = 0;
  }
}
