let mousePressedAt;
let mouseReleasedAt;
let action = Actions.none;
let diagrams;
let selectedDiagram;
let selectedHighState;

function setup() {
  createCanvas(1600, 800);
  diagrams = new Diagrams();
  let restoredDiagrams = getItem(Names.storedDiagrams);

  if (!restoredDiagrams){
    addDiagrams();
  } else {
    diagrams.rebuild(restoredDiagrams);
  }

  noLoop();
}

function addDiagrams() {
  for (i = 0; i < 3; i++){
    diagrams.addDiagram(i);
  }
}

function draw() {
  clear();
  diagrams.drawMe();

  let rectangle;
  mouseAt = new Point(mouseX, mouseY);

  switch (action){
    case Actions.newHighState:
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

function mousePressed() {
  mousePressedAt = new Point(mouseX, mouseY);
  selectedDiagram = null;
  selectedHighState = null;

  action = Actions.none;

  for (let diagram of diagrams.diagrams){
    for (let highState of diagram.highStates){
      if (highState.isMouseOver()){
        selectedHighState = highState;
        action = Actions.selectHighState;
        break;
      }
    }
    if (diagram.mouseInStatesArea()){
      selectedDiagram = diagram;
      if (action == Actions.none){
        action = Actions.newHighState;
        loop();
      }
      break;
    }
  }
}

function mouseReleased() {
  mouseReleasedAt = new Point(mouseX, mouseY);

  switch (action){
    case Actions.newHighState:
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
      case Actions.selectHighState:
        if (selectedHighState.isMouseOver()){
          redraw();
          selectedHighState.drawMeInColor(Colors.selectedState);
        }
      break;
  }
  diagrams.storeData();
  action = Actions.none;
}

function keyReleased(){
  switch (key){
    case 'x':
      if (selectedHighState){
        selectedDiagram.removeHighState(selectedHighState);
        selectedHighState = null;
        redraw();
      }
      break;
    case 'c':
      diagrams = new Diagrams();
      addDiagrams();
      clearStorage();
      redraw();
      break;
  }
  diagrams.storeData();
}
