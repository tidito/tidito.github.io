let mousePressedAt;
let mouseReleasedAt;
let whatIsHappening;
let colors;
let stuffToDraw = [];
let cyclogramContainers = [];

function setup() {
  colors = new Colors();
  createCanvas(1600, 800);
  background(colors.background);
  
  addContainers();

  noLoop();
}

function addContainers(){
  containersHeight = 
    Dimensions.cyclogramHeight 
    + (2 * Dimensions.margin)

  for (i = 0; i < 3; i++){
    let rectangle = Rectangle.fromPointWidthHeight(
      p = Dimensions.cyclogramsTopLeft.offseted(0, i * (containersHeight + Dimensions.margin)),
      w = Dimensions.cyclogramWidth,
      h = containersHeight
    )

    cyclogramContainers.push(rectangle);
  }

  stuffToDraw.push(cyclogramContainers);
}

function draw() {
  background(colors.background);

  for (const stuff of stuffToDraw){
    drawStuff(stuff);
  }

  switch (whatIsHappening){
    case "New rectangle":
      mouseAt = new Point(mouseX, mouseY);
      let rectangle = new Rectangle(mousePressedAt, mouseAt);
      rectangle.drawMe(colors);

      break;
  }
}

function drawStuff(stuff){
  if (Array.isArray(stuff)) {
    for (const element of stuff) drawStuff(element);
  } else {
    stuff.drawMe(colors);
  }
}

function mousePressed() {
  loop();
  whatIsHappening = "New rectangle";
  mousePressedAt = new Point(mouseX, mouseY);
}

function mouseReleased() {
  noLoop();

  whatIsHappening = "";
  mouseReleasedAt = new Point(mouseX, mouseY);
  
  let rectangle = new Rectangle(mousePressedAt, mouseReleasedAt);

  stuffToDraw.push(rectangle);
  redraw();
}
