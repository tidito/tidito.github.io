class Rectangle{
  constructor(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
  }

  static fromPointWidthHeight(p, w, h){
    let p2 = new Point(p.x + w, p.y + h);
    return new Rectangle(p, p2);
  }

  drawMe(){
    this.drawMeInColor(Colors.container);
  }

  drawMeInColor(color){
    rectMode(CORNERS);
    noStroke();
    fill(color);
    rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}