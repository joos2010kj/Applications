var rectangles = [];
var points = [];
var colorDogs = [];
var myRGB = [];

function ColorDog(x_, y_, a) {
  this.val = 0;
  this.assignment = a;

  this.cx = x_;
  this.cy = y_;

  ColorDog.radius = 7.5;

  this.active = false;

  this.adjust = function() {
    this.cx = mouseX;
    this.val = map(this.cx, 0, width - 90, 0, 255);

    if (this.cx >= width - 90) {
      this.cx = width - 90;
    } else if (this.cx < 10) {
      this.cx = 10;
    }
  }
}

function Rectangle(xPre_, yPre_) {
  this.xPre = xPre_;
  this.yPre = yPre_;
  this.xPost = 0;
  this.yPost = 0;

  this.r = this.g = this.b = 0;
}

function setup() {
  createCanvas(600, 400);
  colorDogs.push(new ColorDog(10, 10, 'R'));
  colorDogs.push(new ColorDog(10, 40, 'G'));
  colorDogs.push(new ColorDog(10, 70, 'B'));
}

function draw() {
  background(0);
  fill(255);
  noStroke();

  rect(0, 0, width, 80);

  for (rectangle of rectangles) {
    fill(rectangle.r, rectangle.g, rectangle.b);
    rect(rectangle.xPre, rectangle.yPre, rectangle.xPost, rectangle.yPost);
  }

  fill(255);

  if (points !== undefined) {
    stroke(255);
    fill(50);
    point(points[0], points[1]);
  }

  myRGB.splice(0);

  for (colorDog of colorDogs) {
    stroke(0, 0, 0);
    line(10, colorDog.cy, width - 90, colorDog.cy);

    if (colorDog.assignment == 'R')
      fill(colorDog.val, 0, 0);
    else if (colorDog.assignment == 'G')
      fill(0, colorDog.val, 0);
    else
      fill(0, 0, colorDog.val);

    ellipse(colorDog.cx, colorDog.cy, ColorDog.radius * 2, ColorDog.radius * 2);
    if (colorDog.active) {
      colorDog.adjust();
    }

    myRGB.push(colorDog.val);
  }


  fill(myRGB[0], myRGB[1], myRGB[2]);

  rect(width - 70, 10, 60, 60);
  stroke(0, 0, 0);
  line(width - 80, 0, width - 80, 80);
}

function mousePressed() {
  if (mouseY > 80) {
    let rectangle = new Rectangle(mouseX, mouseY);
    rectangle.r = myRGB[0];
    rectangle.g = myRGB[1];
    rectangle.b = myRGB[2];

    rectangles.push(rectangle);

    points.push(mouseX);
    points.push(mouseY);
  } else {
    for (colorDog of colorDogs) {
      if (Math.sqrt((mouseX - colorDog.cx)*(mouseX - colorDog.cx) + (mouseY - colorDog.cy)*(mouseY - colorDog.cy)) < ColorDog.radius) {
        colorDog.active = !colorDog.active;
      }
    }
  }
}

function mouseReleased() {
  if ( (points !== undefined || points.length == 0) && mouseY > 80) {
    let rectangle = rectangles[rectangles.length - 1];
    rectangle.xPost = mouseX - rectangle.xPre;
    rectangle.yPost = mouseY - rectangle.yPre;

    points = [];
  }
}

function keyPressed() {
  if (key == ' ') {
    rectangles.splice(rectangles.length - 1);
  }
}
