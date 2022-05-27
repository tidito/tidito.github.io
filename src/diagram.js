class Diagram{
  constructor(number, diagrams){
    this.name = 'Name';
    this.highStates = [];
    this.number = number;
    this.stepSize = diagrams.stepSize;

    this.topLeft;
    this.area;
    this.statesArea;

    this.calculateDimensions();
  }

  calculateDimensions(){
    this.topLeft =
      Dimensions.diagramsTopLeft.offseted(
        0, this.number * Dimensions.containersSpan);
    this.area = 
      Rectangle.fromPointWidthHeight(
        this.topLeft, Dimensions.containerWidth, Dimensions.containerHeight);
    this.statesArea = 
      new Rectangle(
        this.area.p1.offseted(Dimensions.nameWidth + (2 * Dimensions.margin), Dimensions.margin),
        this.area.p2.offseted(-Dimensions.margin, -Dimensions.margin)
      );
  }

  rebuild(restoredDiagram){
    this.name = restoredDiagram.name;
    this.number = restoredDiagram.number;
    this.stepSize = restoredDiagram.stepSize;
    
    this.calculateDimensions();

    for (let restoredHighState of restoredDiagram.highStates){
      let highState = new HighState(0, 0, this)
      highState.rebuild(restoredHighState, this);

      this.highStates.push(highState);
    }
  }

  addHighState (highState){
    this.highStates.push(highState);
  }

  removeHighStateByIndex (index){
    this.highStates.splice(index, 1);
  }

  removeHighState(highState){
    let index = this.highStates.indexOf(highState);
    if (index >= 0){
      this.removeHighStateByIndex(index);
    }
  }

  drawMe() {
    this.area.drawMe();
    this.drawLowStates();
    this.drawHighStates();
  }

  drawLowStates() {
    strokeWeight(Dimensions.lowStateLineWidth);
    stroke(Colors.states);

    let upBy = ceil(Dimensions.lowStateLineWidth * 0.5);

    line(
      this.statesArea.p1.x,
      this.statesArea.p2.y-upBy,
      this.statesArea.p2.x,
      this.statesArea.p2.y-upBy
      )
  }

  drawHighStates() {
    this.highStates.forEach(state => state.drawMe());
  }

  mouseInStatesArea(){
    let xInRange = this.statesArea.p1.x <= mouseX && mouseX <= this.statesArea.p2.x;
    let yInRange = this.area.p1.y <= mouseY && mouseY <= this.area.p2.y;

    return xInRange && yInRange;
  }

  xPositionPixelsToSteps(position_px){
    position_px = MyMath.limit(position_px, this.statesArea.p1.x, this.statesArea.p2.x);
    let positionRelative_px = position_px - this.statesArea.p1.x;
    return round(positionRelative_px/this.stepSize);
  }

  xPositionStepsToPixels(position_steps){
    return this.statesArea.p1.x + position_steps * this.stepSize;
  }
}