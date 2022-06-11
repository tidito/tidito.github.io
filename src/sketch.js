let mousePressedAt;
let mouseReleasedAt;
let action = Actions.none;
let project;
let selectedDiagram;
let selectedHighState;
let nameInput;

function setup() {
  canvas = 
    createCanvas(
      windowWidth, 
      windowHeight);
  canvas.position(0,0);
  canvas.drop(importProject);

  project = new Project();
  let restoredProject = getItem(Names.storedProject);

  if (!restoredProject){
    addDiagrams();
  } else {
    try {
      project.rebuild(restoredProject);
    } catch {
      project = new Project();
      addDiagrams();
    }
  }

  noLoop();
}

function addDiagrams() {
  for (i = 0; i < 3; i++){
    project.addDiagram(i);
  }
}

function draw() {
  clear();
  removeElements();
  project.drawMe();
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
  if (action == Actions.setDiagramName){
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

  for (let diagram of project.diagrams){
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
        action = Actions.setDiagramName;
        selectedDiagram = diagram;
        displayDiagramNameInput(diagram);
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
    case Actions.setDiagramName:
      nameInput.elt.focus();
      nameInput.elt.select();
    break;
  }
  project.storeData();
}

function keyReleased(){
  switch (key){
    case 'w':
      if (!selectedHighState) break;
      selectedHighState.changeLengthBy(1, selectedDiagram);
    break;
    case 'W':
      if (!selectedHighState) break;
      selectedHighState.changeLengthBy(5, selectedDiagram);
    break;

    case 's':
      if (!selectedHighState) break;
      if (selectedHighState.length_steps > 1){
        selectedHighState.changeLengthBy(-1, selectedDiagram);
      } else {
        removeSelectedHighState();
      }
    break;
    case 'S':
      if (!selectedHighState) break;
      if (selectedHighState.length_steps > 5){
        selectedHighState.changeLengthBy(-5, selectedDiagram);
      } else {
        removeSelectedHighState();
      }
    break;

    case 'a':
      if (!selectedHighState) break;
      selectedHighState.moveBy(-1, selectedDiagram);
    break;
    case 'A':
      if (!selectedHighState) break;
      selectedHighState.moveBy(-5, selectedDiagram);
    break;

    case 'd':
      if (!selectedHighState) break;
      selectedHighState.moveBy(1, selectedDiagram);
    break;
    case 'D':
      if (!selectedHighState) break;
      selectedHighState.moveBy(5, selectedDiagram);
    break;

    case 'x':
      if (!selectedHighState) break;
      removeSelectedHighState();
      break;
    }

  switch (keyCode){
    case ENTER:
      if (selectedDiagram && action == Actions.setDiagramName){
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
  project.storeData();
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

function clearProject(){
  project = new Project();
  addDiagrams();
  clearStorage();
  redraw();
}

function displayDiagramNameInput(diagram){
  nameInput = createInput();
  nameInput.size(Dimensions.nameWidth, Dimensions.nameInputHeight);
  nameInput.position(
    diagram.nameArea.p1.x, 
    0.5 * (diagram.nameArea.p1.y + diagram.nameArea.p2.y -Dimensions.nameInputHeight),
    'absolute');
  nameInput.value(diagram.name);
}

function displayProjectNameInput(menuDiv){
  let nameInput = createInput();
  nameInput.size(menuDiv.width - 2*Dimensions.nameWidth, Dimensions.nameInputHeight);
  nameInput.position(
    menuDiv.x + Dimensions.margin, 
    menuDiv.y + Dimensions.margin + 90,
    'absolute');
    nameInput.value(project.name);

    nameInput.changed(
    function() {
      project.setName(nameInput.value());
      redraw();
    }
  );

  nameInput.elt.select();
  nameInput.elt.focus();
}

function drawMenu(){
  let menuDiv = createDiv();
  menuDiv.position(Dimensions.menuX, Dimensions.menuY);
  menuDiv.size(Dimensions.menuWidth, windowHeight-(2*Dimensions.margin));
  menuDiv.style('color', Colors.ticks);
  menuDiv.style('font-family', Dimensions.nameFont);
  menuDiv.style('font-weight', 'bold');
  menuDiv.style('background-color', Colors.container)
  
  menuDiv.drop(importProject);

  drawMenuLogo(menuDiv);
  drawMenuName(menuDiv);
  drawMenuTicks(menuDiv);
  drawMenuAddDiagram(menuDiv);
  drawMenuClearAll(menuDiv);
  drawMenuImportExport(menuDiv);
}

function drawMenuLogo(menuDiv){
  let logoDiv = createDiv();
  logoDiv.parent(menuDiv);
  logoDiv.id('logoDiv');
  let image = document.createElement('img');
  image.src = 'resources/tidito_header.svg'
  
  document.getElementById(logoDiv.id()).appendChild(image);

}

function drawMenuName(menuDiv) {
  let nameDiv = createDiv();
  nameDiv.parent(menuDiv);
  nameDiv.style('margin', Dimensions.margin);
  nameDiv.style('border', 'white');
  nameDiv.style('border-top-style', 'solid');
  nameDiv.style('border-bottom-style', 'solid');
  nameDiv.style('border-width', 1);

  let nameParagraph = createP(project.name);
  nameParagraph.parent(nameDiv);

  nameDiv.mouseReleased(
    function() {
      displayProjectNameInput(menuDiv);
      action = Actions.setProjectName;
    }
  )
}

function drawMenuTicks(menuDiv) {
  let ticksDiv = createDiv();
  ticksDiv.parent(menuDiv);
  ticksDiv.style('margin', Dimensions.margin);

  let ticksParagraph = createP('Ticks:');
  ticksParagraph.parent(ticksDiv);

  ticksEditors = ['-5', '-1', '+1', '+5'];
  let button;
  
  for (let i = 0; i < ticksEditors.length; i++) {
    button = createButton(ticksEditors[i]);
    button.parent(ticksDiv);

    Styles.setButtonStyle(button);
    button.style('margin-right', Dimensions.margin*0.5);
    button.size(4*Dimensions.margin, 3*Dimensions.margin);


    button.mouseReleased(function () {
      project.setTicks(project.ticks + parseInt(ticksEditors[i]));
    });
  }
}

function drawMenuAddDiagram(menuDiv) {
  let button = createButton('Add diagram');
  button.parent(menuDiv);
  Styles.setButtonStyle(button);
  button.style('margin', Dimensions.margin);

  button.mouseReleased(function () {
    project.addDiagram(project.diagrams.length);
  });
}

function drawMenuImportExport(menuDiv){
  let importExportDiv = createDiv();
  importExportDiv.parent(menuDiv);
  importExportDiv.style('margin', Dimensions.margin);

  let fileInput = createFileInput(importProject);
  fileInput.parent(importExportDiv);
  fileInput.style('display', 'none');

  let inputId = 'inputId';
  fileInput.id(inputId);

  let importButton = createButton('Import');
  importButton.parent(importExportDiv);
  Styles.setButtonStyle(importButton);
  importButton.style('margin-right', Dimensions.margin*0.5);

  importButton.mouseReleased(function() {
    fileElem = document.getElementById(inputId);
    fileElem.click();
  });

  let exportButton = createButton('Export');
  exportButton.parent(importExportDiv);
  Styles.setButtonStyle(exportButton);
  exportButton.style('margin-right', Dimensions.margin*0.5);

  exportButton.mouseReleased(exportProject);
}

function drawMenuClearAll(menuDiv) {
  let button = createButton('Clear all');
  button.parent(menuDiv);
  Styles.setButtonStyle(button);

  button.style('position', 'absolute');
  button.style('bottom', Dimensions.margin);
  button.style('left', Dimensions.margin);

  button.mouseReleased(clearProject);
}

function exportProject(){
  if (project){
    saveJSON(project, 'TiDiTo_' + project.name);
  }
}

function importProject(file){
  if (file.subtype == 'json'){
    let restoredProject = file.data;
  
    if (!restoredProject){
      addDiagrams();
    } else {
      try {
        project.rebuild(restoredProject);
      } catch {
        console.log('Failed to rebuild project');
        project = new Project();
        addDiagrams();
      }
    }
    redraw();
  } 
}
