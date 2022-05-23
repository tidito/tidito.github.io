class Diagram{
  constructor(){
    this.name = 'Name';
    this.elements = []
  }

  addElement (element){
    this.elements.push(element);
  }

  removeElement (index){
    this.elements.splice(index, 1);
  }

  drawMe(positionNumber) {
    this.drawContainer(positionNumber);
  }

  drawContainer(positionNumber) {
    let containerWidth = 
      Dimensions.diagramWidth
      + 3*Dimensions.margin
      + Dimensions.nameWidth;

    let containerHeight = 
      Dimensions.diagramHeight 
      + (2 * Dimensions.margin);

    let containersSpan = containerHeight + Dimensions.margin;

    let topLeft = Dimensions.diagramsTopLeft.offseted(0, positionNumber * containersSpan);

    let rectangle = Rectangle.fromPointWidthHeight(topLeft, containerWidth, containerHeight);

    rectangle.drawMe();
  }

  drawElements(positionNumber) {
    ;
  }
}