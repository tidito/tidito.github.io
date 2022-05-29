class Dimensions{
  static diagramsTopLeft = new Point(200, 20);
  static diagramHeight = 60;
  static diagramMaxWidth = 1000;
  static nameWidth = 150;
  static margin = 10;
  static lowStateLineWidth = 2;

  static tickLength_px = 3;
  static tickWidth_px = 1;
  static tickYOffset_px = 2;

  static labeledTickEvery = 5;
  static tickLabelSize_px = 11;
  static labeledTickFont = 'Courier New';

  static containerWidth = 
    Dimensions.diagramMaxWidth
    + (3 * Dimensions.margin)
    + Dimensions.nameWidth;
  
  static containerHeight = 
    Dimensions.diagramHeight 
    + (2 * Dimensions.margin);

  static containersSpan = 
    Dimensions.containerHeight
    + Dimensions.margin;
}