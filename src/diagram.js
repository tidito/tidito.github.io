class Diagram{
  constructor(number, diagrams){
    this.name = 'Name';
    this.highStates = [];
    this.number = number;
    
    this.ticks;
    this.stepSize;
    this.updateTicks(diagrams);

    this.topLeft;
    this.area;
    this.statesArea;

    this.calculateDimensions();
  }

  updateTicks(diagrams){
    this.ticks = diagrams.ticks;
    this.stepSize = diagrams.stepSize;
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
        this.area.p1.offseted(
          Dimensions.nameWidth + (2 * Dimensions.margin), 
          Dimensions.margin),
        this.area.p2.offseted(
          -Dimensions.margin, 
          -Dimensions.margin)
      );
  }

  rebuild(restoredDiagram){
    this.name = restoredDiagram.name;
    this.number = restoredDiagram.number;
    this.stepSize = restoredDiagram.stepSize;
    this.ticks = restoredDiagram.ticks;
    
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
    this.drawTicks();
    this.drawLowStates();
    this.drawHighStates();
  }

  drawTicks(){
    strokeWeight(Dimensions.tickWidth_px);

    fill(Colors.ticks);
    textSize(Dimensions.tickLabelSize_px);
    textStyle(NORMAL);
    textFont(Dimensions.labeledTickFont);
    textAlign(CENTER, CENTER);

    for (let i = 0; i<= this.ticks; i++){
      let x = this.statesArea.p1.x + (i * this.stepSize);

      if (i % Dimensions.labeledTickEvery == 0){
        let y = this.statesArea.p2.y + (Dimensions.margin * 0.5);

        noStroke();
        text(i, x, y);
      } else {
        let yTop = this.statesArea.p2.y + Dimensions.tickYOffset_px;
        let yBot = yTop + Dimensions.tickLength_px;

        stroke(Colors.ticks);
        line(x, yTop, x, yBot);
      }

    }
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