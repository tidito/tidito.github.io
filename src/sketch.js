let mousePressedAt;
let mouseReleasedAt;
let _event;

function setup() {
  createCanvas(1600, 800);
  background(100);

  noLoop();
}

function draw() {
  switch (_event){
    case "New rectangle":
      rectMode(CORNERS);
      rect(mousePressedAt.x, mousePressedAt.y, mouseX, mouseY);
      break;
  }
}

function mousePressed(){
  loop();
  _event = "New rectangle";
  mousePressedAt = new Point(mouseX, mouseY);
  console.log("Mouse pressed at: " + mousePressedAt.x + " " + mousePressedAt.y);
}

function mouseReleased(){
  noLoop();
  _event = "";
  mouseReleasedAt = new Point(mouseX, mouseY);
  console.log("Mouse released at: " + mouseReleasedAt.x + " " + mouseReleasedAt.y);

  rectMode(CORNERS);
  rect(mousePressedAt.x, mousePressedAt.y, mouseReleasedAt.x, mouseReleasedAt.y);
}