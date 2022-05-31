class Dimensions{
  static margin = 10;

  static menuX = Dimensions.margin;
  static menuY = Dimensions.margin;
  static menuWidth = 200;

  static diagramsTopLeft = new Point(Dimensions.menuWidth + 2*Dimensions.margin, Dimensions.margin);
  static diagramHeight = 60;
  static diagramMaxWidth = 1200;
  static nameWidth = 150;
  static lowStateLineWidth = 2;

  static tickLength_px = 3;
  static tickWidth_px = 1;
  static tickYOffset_px = 2;

  static labeledTickEvery = 5;
  static tickLabelSize_px = 11;
  static labeledTickFont = 'Courier New';

  static nameFont = 'Tahoma';
  static nameSize_px = 16;
  static nameInputHeight = 30;

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