var MIC;
const THRESHOLD = 20;
const MIN_HEIGHT = 20;
var volume = {
  level: 0,
  arr: [],
  update: function(){
    if(this.arr.length > width){
      for(let i = 0; i < this.arr.length; i++){
        this.arr[i].x--;
      }

      this.arr.splice(0, 1);
    }

    for(let i = 1; i < this.arr.length - 1; i++){
      let curr = abs(this.arr[i].y - height / 2);
      let pre = abs(this.arr[i - 1].y - height / 2);
      let post = abs(this.arr[i + 1].y - height / 2);

      if(curr <= pre && curr <= post && map(curr, 0, height / 2, 0, 100) > MIN_HEIGHT){
        push();
        strokeWeight(10);
        stroke(255);
        point(this.arr[i].x, this.arr[i].y);
        //this.pointArr.push({x: this.arr[i].x, y: this.arr[i].y});
        pop();

        //console.log(pre + ", " + curr + ", " + post);
      }
    }

  },
  move: false,
  pointArr: []
};
var counter = 0;
var ball;

function setup(){
  createCanvas(500, 500);
  MIC = new p5.AudioIn();
  MIC.start();
  ball = new Ball();
}

function draw(){
  background(51);
  stroke(255);
  strokeWeight(1);
  noFill();
  volume.level = MIC.getLevel() * 100;

  counter = constrain(counter, 0, width);

  volume.arr.push({x: counter++, y: -map(volume.level, 0, THRESHOLD, 0, height) + height / 2});

  beginShape();
  for(let i = 0; i < volume.arr.length; i++){
    vertex(volume.arr[i].x, volume.arr[i].y);
  }
  endShape();

  volume.update();

  //ball.update();
  //ball.show();


  //console.log(volume.level + ", " + MIC.getLevel() * 100);
  //console.log(-map(volume.level, 0, THRESHOLD, 0, height));
  //noLoop();
}

function Ball(){
  this.rad = 30;
  this.mag = 20;
  this.pos = createVector(2 * this.rad, height / 2 - this.rad);
  this.vel = createVector(0, -this.mag);
  this.acc = createVector(0, 1);


  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //if(this.vel.y >= this.mag){
    if(this.pos.y + this.rad > height / 2){
      this.vel = createVector();
      this.acc = createVector();
      this.pos = createVector(this.pos.x, height / 2 - this.rad);
    }
  }

  this.show = function(){
    push();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    pop();
  }

  this.jump = function(){
    this.vel = createVector(0, -this.mag);
    this.acc = createVector(0, 1);
  }
}

function mousePressed(){
  ball.jump();
}
