class Diagrams{
  constructor() {
    this.name = 'Name';
    this.diagrams = [];
  }

  addElement() {
    this.diagrams.push(new Diagram());
  }

  removeElement(index) {
    this.diagrams.splice(index, 1);
  }

  drawMe() {
    for (i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].drawMe(i);
    }
  }
}