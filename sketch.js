//Welcome to the example sketch!
//You can find explanations in the comments, with instructions for how to alter the code yourself.
//The rest of the files in this app are just to set up this canvas. This file controls all of the interaction.
//This file uses p5.js, a library for making art. You can look up the documentation here: https://p5js.org/reference/ if there are terms you don't recognize. If you don't find it there, it's probably just regular Javascript. You can find its documentation here: https://developer.mozilla.org/en-US/docs/Web/JavaScript
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
    return true;
  } else if (retObs == obs2 && obs2.col == 'blue') {
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

function windowResized() {
  //this detects when the window is resized, such as entering fullscreen mode, or changing orientation of the device.
  resizeCanvas(windowWidth, windowHeight); //resizes the canvas to the new dimensions
}

//This detects if the prototype is opened in Soli Sandbox, and sends an alert to the user that soli functionality will not work in other apps/browswe
//if(!navigator.userAgent.includes("Soli Sandbox")){ alert("This prototype needs to be opened in Soli Sandbox in order to receive Soli Events. Soli functionality will not work.");} else {console.log("Soli Sandbox Detected");}

//This defines all of p5.js' tools so that glitch recognizes them
/*global abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */
