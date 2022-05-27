let mousePressedAt;
let mouseReleasedAt;
let whatIsHappening;
let diagrams;
let selectedDiagram;
let selectedHighState;

function setup() {
  createCanvas(1600, 800);
  diagrams = new Diagrams();
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
  diagrams.drawMe();

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
  mousePressedAt = new Point(mouseX, mouseY);
  selectedDiagram = null;
  selectedHighState = null;

  diagramsLoop:
  for (let diagram of diagrams.diagrams){
    for (let highState of diagram.highStates){
      if (highState.isMouseOver()){
        selectedHighState = highState;
        whatIsHappening = "Selected high state";
        break diagramsLoop;
      }
    }
    if (diagram.mouseInStatesArea()){
      selectedDiagram = diagram;
      whatIsHappening = "New high state";
      loop();
      break diagramsLoop;
    }
  }

}

function mouseReleased() {
  mouseReleasedAt = new Point(mouseX, mouseY);

  switch (whatIsHappening){
    case "New high state":
      noLoop();
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
      redraw();
      break;
      case "Selected high state":
        if (selectedHighState.isMouseOver()){
          redraw();
          selectedHighState.drawMeInColor(Colors.selectedState);
        }
  }

  whatIsHappening = "";
}

function keyReleased(){
  switch (key){
    case 'x':
      if (selectedHighState){
        selectedHighState.diagram.removeHighState(selectedHighState);
        selectedHighState = null;
        redraw();
      }
      break;
  }
}
