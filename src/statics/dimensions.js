class Dimensions{
  static diagramsTopLeft = new Point(200, 20);
  static diagramHeight = 60;
  static diagramWidth = 1000;
  static nameWidth = 150;
  static margin = 10;
  static lowStateLineWidth = 2;

  static containerWidth = 
    Dimensions.diagramWidth
    + (3 * Dimensions.margin)
    + Dimensions.nameWidth;
  
  static containerHeight = 
    Dimensions.diagramHeight 
    + (2 * Dimensions.margin);

  static containersSpan = 
    Dimensions.containerHeight
    + Dimensions.margin;
}