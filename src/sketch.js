let mousePressedAt;
let mouseReleasedAt;
let whatIsHappening;
let drawables = [];
let diagrams;

function setup() {
  createCanvas(1600, 800);
  background(Colors.background);
  diagrams = new Diagrams();
  drawables.push(diagrams);
  addDiagrams();
  

  noLoop();
}

function addDiagrams(){
  for (i = 0; i < 3; i++){
    diagrams.addElement();
  }
  console.log(diagrams.diagrams)
}

function draw() {
  background(Colors.background);

  for (const drawable of drawables){
    drawDrawable(drawable);
  }

  switch (whatIsHappening){
    case "New rectangle":
      mouseAt = new Point(mouseX, mouseY);
      let rectangle = new Rectangle(mousePressedAt, mouseAt);
      rectangle.drawMe();

      break;
  }
}

function drawDrawable(drawable){
  if (Array.isArray(drawable)) {
    for (const element of drawable) drawDrawable(element);
  } else {
    drawable.drawMe();
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

  drawables.push(rectangle);
  redraw();
}
