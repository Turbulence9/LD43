let monster = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 3,
  headIndex: null,
  limbs: [
    {
      name: "leftArm",
      attached: true,
      x: null,
      y: null
    },
    {
      name: "rightArm",
      attached: true,
      x: null,
      y: null
    },
    {
      name: "leftLeg",
      attached: true,
      x: null,
      y: null
    },
    {
      name: "rightLeg",
      attached: true,
      x: null,
      y: null
    },
  ]
}

let dir = {
  x : 0,
  y : 0
};

function playerController() {
  movePlayer();
  drawPlayer();
  checkGameEvents(monster.x + monster.width/2 ,monster.y + monster.height/2);
}

function movePlayer() {
  dir = {
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
  if (dir.y == -1 && tileEmpty(monster.x,monster.y) && tileEmpty(monster.x+monster.width,monster.y) && tileEmpty(monster.x+monster.width/2,monster.y)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x,monster.y-i) && tileEmpty(monster.x+monster.width,monster.y-i) && tileEmpty(monster.x+monster.width/2,monster.y-i)) {
        monster.y-= 1;
      }
    }
  }
  //move right
  if (dir.x == 1 && tileEmpty(monster.x+monster.width,monster.y) && tileEmpty(monster.x+monster.width,monster.y+monster.height) && tileEmpty(monster.x+monster.width,monster.y+monster.height/2)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x+monster.width+i,monster.y) && tileEmpty(monster.x+monster.width+i,monster.y+monster.height) && tileEmpty(monster.x+monster.width+i,monster.y+monster.height/2)) {
        monster.x+= 1;
      }
    }
  }
  //move down
  if (dir.y == 1 && tileEmpty(monster.x,monster.y+monster.height) && tileEmpty(monster.x+monster.width,monster.y+monster.height)  && tileEmpty(monster.x+monster.width/2,monster.y+monster.height)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x,monster.y+monster.height+i) && tileEmpty(monster.x+monster.width,monster.y+monster.height+i) && tileEmpty(monster.x+monster.width/2,monster.y+monster.height+i)) {
        monster.y+= 1;
      }
    }
  }
  //move left
  if (dir.x == -1 && tileEmpty(monster.x,monster.y) && tileEmpty(monster.x,monster.y+monster.height) && tileEmpty(monster.x,monster.y+monster.height/2)) {
    for (let i = 1; i <= curSpd; i++) {
      if (tileEmpty(monster.x-i,monster.y) && tileEmpty(monster.x-i,monster.y+monster.height) && tileEmpty(monster.x-i,monster.y+monster.height/2)) {
        monster.x-= 1;
      }
    }
  }
}

function tileEmpty(x,y) {
  let solid = true;
  let block = tileBlock(x,y);
  if (block == 1) {
    solid = false;
  }
  if (block.name == "door") {
    if (!block.isOpen()) {
      solid = false;
    }
  }
  return solid;
}

function checkGameEvents(x,y) {
  p.deactivate();
  if (tileBlock(x-8,y).name == "plate") {
    p.activate();
  }
  if (tileBlock(x-8,y-8).name == "plate") {
    p.activate();
  }
  if (tileBlock(x+8,y).name == "plate") {
    p.activate();
  }
  if (tileBlock(x+8,y+8).name == "plate") {
    p.activate();
  }
}

function tileBlock(x,y) {
  return (currentLevel[Math.floor(x/tileSize)][Math.floor(y/tileSize)]);
}


function drawPlayer() {
  if (dir.x == 0 && dir.y == -1) {
    monster.headIndex = 0;
  }
  if (dir.x == 1 && dir.y == -1) {
    monster.headIndex = 1;
  }
  if (dir.x == 1 && dir.y == 0) {
    monster.headIndex = 2;
  }
  if (dir.x == 1 && dir.y == 1) {
    monster.headIndex = 3;
  }
  if (dir.x == 0 && dir.y == 1) {
    monster.headIndex = 4;
  }
  if (dir.x == -1 && dir.y == 1) {
    monster.headIndex = 5;
  }
  if (dir.x == -1 && dir.y == 0) {
    monster.headIndex = 6;
  }
  if (dir.x == -1 && dir.y == -1) {
    monster.headIndex = 7;
  }
  ctx.drawImage(monsterHead,32*monster.headIndex,0,monster.width,monster.height,monster.x,monster.y,monster.width,monster.height)
}
document.addEventListener("keydown", function (e) {
}, false);
