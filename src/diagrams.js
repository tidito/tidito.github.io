class Diagrams{
  constructor() {
    this.name = 'Name';
    this.diagrams = [];

    this.ticks = 25;
    this.stepSize = floor(Dimensions.diagramMaxWidth / this.ticks);
  }

  rebuild(restoredDiagrams){
    this.name = restoredDiagrams.name;
    this.stepSize = restoredDiagrams.stepSize;
    
    for (let restoredDiagram of restoredDiagrams.diagrams){
      let diagram = new Diagram(0, this)
      diagram.rebuild(restoredDiagram);

      this.diagrams.push(diagram);
    }
  }

  updateTicks(ticks){
    this.ticks = ticks;
    this.stepSize = floor(Dimensions.diagramMaxWidth / this.ticks);

    for (let diagram of this.diagrams){
      diagram.updateTicks(this);
    }
  }

  addDiagram(number) {
    this.diagrams.push(new Diagram(number, this));
  }

  removeDiagram(index) {
    this.diagrams.splice(index, 1);
  }

  drawMe() {
    for (let i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].drawMe(i);
    }
  }

  storeData() {
    storeItem(Names.storedDiagrams, this);
  }
}