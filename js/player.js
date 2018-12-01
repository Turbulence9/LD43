let monster = {
  x: 100,
  y: 100,
  width: 20,
  height: 20,
  speed: 4,
}

function playerController() {
  movePlayer();
  drawPlayer();
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
    monster.y -= curSpd;
  }
  //move right
  if (dir.x == 1 && tileEmpty(monster.x+monster.width,monster.y) && tileEmpty(monster.x+monster.width,monster.y+monster.height)) {
    monster.x += curSpd;
  }
  //move down
  if (dir.y == 1 && tileEmpty(monster.x,monster.y+monster.height) && tileEmpty(monster.x+monster.width,monster.y+monster.height)) {
    monster.y += curSpd;
  }
  //move left
  if (dir.x == -1 && tileEmpty(monster.x,monster.y) && tileEmpty(monster.x,monster.y+monster.height)) {
    monster.x -= curSpd;
  }
}

function tileEmpty(x,y) {
  return !(currentLevel[Math.floor(x/tileSize)][Math.floor(y/tileSize)]);
}

function drawPlayer() {
  ctx.fillRect(monster.x,monster.y,monster.width,monster.height);
}
document.addEventListener("keydown", function (e) {
}, false);
