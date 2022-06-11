class Project{
  constructor() {
    this.name = 'Insert name here';
    this.diagrams = [];

    this.ticks = 60;
    this.stepSize = (Dimensions.diagramMaxWidth / this.ticks);
  }

  rebuild(restoredProject){
    this.name = restoredProject.name;
    this.ticks = restoredProject.ticks;
    this.stepSize = restoredProject.stepSize;
    this.diagrams = [];
    
    for (let restoredDiagram of restoredProject.diagrams){
      let diagram = new Diagram(0, this)
      diagram.rebuild(restoredDiagram);

      this.diagrams.push(diagram);
    }
  }

  setTicks(ticks){
    this.ticks = ticks;
    this.stepSize = (Dimensions.diagramMaxWidth / this.ticks);

    for (let i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].updateTicks(this);
    }
    redraw();
  }

  setName(name){
    this.name = name;
  }

  addDiagram(number) {
    this.diagrams.push(new Diagram(number, this));
    redraw();
  }

  removeDiagram(index, project) {
    this.diagrams.splice(index, 1);
    for (let i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].setNumber(i, project);
    }
  }

  swapDiagrams(index1, index2, project){
    [project.diagrams[index1], project.diagrams[index2]] = 
      [project.diagrams[index2], project.diagrams[index1]];

      this.diagrams[index1].setNumber(index1, project);
      this.diagrams[index2].setNumber(index2, project);
  }

  drawMe() {
    for (let i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].drawMe(i);
      
      let buttonSideLength_px = (
        (this.diagrams[i].area.p2.y - this.diagrams[i].area.p1.y
          - 2 * Dimensions.margin)
        / 3.0);

      this.addRemoveButton(i, buttonSideLength_px);

      if (i > 0){
        let moveUpButton = createButton('^');
        Styles.setButtonStyle(moveUpButton);
        moveUpButton.size(buttonSideLength_px, buttonSideLength_px);
        moveUpButton.position(
          this.diagrams[i].area.p2.x + Dimensions.margin,
          this.diagrams[i].area.p1.y
        );
        
        moveUpButton.style('padding', 0);
        let project = this;
        moveUpButton.mouseReleased(
          function () {
            project.swapDiagrams(i-1, i, project);
            redraw();
          }
        );
      }
      if (i < this.diagrams.length-1){
        let moveDownButton = createButton('v');
        Styles.setButtonStyle(moveDownButton);
        moveDownButton.size(buttonSideLength_px, buttonSideLength_px);
        moveDownButton.position(
          this.diagrams[i].area.p2.x + Dimensions.margin,
          this.diagrams[i].area.p1.y + 2*(buttonSideLength_px + Dimensions.margin)
        );
        
        moveDownButton.style('padding', 0);
        let project = this;
        moveDownButton.mouseReleased(
          function () {
            project.swapDiagrams(i, i+1, project);
            redraw();
          }
        );
      }
    }
  }

  addRemoveButton(i, sideLength_px) {
    let removeButton = createButton('X');
    Styles.setButtonStyle(removeButton);
    removeButton.size(sideLength_px, sideLength_px);
    removeButton.position(
      this.diagrams[i].area.p2.x + Dimensions.margin,
      this.diagrams[i].area.p1.y + (sideLength_px + Dimensions.margin)
    );

    removeButton.style('padding', 0);
    let project = this;
    removeButton.mouseReleased(
      function () {
        project.removeDiagram(i, project);
        redraw();
      }
    );
  }

  storeData() {
    storeItem(Names.storedProject, this);
  }
}