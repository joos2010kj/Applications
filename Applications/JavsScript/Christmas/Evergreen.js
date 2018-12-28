function Evergreen() {
  this.pos = createVector(width / 2, height / 2);
  this.size = 20;
  this.branch = [];
  this.col = [];
  this.lastY = 0;
  this.edgesX = [width, 0];
  this.snow = [];
  this.windOffset;
  this.tracker = {init: 0, offset: 0.01};
  this.rootWidth = 50;
  this.decoration = [];
  this.counter = 0;
  this.windSlider = createSlider(0, 5, 1, 0.01);

  this.preload = function() {
    this.branches(width / 2, height / 10, 20);
    this.snowGenerator();
    this.decorate();
    this.windSlider.parent("windSlider");
  }

  this.run = function() {
    this.wind();
    this.drawBackground();
    this.drawBranches();
    this.drawOrnaments();
    this.drawSnow();
  }

  this.drawBranches = function() {
    for (let i = 0; i < this.branch.length; i++) {
      beginShape();
      for (let j = 0; j < 3; j++) {
        fill(0, this.col[i].g, 0, this.col[i].a);
        noStroke();
        vertex(this.branch[i][j].x, this.branch[i][j].y);
      }
      endShape(CLOSE);
    }
  }

  this.drawBackground = function() {
    fill(255, 255, 255, 200);
    rect(0, height * (7/ 10), width, height * (3 / 10));

    noStroke();
    fill(160,82,45);
    rect(width / 2  + this.rootWidth * cos(angToRad(120)),
    this.lastY - this.rootWidth * sin(angToRad(120)),
    this.rootWidth,
    this.rootWidth * 2.5);
  }

  this.drawOrnaments = function() {
    for (let i = 0; i < this.decoration.length; i++) {
      fill(this.decoration[i].col.r, this.decoration[i].col.g, this.decoration[i].col.b);
      ellipse(this.decoration[i].x, this.decoration[i].y, this.decoration[i].r);

      let dec = this.decoration[i];

      dec.col.r = dec.col.r > 255 ?
                              100 :
                    dec.col.r < 0 ?
                              150 :
                  random(1) > 0.5 ?
                    dec.col.r + 1 :
                    dec.col.r - 1 ;

      dec.col.g = dec.col.g > 255 ?
                              100 :
                    dec.col.g < 0 ?
                              150 :
                  random(1) > 0.5 ?
                    dec.col.g + 1 :
                    dec.col.g - 1 ;

      dec.col.b = dec.col.b > 255 ?
                              100 :
                    dec.col.b < 0 ?
                              150 :
                  random(1) > 0.5 ?
                    dec.col.b + 1 :
                    dec.col.b - 1 ;
    }
  }

  this.branches = function(x, y, rad) {
    this.branchesAux(x, y, rad, 0);

    for (let i = 0; i < this.branch.length; i++) {
      this.col.push({g: random(100, 255), a: random(255)});
    }
  }

  this.decorate = function() {
    let y1 = (this.lastY - (height / 10)) / (this.edgesX[0] - (width / 2));
    let y2 = (this.lastY - (height / 10)) / (this.edgesX[1] - (width / 2));

    function slopeY1(x) {
      return (y1 * (x - width / 2)) + (height / 10);
    }

    function slopeY2(x) {
      return ((y2 * (x - width / 2)) + (height / 10));
    }

    for (let i = 0; i < 50; i++) {
      let randomVec = {x: random(this.edgesX[0], this.edgesX[1]),
        y: random(height / 10   , this.lastY    )};

        if (slopeY1(randomVec.x) < randomVec.y && slopeY2(randomVec.x) < randomVec.y){
          this.decoration.push({
            x: randomVec.x,
            y: randomVec.y - 30,
            r: 20,
            col: {
              r: random(255),
              g: random(255),
              b: random(255)
            }
          });
        }
      }
    }

    this.branchesAux = function(x, y, r, layer) {
      if (layer != 10) {
        this.branch.push(equilTri(x, y, r));

        this.branchesAux(x + r * cos(PI / 3),
        y + r * sin(PI / 3),
        random(this.size * 0.5, this.size * 2),
        layer + 1); // left

        this.branchesAux(x + r * cos(2 * PI / 3),
        y + r * sin(2 * PI / 3),
        random(this.size * 0.5, this.size * 2),
        layer + 1);  //right
      } else {
        if (this.lastY < y) {
          this.lastY = y;
        }

        if (this.edgesX[0] > x) {
          this.edgesX[0] = x;
        }

        if (this.edgesX[1] < x) {
          this.edgesX[1] = x;
        }
      }
    }

    this.drawSnow = function() {
      noStroke();
      for (let i = this.snow.length - 1; i >= 0; i--) {
        let temp = this.snow[i];

        if (temp.y - temp.r > height) {
          this.snow.splice(i,1);
          this.snow.push({x: random(-width / 2, width),
            y: -random(100),
            r: random(20),     // radius
            a: random(255),    // alpha
            v: random(2),      // velocity
            w: random(3)});    // wind speed
            continue;
          }

          fill(255, 255, 255, temp.a);
          ellipse(temp.x, temp.y, temp.r);

          temp.y += temp.v;
          temp.x += this.windOffset / (temp.w / this.windSlider.value());
        }
      }

      this.wind = function() {
        this.windOffset = noise(this.tracker.init);
        this.tracker.init += this.tracker.offset;
      }

      this.snowGenerator = function() {
        for (let i = 0; i < 100; i++) {
          this.snow.push({x: random(-width / 2, width),
            y: -random(100),
            r: random(20),     // radius
            a: random(255),    // alpha
            v: random(2),      // velocity
            w: random(3)});    // wind speed
        }
      }
}
