let mousePressedAt;
let mouseReleasedAt;
let whatIsHappening;
let colors;
let stuffToDraw = [];

function setup() {
  colors = new Colors();
  createCanvas(1600, 800);
  background(colors.background);

  noLoop();
}

function draw() {
  background(colors.background);

  for (const stuff of stuffToDraw){
    stuff.drawMe(colors);
  }

  switch (whatIsHappening){
    case "New rectangle":
      rectMode(CORNERS);
      rect(mousePressedAt.x, mousePressedAt.y, mouseX, mouseY);
      break;
  }
}

function mousePressed() {
  loop();
  whatIsHappening = "New rectangle";
  mousePressedAt = new Point(mouseX, mouseY);
}

function mouseReleased() {
  noLoop();

  whatIsHappening = "";
  mouseReleasedAt = new Point(mouseX, mouseY);
  
  let rectangle = new Rectangle(mousePressedAt, mouseReleasedAt);

  stuffToDraw.push(rectangle);
  redraw();
}
