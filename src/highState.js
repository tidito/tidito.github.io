class HighState{
  constructor(start_steps, length_steps, diagram){
    this.start_steps = start_steps;
    this.length_steps = length_steps;
    this.diagram = diagram;

    this.calculatePoints();
  }

  calculatePoints(){
    this.p1 = 
      new Point(
        this.diagram.statesArea.p1.x + this.start_steps * this.diagram.diagrams.stepSize,
        this.diagram.statesArea.p1.y
      );
    this.p2 = 
      new Point(
        this.p1.x + this.length_steps * this.diagram.diagrams.stepSize,
        this.diagram.statesArea.p2.y
      );
  }

  isMouseOver(){
    let xInRange = this.p1.x <= mouseX && mouseX <= this.p2.x;
    let yInRange = this.p1.y <= mouseY && mouseY <= this.p2.y;

    return xInRange && yInRange;
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