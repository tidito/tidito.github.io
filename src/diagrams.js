class Diagrams{
  constructor() {
    this.name = 'Name';
    this.diagrams = [];

    this.stepSize = 10;
  }

  addDiagram(number) {
    this.diagrams.push(new Diagram(number, this));
  }

  removeDiagram(index) {
    this.diagrams.splice(index, 1);
  }

  drawMe() {
    for (i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].drawMe(i);
    }
  }
}