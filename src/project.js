class Project{
  constructor() {
    this.name = 'Insert name here';
    this.diagrams = [];

    this.ticks = 60;
    this.stepSize_px = (diagramMaxWidth_px() / this.ticks);
  }

  rebuild(restoredProject){
    this.name = restoredProject.name;
    this.ticks = restoredProject.ticks;
    this.stepSize_px = (diagramMaxWidth_px() / this.ticks);
    this.diagrams = [];
    
    for (let restoredDiagram of restoredProject.diagrams){
      let diagram = new Diagram(0, this)
      diagram.rebuild(restoredDiagram);

      this.diagrams.push(diagram);
    }
  }

  setTicks(ticks){
    this.ticks = ticks;
    this.stepSize_px = (diagramMaxWidth_px() / this.ticks);

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
          - 3 * Dimensions.margin_px)
        / 2.0);

      let areaTopLeft = new Point(
        this.diagrams[i].area.p2.x + Dimensions.margin_px,
        this.diagrams[i].area.p1.y
        );

      let area = Rectangle.fromPointWidthHeight(
        areaTopLeft,
        2*buttonSideLength_px + 3*Dimensions.margin_px,
        2*buttonSideLength_px + 3*Dimensions.margin_px
      );

      area.drawMe();

      this.addMoveUpButton(i, buttonSideLength_px);
      this.addMoveDownButton(i, buttonSideLength_px);
      this.addRemoveButton(i, buttonSideLength_px);
    }
  }

  addMoveUpButton(i, buttonSideLength_px) {
    if (i > 0) {
      let moveUpButton = createImg('resources/move_up.svg', '');
      Styles.setButtonStyle(moveUpButton);
      moveUpButton.size(buttonSideLength_px, buttonSideLength_px);
      moveUpButton.position(
        this.diagrams[i].area.p2.x + 2*Dimensions.margin_px,
        this.diagrams[i].area.p1.y + Dimensions.margin_px
      );

      moveUpButton.style('padding', 0);
      let project = this;
      moveUpButton.mouseReleased(
        function () {
          project.swapDiagrams(i - 1, i, project);
          redraw();
        }
      );
    }
  }

  addMoveDownButton(i, buttonSideLength_px) {
    if (i < this.diagrams.length - 1) {
      let moveDownButton = createImg('resources/move_down.svg', '');
      Styles.setButtonStyle(moveDownButton);
      moveDownButton.size(buttonSideLength_px, buttonSideLength_px);
      moveDownButton.position(
        this.diagrams[i].area.p2.x + 2*Dimensions.margin_px,
        this.diagrams[i].area.p1.y + 2*Dimensions.margin_px + buttonSideLength_px
      );

      moveDownButton.style('padding', 0);
      let project = this;
      moveDownButton.mouseReleased(
        function () {
          project.swapDiagrams(i, i + 1, project);
          redraw();
        }
      );
    }
  }

  addRemoveButton(i, sideLength_px) {
    let removeButton = createImg('resources/remove.svg', '');
    Styles.setButtonStyle(removeButton);
    removeButton.size(sideLength_px, sideLength_px);
    removeButton.position(
      this.diagrams[i].area.p2.x + 3*Dimensions.margin_px + sideLength_px,
      this.diagrams[i].area.p1.y + Dimensions.margin_px + 0.5*(sideLength_px+Dimensions.margin_px)
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