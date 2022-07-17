let mousePressedAt;
let mouseReleasedAt;
let action = Actions.none;
let project;
let selectedDiagram;
let selectedHighStates = [];
let selectedHighStatesDiagrams = [];
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
  
  selectedHighStates.forEach(state => state.drawMeInColor(Colors.selectedState));
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
  if ((keyIsPressed && keyCode === CONTROL) == false) {
    selectedHighStates = [];
    selectedHighStatesDiagrams = [];
  }

  action = Actions.none;

  for (let diagram of project.diagrams){
    for (let highState of diagram.highStates){
      if (highState.isMouseOver()){
        
        selectedHighStates.push(highState);
        selectedHighStatesDiagrams.push(diagram);
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
      if (selectedHighStates[selectedHighStates.length-1].isMouseOver()){
        redraw();
      } else {
        selectedHighStates = [];
        selectedHighStatesDiagrams = [];
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
    case '?':
      showShortcuts();
    break;
    case 'w':
      selectedHighStates.forEach(
        (state, i) => 
        state.changeLengthBy(1, selectedHighStatesDiagrams[i]));
    break;
    case 'W':
      selectedHighStates.forEach(
        (state, i) => 
        state.changeLengthBy(5, selectedHighStatesDiagrams[i]));
    break;

    case 's':
      indexesToRemove = [];
      selectedHighStates.forEach(
        (state, i) => {
          if (state.length_steps > 1){
            state.changeLengthBy(-1, selectedHighStatesDiagrams[i]);
          } else {
            selectedHighStatesDiagrams[i].removeHighState(selectedHighStates[i]);
            indexesToRemove.push(i);
          }
        }
      );
      for (let i = indexesToRemove.length-1; i>= 0; i--){
        selectedHighStates.splice(indexesToRemove[i], 1);
        selectedHighStatesDiagrams.splice(indexesToRemove[i], 1);
        redraw();
      };
    break;
    case 'S':
      indexesToRemove = [];
      selectedHighStates.forEach(
        (state, i) => {
          if (state.length_steps > 5){
            state.changeLengthBy(-5, selectedHighStatesDiagrams[i]);
          } else {
            selectedHighStatesDiagrams[i].removeHighState(selectedHighStates[i]);
            indexesToRemove.push(i);
          }
        }
      );
      for (let i = indexesToRemove.length-1; i>= 0; i--){
        selectedHighStates.splice(indexesToRemove[i], 1);
        selectedHighStatesDiagrams.splice(indexesToRemove[i], 1);
        redraw();
      };
    break;

    case 'a':
      selectedHighStates.forEach(
        (state, i) => 
        state.moveBy(-1, selectedHighStatesDiagrams[i]));
    break;
    case 'A':
      selectedHighStates.forEach(
        (state, i) => 
        state.moveBy(-5, selectedHighStatesDiagrams[i]));
    break;

    case 'd':
      selectedHighStates.forEach(
        (state, i) => 
        state.moveBy(1, selectedHighStatesDiagrams[i]));
    break;
    case 'D':
      selectedHighStates.forEach(
        (state, i) => 
        state.moveBy(5, selectedHighStatesDiagrams[i]));
    break;

    case 'x':
      removeSelectedHighStates();
      break;
    }

  switch (keyCode){
    case ENTER:
      if (selectedDiagram && action == Actions.setDiagramName){
        selectedDiagram.setName(nameInput.value());

        action = Actions.none;
        selectedHighStates = null;
        selectedDiagram = null;
        redraw();
      } 
      break;
      case ESCAPE:
        action = Actions.none;
        selectedHighStates = null;
        selectedDiagram = null;
        redraw();
      break;
    }
  project.storeData();
}

function windowResized(){
  project.setTicks(project.ticks)
  redraw();
}

function removeSelectedHighStates() {
  highStatesSelectionCorrect = 
    selectedHighStates.length > 0 
    && selectedHighStates.length == selectedHighStatesDiagrams.length;

  if (highStatesSelectionCorrect) {
    for (let i=0; i<selectedHighStates.length; i++){
      selectedHighStatesDiagrams[i].removeHighState(selectedHighStates[i]);
    }
    
    selectedHighStates = [];
    selectedHighStatesDiagrams = [];
    redraw();
  }
}

function clearProject(){
  if (window.confirm("Do you really want to clear all?")){
	  project = new Project();
  	addDiagrams();
  	clearStorage();
  	redraw();
  }
}

function displayDiagramNameInput(diagram){
  nameInput = createInput();
  nameInput.size(Dimensions.nameWidth_px, Dimensions.nameInputHeight_px);
  nameInput.position(
    diagram.nameArea.p1.x, 
    0.5 * (diagram.nameArea.p1.y + diagram.nameArea.p2.y -Dimensions.nameInputHeight_px),
    'absolute');
  nameInput.value(diagram.name);
}

function displayProjectNameInput(menuDiv){
  let nameInput = createInput();
  nameInput.size(menuDiv.width - 2*Dimensions.nameWidth_px, Dimensions.nameInputHeight_px);
  nameInput.position(
    menuDiv.x + Dimensions.margin_px, 
    menuDiv.y + Dimensions.margin_px + 90,
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
  menuDiv.position(Dimensions.menuX_px, Dimensions.menuY_px);
  menuDiv.size(Dimensions.leftMenuWidth_px, windowHeight-(2*Dimensions.margin_px));
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
  nameDiv.style('margin', Dimensions.margin_px);
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
  ticksDiv.style('margin', Dimensions.margin_px);

  let ticksParagraph = createP('Ticks:');
  ticksParagraph.parent(ticksDiv);

  ticksEditors = ['-5', '-1', '+1', '+5'];
  let button;
  
  for (let i = 0; i < ticksEditors.length; i++) {
    button = createButton(ticksEditors[i]);
    button.parent(ticksDiv);

    Styles.setButtonStyle(button);
    button.style('margin-right', Dimensions.margin_px*0.5);
    button.size(4*Dimensions.margin_px, 3*Dimensions.margin_px);


    button.mouseReleased(function () {
      project.setTicks(project.ticks + parseInt(ticksEditors[i]));
    });
  }
}

function drawMenuAddDiagram(menuDiv) {
  let button = createButton('Add diagram');
  button.parent(menuDiv);
  Styles.setButtonStyle(button);
  button.style('margin', Dimensions.margin_px);

  button.mouseReleased(function () {
    project.addDiagram(project.diagrams.length);
  });
}

function drawMenuImportExport(menuDiv){
  let importExportDiv = createDiv();
  importExportDiv.parent(menuDiv);
  importExportDiv.style('margin', Dimensions.margin_px);

  let fileInput = createFileInput(importProject);
  fileInput.parent(importExportDiv);
  fileInput.style('display', 'none');

  let inputId = 'inputId';
  fileInput.id(inputId);

  let importButton = createButton('Import');
  importButton.parent(importExportDiv);
  Styles.setButtonStyle(importButton);
  importButton.style('margin-right', Dimensions.margin_px*0.5);

  importButton.mouseReleased(function() {
    fileElem = document.getElementById(inputId);
    fileElem.click();
  });

  let exportButton = createButton('Export');
  exportButton.parent(importExportDiv);
  Styles.setButtonStyle(exportButton);
  exportButton.style('margin-right', Dimensions.margin_px*0.5);

  exportButton.mouseReleased(exportProject);
}

function drawMenuClearAll(menuDiv) {
  let button = createButton('Clear all');
  button.parent(menuDiv);
  Styles.setButtonStyle(button);

  button.style('position', 'absolute');
  button.style('bottom', Dimensions.margin_px);
  button.style('left', Dimensions.margin_px);

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

function diagramMaxWidth_px(){
  let maxWidth_px = 
    containerWidth_px()
    - (3*Dimensions.margin_px
      + Dimensions.nameWidth_px);
  return maxWidth_px;
}

function containerWidth_px(){
  let width_px = 
    windowWidth
    - (4*Dimensions.margin_px
      + Dimensions.leftMenuWidth_px
      + Dimensions.rightMenuWidth_px
      + Dimensions.containerHeight_px);

  return width_px; 
} 