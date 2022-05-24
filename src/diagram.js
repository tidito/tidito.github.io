class Diagram{
  constructor(number, diagrams){
    this.name = 'Name';
    this.highStates = [];
    this.number = number;
    this.diagrams = diagrams

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

  addHighState (highState){
    this.highStates.push(highState);
  }

  removeHighState (index){
    this.highStates.splice(index, 1);
  }

  drawMe() {
    this.area.drawMe();
    this.drawLowStates();
    this.drawHighStates();
  }

  drawLowStates() {
    strokeWeight(Dimensions.lowStateLineWidth);
    stroke(Colors.states);

    line(
      this.statesArea.p1.x,
      this.statesArea.p2.y,
      this.statesArea.p2.x,
      this.statesArea.p2.y
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
    return round(positionRelative_px/this.diagrams.stepSize);
  }

  xPositionStepsToPixels(position_steps){
    return this.statesArea.p1.x + position_steps * this.diagrams.stepSize;
  }
}