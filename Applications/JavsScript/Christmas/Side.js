function radToAng(rad) {
  return (rad / (2 * PI)) * 360;
}

function angToRad(ang) {
  return (ang / 360) * (2 * PI);
}

function equilTri(x,y,r, angle) {
  let init = PI / 6;
  const offset = 4 * PI / 3;
  let arr = [];

  if (angle != undefined)
  init += angle;

  for (let i = 0; i < 3; i++) {
    let xCoor = x + r * cos(init);
    let yCoor = y + r * sin(init);
    
    arr.push(createVector(xCoor, yCoor));
    init += offset;
  }

  return arr;
}
