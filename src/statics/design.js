class Dimensions{
  static margin_px = 10;

  static menuX_px = Dimensions.margin_px;
  static menuY_px = Dimensions.margin_px;
  static leftMenuWidth_px = 200;
  static rightMenuWidth_px = 200;

  static diagramsTopLeft = new Point(Dimensions.leftMenuWidth_px + 2*Dimensions.margin_px, Dimensions.margin_px);
  static diagramHeight_px = 60;
  static nameWidth_px = 150;
  static lowStateLineWidth_px = 2;

  static tickLength_px = 3;
  static tickWidth_px = 1;
  static tickYOffset_px = 2;

  static labeledTickEvery = 5;
  static tickLabelSize_px = 11;
  static labeledTickFont = 'Courier New';

  static nameFont = 'Tahoma';
  static nameSize_px = 16;
  static nameInputHeight_px = 30;
  
  static containerHeight_px = 
    Dimensions.diagramHeight_px 
    + (2 * Dimensions.margin_px);

  static containersSpan_px = 
    Dimensions.containerHeight_px
    + Dimensions.margin_px;
}

class Colors{
  static background = '#0f1022'; //(100);
  static container = '#182036'; //(150);
  static states = '#228de2'; //(255);
  static selectedState = '#5042d0';
  static ticks = '#ffffff'
}

class Styles{
  static setButtonStyle(button){
    button.style('color', Colors.ticks);
    button.style('font-family', Dimensions.nameFont);
    button.style('font-weight', 'bold');
    button.style('background-color', Colors.states);
    button.style('border-color', '#ffffff00');
  }
}