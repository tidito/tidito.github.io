class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  offseted(dX, dY){
    return new Point(this.x + dX, this.y + dY);
  }
}