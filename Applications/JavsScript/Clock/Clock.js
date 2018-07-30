var clock;
var TIME;

function Clock(){
  this.time;

  Clock.center = {x: width / 2 , y: height / 2};
  Clock.radius = width < height ? width / 2 * 0.8 : height / 2 * 0.8;
}

Clock.number = function(figure){
    let temp = map(figure, 0, 12, 0, 2 * PI) - PI / 2;
    return {x: Clock.center.x + Math.cos(temp) * Clock.radius * 0.9,
            y: Clock.center.y + Math.sin(temp) * Clock.radius * 0.9};
}

Clock.factory = function(hr, min, sec){
  let second = map(sec, 0 , 60, 0 , 2 * PI) - PI / 2;
  let minute = map(min, 0 , 60, 0 , 2 * PI) - PI / 2;
  let hour =   map(hr,  0 , 12, 0 , 2 * PI) + map(min, 0 , 60, 0 , 2 * PI) / 12 - PI / 2;

  let Hour =   {x: Clock.center.x + Math.cos(hour) * Clock.radius * 0.5,
                y: Clock.center.y + Math.sin(hour) * Clock.radius * 0.5};
  let Minute = {x: Clock.center.x + Math.cos(minute) * Clock.radius * 0.8,
                y: Clock.center.y + Math.sin(minute) * Clock.radius * 0.8};
  let Second = {x: Clock.center.x + Math.cos(second) * Clock.radius * 0.7,
                y: Clock.center.y + Math.sin(second) * Clock.radius * 0.7};

  return {Hour, Minute, Second};
}



function setup() {
  createCanvas(600,400);

  clock = new Clock();
}

function draw() {
  background(0);

  ellipse(Clock.center.x, Clock.center.y, 2 * Clock.radius, 2 *  Clock.radius);

  TIME = Clock.factory(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());

  stroke(0);
  strokeWeight(5);
  line(Clock.center.x, Clock.center.y, TIME.Hour.x, TIME.Hour.y);
  line(Clock.center.x, Clock.center.y, TIME.Minute.x, TIME.Minute.y);

  stroke(100);
  strokeWeight(10);
  line(Clock.center.x, Clock.center.y, TIME.Second.x, TIME.Second.y);

  stroke(0);
  ellipse(Clock.center.x, Clock.center.y, Clock.radius / 10, Clock.radius / 10);

  fill(130);
  for(let i = 1; i <= 12; i++)
    ellipse(Clock.number(i).x,Clock.number(i).y, 10,10);


}
