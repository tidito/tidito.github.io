let mousePressedAt;
let mouseReleasedAt;
let action = Actions.none;
let diagrams;
let selectedDiagram;
let selectedHighState;
let nameInput;

function setup() {
  canvas = createCanvas(1600, 800);
  canvas.position(0,0);

  diagrams = new Diagrams();
  let restoredDiagrams = getItem(Names.storedDiagrams);

  if (!restoredDiagrams){
    addDiagrams();
  } else {
    try {
      diagrams.rebuild(restoredDiagrams);
    } catch {
      diagrams = new Diagrams();
      addDiagrams();
    }
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
  removeElements();
  diagrams.drawMe();
  drawMenu();

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
  if (selectedHighState){
    selectedHighState.drawMeInColor(Colors.selectedState);
  }
}

function mousePressed() {
  if (action == Actions.setName){
    if (selectedDiagram.mouseInNameArea()){
      return;
    } else {
      redraw();
    }
  }
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
    } else if (diagram.mouseInNameArea()) {
      if (action == Actions.none){
        action = Actions.setName;
        selectedDiagram = diagram;
        displayNameInput(diagram);
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
      action = Actions.none;
    break;
    case Actions.selectHighState:
      if (selectedHighState.isMouseOver()){
        redraw();
      } else {
        selectedHighState = null;
      }
    action = Actions.none;
    break;
    case Actions.setName:
      nameInput.elt.focus();
      nameInput.elt.select();
    break;
  }
  diagrams.storeData();
}

function keyReleased(){
  switch (key){
    case 'w':
      if (!selectedHighState) break;
      selectedHighState.changeLengthBy(1, selectedDiagram);
    break;
    case 's':
      if (!selectedHighState) break;
      if (selectedHighState.length_steps > 1){
        selectedHighState.changeLengthBy(-1, selectedDiagram);
      } else {
        removeSelectedHighState();
      }
    break;

    case 'a':
      if (!selectedHighState) break;
      selectedHighState.moveBy(-1, selectedDiagram);
    break;
    case 'd':
      if (!selectedHighState) break;
      selectedHighState.moveBy(1, selectedDiagram);
    break;

    case 'x':
      if (!selectedHighState) break;
      removeSelectedHighState();
      break;
    }

  switch (keyCode){
    case ENTER:
      if (selectedDiagram && action == Actions.setName){
        selectedDiagram.setName(nameInput.value());

        action = Actions.none;
        selectedHighState = null;
        selectedDiagram = null;
        redraw();
      }
      break;
      case ESCAPE:
        action = Actions.none;
        selectedHighState = null;
        selectedDiagram = null;
        redraw();
      break;
    }
  diagrams.storeData();
}

function windowResized(){
  redraw();
}

function removeSelectedHighState() {
  if (selectedHighState && selectedDiagram) {
    selectedDiagram.removeHighState(selectedHighState);
    selectedHighState = null;
    redraw();
  }
}

function clearDiagrams(){
  diagrams = new Diagrams();
  addDiagrams();
  clearStorage();
  redraw();
}

function displayNameInput(diagram){
  nameInput = createInput();
  nameInput.size(Dimensions.nameWidth, Dimensions.nameInputHeight);
  nameInput.position(
    diagram.nameArea.p1.x, 
    0.5 * (diagram.nameArea.p1.y + diagram.nameArea.p2.y -Dimensions.nameInputHeight),
    'absolute');
  nameInput.value(diagram.name);
}

function drawMenu(){
  rectMode(CORNER);
  let menuDiv = createDiv();
  menuDiv.position(Dimensions.menuX, Dimensions.menuY);
  menuDiv.size(Dimensions.menuWidth, windowHeight-(2*Dimensions.margin));
  menuDiv.style('color', Colors.ticks);
  menuDiv.style('font-family', Dimensions.nameFont);
  menuDiv.style('font-weight', 'bold');
  menuDiv.style('background-color', Colors.container)

  drawMenuTicks(menuDiv);
  drawMenuClearAll(menuDiv);
}

function drawMenuTicks(menuDiv) {
  let ticksDiv = createDiv();
  ticksDiv.parent(menuDiv);
  ticksDiv.position(Dimensions.margin, Dimensions.margin);

  let ticksParagraph = createP('Ticks:');
  ticksParagraph.parent(ticksDiv);
  ticksParagraph.style('margin-top', 0);

  ticksEditors = ['-5', '-1', '+1', '+5'];
  let button;
  
  for (let i = 0; i < ticksEditors.length; i++) {
    button = createButton(ticksEditors[i]);
    button.parent(ticksDiv);

    button.style('color', Colors.ticks);
    button.style('font-family', Dimensions.nameFont);
    button.style('font-weight', 'bold');
    button.style('background-color', Colors.states);
    button.style('border-color', '#ffffff00');
    button.style('margin-right', Dimensions.margin*0.5);
    button.size(4*Dimensions.margin,3*Dimensions.margin);


    button.mouseReleased(function () {
      diagrams.setTicks(diagrams.ticks + parseInt(ticksEditors[i]));
    });
  }
}

function drawMenuClearAll(menuDiv) {
  let button = createButton('Clear all');
  button.parent(menuDiv);

  button.style('color', Colors.ticks);
  button.style('font-family', Dimensions.nameFont);
  button.style('font-weight', 'bold');
  button.style('background-color', Colors.states);
  button.style('border-color', '#ffffff00');

  button.style('position', 'absolute');
  button.style('bottom', Dimensions.margin);
  button.style('left', Dimensions.margin);

  button.mouseReleased(clearDiagrams);
}

