var waves = [];
var locs = [];
var prevKey = -1;
var osc;

var fin = 73;
var fir = 60;

function Wave(x, y) {
  this.x = x;
  this.y = y;

  this.radius = 30;
  this.stroke = 255;

  Wave.prototype.update = function() {
    this.radius++; 
    this.stroke--;
  }
}

function Location(x) {
  this.x = x;

  Location.y = height * 0.8;
  Location.radius = width / (fin - fir) / 2;
}

function setup() {
  createCanvas(600, 400);
  osc = new p5.TriOsc();
  osc.start();
  osc.amp(0);

  let counter = 0;
  locs = new Array(fin - fir).fill().map( x => new Location( Location.radius * (2 * counter++) ));
}

function draw() {
  background(0);

  for (let i = 0; i < waves.length; i++) {
    stroke(waves[i].stroke);
    noFill();
    ellipse(waves[i].x, waves[i].y, waves[i].radius, waves[i].radius); 
    waves[i].update();

    if (waves[i].stroke < 0)
      waves.splice(i, 1);
  }

  for (let loc of locs) {
    fill(255);
    ellipse(loc.x, Location.y, Location.radius, Location.radius);
  }
}

function mouseDragged() {
  waves.push( new Wave(mouseX, mouseY) );
  playing(false);
}

function mousePressed() {
  waves.push( new Wave(mouseX, mouseY) );
  playing(true);
}

function mouseReleased() {
  osc.fade(0, 0.5);
}

function keyPressed() {
  let keycode = key;
  let code = 0;
  switch(keycode) {
  case 'Z': 
    code = 60;
    break;
  case 'X': 
    code = 62;
    break;
  case 'C': 
    code = 64;
    break;
  case 'V': 
    code = 65;
    break;
  case 'B': 
    code = 67;
    break;
  case 'N': 
    code = 69;
    break;
  case 'M': 
    code = 71;
    break;

  case 'S': 
    code = 61;
    break;
  case 'D': 
    code = 63;
    break;
  case 'G': 
    code = 66;
    break;
  case 'H': 
    code = 68
      break;
  case 'J': 
    code = 70;
    break;

  case 'Q': 
    code = 72;
    break;
  case 'W': 
    code = 74;
    break;
  case 'E': 
    code = 76;
    break;
  case 'R': 
    code = 77;
    break;
  case 'T': 
    code = 79;
    break;
  case 'Y': 
    code = 81;
    break;
  case 'U': 
    code = 83;
    break;

  case '2': 
    code = 73;
    break;
  case '3': 
    code = 75;
    break;
  case '5': 
    code = 78;
    break;
  case '6': 
    code = 80;
    break;
  case '7': 
    code = 82;
    break;
  }

  playSound(code, 100);
  waves.push(new Wave( map(code, 60, 83, 0, width) , height / 2));
}

function playing(ignore) {  
  let note = floor(map(mouseX, 0, width, fir, fin)); 

  if (note > fin)
    note = fin;
  else if (note < fir)
    note = fir;

  if (!ignore) {
    if (prevKey != note) {
      playSound(note, 100);
      prevKey = note;
    }
  } else {
    playSound(note, 100);
    prevKey = note;
  }
}

function playSound(note, duration) {
  osc.freq(midiToFreq(note));
  osc.fade(0.5, 0.2);

  if (duration) {
    setTimeout(function() {
      osc.fade(0, 0.2);
    }
    , duration-50);
  }
}
