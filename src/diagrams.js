class Diagrams{
  constructor() {
    this.name = 'Insert name here';
    this.diagrams = [];

    this.ticks = 60;
    this.stepSize = (Dimensions.diagramMaxWidth / this.ticks);
  }

  rebuild(restoredDiagrams){
    this.name = restoredDiagrams.name;
    this.ticks = restoredDiagrams.ticks;
    this.stepSize = restoredDiagrams.stepSize;
    
    for (let restoredDiagram of restoredDiagrams.diagrams){
      let diagram = new Diagram(0, this)
      diagram.rebuild(restoredDiagram);

      this.diagrams.push(diagram);
    }
  }

  setTicks(ticks){
    this.ticks = ticks;
    this.stepSize = (Dimensions.diagramMaxWidth / this.ticks);

    for (let i = 0; i < this.diagrams.length; i++){
      this.diagrams[i].updateTicks(this);
    }
    redraw();
  }

  setName(name){
    this.name = name;
  }

  addDiagram(number) {
    console.log(this);
    this.diagrams.push(new Diagram(number, this));
    redraw();
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