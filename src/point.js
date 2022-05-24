class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  offseted(dX, dY){
    return new Point(this.x + dX, this.y + dY);
  }

  swapX(other){
    [this.x, other.x] = [other.x, this.x];
  }

  swapY(other){
    [this.y, other.y] = [other.y, this.y];
  }
}