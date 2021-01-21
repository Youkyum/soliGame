window.onSoliEvent = function(event) {
  // this function will run any time a gesture is detected'
  if (event.type == "swipe") {
    if (event.data.direction == 0) {
      if (character.position == 'right' || character.position == 'mid') {
        character.moveLeft();
      }
    } else if (event.data.direction == 1) {
      if (character.position == 'left' || character.position == 'mid') {
        character.moveRight();
      }
    } 
  }
};

function setup() {
  scoreElem = createDiv('your score : 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  let canvasW = 1440 / 4;
  let canvasH = 2960 / 4;

  createCanvas(canvasH, canvasW);
  background(0);
  variableSet();
  obs1 = new approachObject('left');
  obs2 = new approachObject('right');
  character = new userCharacter();
}

function draw() {
  drawRoad();
  drawLines();
  drawObs();
  drawCharacter();
  gameOver();
  calcScore();
}

function variableSet() {
  roadUpperLeftX = width * 3 / 7;
  roadUpperRightX = width * 4 / 7;
  roadLowerLeftX = width / 7;
  roadLowerRightX = width * 6 / 7;

  startLeftX = width * 10 / 21;
  startRightX = width * 11 / 21;

  subRoadUpperLeftX = startLeftX;
  subRoadUpperRightX = startRightX;
  subRoadLowerLeftX = startLeftX - 100;
  subRoadLowerRightX = startRightX + 100;
}

function gameOver() {
  if (!gameState) {
    noLoop();
    const finalScore = parseInt(scoreElem.html().substring(13));
    scoreElem.html('GAME OVER! Your score was : ' + finalScore);
  }
}

function drawObs() {
  obs1.move();
  obs1.display();

  obs2.move();
  obs2.display();
}

function drawRoad() {
  push();
  fill(0);
  beginShape();
  vertex(roadUpperLeftX, 0);
  vertex(roadLowerLeftX, height);
  vertex(roadLowerRightX, height);
  vertex(roadUpperRightX, 0);
  endShape(CLOSE);
  pop();
}

function drawCharacter() {
  character.display();
}  

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    if (character.position == 'right' || character.position == 'mid') {
      character.moveLeft();
    }
  } else if (keyCode == RIGHT_ARROW) {
    if (character.position == 'left' || character.position == 'mid') {
      character.moveRight();
    }
  }
}

function meetObs() {
  if (obs1.x - character.radius <= character.x && obs1.x + character.radius >= character.x
      && obs1.y - character.radius <= character.y && obs1.y + character.radius >= character.y) {
    return obs1;
  }

  if (obs2.x - character.radius <= character.x && obs2.x + character.radius >= character.x
    && obs2.y - character.radius <= character.y && obs2.y + character.radius >= character.y) {
    return obs2;
  }
}

function meetBlue() {
  var retObs = meetObs();
  if (retObs == obs1 && obs1.col == 'blue') {
    if (retObs == obs1) {
      obs1.disappear();
    } else if (retObs == obs2) {
      obs2.disappear();
    }
    return true;
  } else if (retObs == obs2 && obs2.col == 'blue') {
    if (retObs == obs1) {
      obs1.disappear();
    } else if (retObs == obs2) {
      obs2.disappear();
    }
    return true;
  }
}

function meetRed() {
  var retObs = meetObs();
  if (retObs == obs1 && obs1.col == 'red') {
    return true;
  } else if (retObs == obs2 && obs2.col == 'red') {
    return true;
  }
} 

function calcScore() {
  const prevScore = parseInt(scoreElem.html().substring(13));
  if (meetBlue()) {
    scoreElem.html('your score : ' + (prevScore + 50));
  } else if (meetRed()) {
    gameState = false;
    //scoreElem.html('your score : ' + (prevScore - 100));
  }
}

function drawLines() {
  push();
  strokeWeight(2);
  stroke('grey');
  line(roadUpperLeftX, 0, roadLowerLeftX, height);
  line(roadUpperRightX, 0, roadLowerRightX, height);
  pop();

  push();
  strokeWeight(1);
  stroke('grey');
  line(subRoadUpperLeftX, 0, subRoadLowerLeftX, height);
  line(subRoadUpperRightX, 0, subRoadLowerRightX, height);
  pop();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight); 
// }

//if(!navigator.userAgent.includes("Soli Sandbox")){ alert("This prototype needs to be opened in Soli Sandbox in order to receive Soli Events. Soli functionality will not work.");} else {console.log("Soli Sandbox Detected");}
