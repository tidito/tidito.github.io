class Diagrams{
  constructor() {
    this.name = 'Name';
    this.diagrams = [];

    this.stepSize = 10;
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