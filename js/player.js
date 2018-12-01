let monster = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  speed: 3,
}

function playerController() {
  movePlayer();
  drawPlayer();
  checkGameEvents(monster.x + monster.width/2 ,monster.y + monster.height/2);
}

function movePlayer() {
  let dir = {
    x : 0,
    y : 0
  };
  if (keyCodes[65]) {
    dir.x--;
  }
  if (keyCodes[87]) {
    dir.y--;
  }
  if (keyCodes[68]) {
    dir.x++;
  }
  if (keyCodes[83]) {
    dir.y++;
  }
  let curSpd;
  if (dir.x != 0 && dir.y != 0) {
    curSpd = Math.sqrt(monster.speed*monster.speed/2);
  } else {
    curSpd = monster.speed;
  }
  //move up
  if (dir.y == -1 && tileEmpty(monster.x,monster.y) && tileEmpty(monster.x+monster.width,monster.y)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x,monster.y-i) && tileEmpty(monster.x+monster.width,monster.y-i)) {
        monster.y-= 1;
      }
    }
  }
  //move right
  if (dir.x == 1 && tileEmpty(monster.x+monster.width,monster.y) && tileEmpty(monster.x+monster.width,monster.y+monster.height)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x+monster.width+i,monster.y) && tileEmpty(monster.x+monster.width+i,monster.y+monster.height)) {
        monster.x+= 1;
      }
    }
  }
  //move down
  if (dir.y == 1 && tileEmpty(monster.x,monster.y+monster.height) && tileEmpty(monster.x+monster.width,monster.y+monster.height)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x,monster.y+monster.height+i) && tileEmpty(monster.x+monster.width,monster.y+monster.height+i)) {
        monster.y+= 1;
      }
    }
  }
  //move left
  if (dir.x == -1 && tileEmpty(monster.x,monster.y) && tileEmpty(monster.x,monster.y+monster.height)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x-i,monster.y) && tileEmpty(monster.x-i,monster.y+monster.height)) {
        monster.x-= 1;
      }
    }
  }
}

function tileEmpty(x,y) {
  if (tileBlock(x,y) != 1) {
    return true;
  }
  return false;
}

function checkGameEvents(x,y) {
  p.deactivate();
  if (tileBlock(x,y).state) {
    if (tileBlock(x,y).state.name == "plate") {
      tileBlock(x,y).activate();
    }
  }
}

function tileBlock(x,y) {
  return (currentLevel[Math.floor(y/tileSize)][Math.floor(x/tileSize)]);
}


function drawPlayer() {
  ctx.fillStyle = "black";
  ctx.fillRect(monster.x,monster.y,monster.width,monster.height);
}
document.addEventListener("keydown", function (e) {
}, false);
