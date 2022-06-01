class HighState{
  constructor(start_steps, length_steps, diagram){
    this.start_steps = start_steps;
    this.length_steps = length_steps;

    this.calculatePoints(diagram);
  }

  calculatePoints(diagram){
    this.maxStep_steps = diagram.xPositionPixelsToSteps(diagram.statesArea.p2.x);

    this.p1 = 
      new Point(
        diagram.statesArea.p1.x + this.start_steps * diagram.stepSize,
        diagram.statesArea.p1.y
      );
    this.p2 = 
      new Point(
        this.p1.x + this.length_steps * diagram.stepSize,
        diagram.statesArea.p2.y
      );
  }

  rebuild(restoredHighState, diagram){
    this.start_steps = restoredHighState.start_steps;
    this.length_steps = restoredHighState.length_steps;
    this.maxStep_steps = restoredHighState.maxStep_steps;

    this.calculatePoints(diagram);

  }

  isMouseOver(){
    let xInRange = this.p1.x <= mouseX && mouseX <= this.p2.x;
    let yInRange = this.p1.y <= mouseY && mouseY <= this.p2.y;

    return xInRange && yInRange;
  }

  changeLengthBy(changeBy, diagram){
    if (this.start_steps + this.length_steps + changeBy <= this.maxStep_steps){
      this.length_steps += changeBy;
    }
    this.calculatePoints(diagram);
    redraw();
  }

  moveBy(dX, diagram){
    if (this.start_steps + dX >= 0 
        && this.start_steps + this.length_steps + dX <= this.maxStep_steps){
      this.start_steps += dX;
    }
    this.calculatePoints(diagram);
    redraw();
  }

  drawMe(){
    this.drawMeInColor(Colors.states);
  }

  drawMeInColor(color){
    rectMode(CORNERS);
    noStroke();
    fill(color);
    rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}