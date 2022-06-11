class Project{
  constructor() {
    this.name = 'Insert name here';
    this.diagrams = [];

    this.ticks = 60;
    this.stepSize = (Dimensions.diagramMaxWidth / this.ticks);
  }

  rebuild(restoredProject){
    this.name = restoredProject.name;
    this.ticks = restoredProject.ticks;
    this.stepSize = restoredProject.stepSize;
    this.diagrams = [];
    
    for (let restoredDiagram of restoredProject.diagrams){
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
    storeItem(Names.storedProject, this);
  }
}