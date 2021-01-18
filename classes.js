class approachObject {
  constructor(direction) {
    this.reset(direction);
  }

  reset(direction) {
    this.type = random(['positive', 'negative']);
    this.side = direction;
    //this.side = random(['left', 'right']);
    this.radius = 12;
    if (this.side == 'left') {
      this.x = startLeftX;
    } else {
      this.x = startRightX;
    }
    if (this.type == 'positive') {
      this.col = 'blue';
    } else {
      this.col = 'red';
    }
    this.y = 0;
  }
  
  display() {
    push();
    fill(this.col);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();
  }

  move() {
    if (this.y - this.radius >= height) {
      this.reset(this.side);
    } else {
     // var speedUp = 7;
      speedUp += 0.0001;
      var yIncrem = 1.1 * speedUp;
      var xIncrem = 0.3 * speedUp;
      var sizeIncrem = 0.2 * speedUp;

      this.x = this.side == 'left' ? this.x - xIncrem : this.x + xIncrem;

      this.y += yIncrem;
      this.radius += sizeIncrem;
    }
  }

  disappear() {
    this.radius = 0;
  }
}

class userCharacter {
  constructor () {
    this.reset();
  }
  
  display() {
    push();
    fill(this.col);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();
  }
  
  reset() {
    this.col = 'white';
    this.radius = 30;
    this.x = width / 2;
    this.y = height - this.radius * 1.5;
    this.position = 'mid';
  }

  moveLeft() {
    this.x -= 105;
    if (this.position == 'right') {
      this.position = 'mid';
    } else {
      this.position = 'left';
    }
  }

  moveRight() {
    this.x += 105;
    if (this.position == 'left') {
      this.position = 'mid';
    } else {
      this.position = 'right';
    }
  }
}