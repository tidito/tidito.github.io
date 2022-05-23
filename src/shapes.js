class Rectangle{
  constructor(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
  }

  static fromPointWidthHeight(p, w, h){
    let p2 = new Point(p.x + w, p.y + h);
    return new Rectangle(p, p2);
  }

  drawMe(colors){
    rectMode(CORNERS);
    noStroke();
    fill(colors.container);
    rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}

class Line {
  constructor(p1, p2){
    this.points = [];
    this.points.push(p1);
    this.points.push(p2);
  }

  drawMe(colors){
    stroke(colors.element);
    noFill();
    beginShape();

    for (let i = 0; i <= this.points.lastIndexOf; i++) {
      vertex(this.this.points[i].x, this.this.points[i].y);
    }

    endShape();
  }
}