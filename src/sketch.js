let mousePressedAt;
let mouseReleasedAt;
let whatIsHappening;
let drawables = [];
let diagrams;
let selectedDiagram;

function setup() {
  createCanvas(1600, 800);
  diagrams = new Diagrams();
  drawables.push(diagrams);
  addDiagrams();

  noLoop();
}

function addDiagrams(){
  for (i = 0; i < 3; i++){
    diagrams.addDiagram(i);
  }
}

function draw() {
  clear();

  for (const drawable of drawables){
    drawDrawable(drawable);
  }
  let rectangle;
  mouseAt = new Point(mouseX, mouseY);

  switch (whatIsHappening){
    case "New high state":
      let start = 
        new Point(
          selectedDiagram.xPositionStepsToPixels(
            selectedDiagram.xPositionPixelsToSteps(mousePressedAt.x)), 
          selectedDiagram.statesArea.p1.y);

      let end = 
        new Point(
          selectedDiagram.xPositionStepsToPixels(
            selectedDiagram.xPositionPixelsToSteps(mouseAt.x)), 
          selectedDiagram.statesArea.p2.y);

      rectangle = new Rectangle(start, end);
      rectangle.drawMeInColor(Colors.states);
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

  for (let diagram of diagrams.diagrams){
    if (diagram.mouseInStatesArea()){
      selectedDiagram = diagram;
      whatIsHappening = "New high state";
      break;
    }
  }

}

function mouseReleased() {
  noLoop();

  mouseReleasedAt = new Point(mouseX, mouseY);

  switch (whatIsHappening){
    case "New high state":
      let start_steps = 
        min(
          selectedDiagram.xPositionPixelsToSteps(mousePressedAt.x),
          selectedDiagram.xPositionPixelsToSteps(mouseReleasedAt.x));
      let length_steps = 
        abs(
          selectedDiagram.xPositionPixelsToSteps(mouseReleasedAt.x)
          - selectedDiagram.xPositionPixelsToSteps(mousePressedAt.x));
      
      if (length_steps > 0) {
        selectedDiagram.addHighState(
          new HighState(
            start_steps,
            length_steps,
            selectedDiagram));
      }
      break;
  }

  whatIsHappening = "";
  redraw();
}
