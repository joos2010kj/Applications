let tree;
let canvas;

function setup(){
  canvas = createCanvas(500, 500);
  canvas.parent("canvas");
  
  tree = new Evergreen();
  tree.preload();
}

function draw(){
  background(51);
  tree.run();
}
