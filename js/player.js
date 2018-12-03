let monster = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  defaultSpd: 4,
  speed: 4,
  headIndex: null,
  retractLimbs: false,
  limbs: [
    {
      code: 67,
      name: "leftArm",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterLeftArmDetatched
    },
    {
      code: 86,
      name: "rightArm",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterRightArmDetatched
    },
    {
      code: 66,
      name: "leftLeg",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterLeftLegDetatched
    },
    {
      code: 78,
      name: "rightLeg",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterRightLegDetatched
    },
    {
      code: 90,
      name: "leftEye",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterLeftEye
    },
    {
      code: 88,
      name: "rightEye",
      attached: true,
      x: null,
      y: null,
      width: 24,
      height: 24,
      sprite: monsterRightEye
    }
  ]
}

let dir = {
  x : 0,
  y : 0
};

function playerController() {
  checkLimbs();
  missingLimbs();
  hasLimbs();
  movePlayer();
  drawLimbs();
  drawPlayer();
  checkGameEvents(monster.x + monster.width/2 ,monster.y + monster.height/2);
  if (health.value <= 0) {
    gameover = true;
    win = false;
  }
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
  if (dir.x != 0 || dir.y != 0) {
    step_audio.play();
  }
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
  if (monster.retractLimbs) {
      let allback = true;
      monster.limbs.forEach(limb => {
          if (!limb.attached) {
              let deltaLimbX = monster.x - limb.x;
              let deltaLimbY = monster.y - limb.y;
              let limbHyp = Math.sqrt(Math.pow(deltaLimbX, 2) + Math.pow(deltaLimbY, 2));
              detlaLimbX = monster.speed * (deltaLimbX / limbHyp);
              detlaLimbY = monster.speed * (deltaLimbY / limbHyp);
              limb.x += detlaLimbX;
              limb.y += detlaLimbY;
              if (Math.abs(limb.x - monster.x) < 5 && Math.abs(limb.x - monster.x) < 5) {
                  limb.x = null;
                  limb.y = null;
                  limb.attached = true;
                  pop_audio.play();
                  setTimeout(function(){
                    pop_audio.pause();
                    pop_audio.currentTime = 0;
                  }, 100);
              } else {
                  allback = false;
              }
          }
      })
      if (allback == true) {
          monster.retractLimbs = false;
      }
  }
}

function tileEmpty(x,y) {
  let solid = true;
  let block = tileBlock(x,y);
  if (block == 1) {
    solid = false;
  }
  if (block.state) {
    if (block.state.name == "door") {
      if (!block.isOpen()) {
        solid = false;
      }
    }
  }
  return solid;
}

function checkGameEvents(x,y) {
  let activeUnits = [monster];
  monster.limbs.forEach((limb,i) => {
    if (!limb.attached && i < 4) {
      activeUnits.push(limb);
    }
  })
  plates.forEach(plate => {
    plate.deactivate();
    activeUnits.forEach(unit => {
      if (boxCollision(unit.x,unit.y,unit.width,unit.height,plate.state.x,plate.state.y,plate.state.width,plate.state.height)) {
        plate.activate();
      }
    })
  });
  if (boxCollision(x, y, monster.width, monster.height, ladder.state.x+30, ladder.state.y, ladder.state.width, ladder.state.height)) {
      levelIndex++;
      monster.limbs.forEach(limb => {
          limb.attached = true;
          limb.x = null;
          limb.y = null;
      })
      if (levelIndex == levels.length) {
          win = true;
          gameover = true;
      } else {
          setup = true;
          drawLevel();
      }
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
  if (inVision(monster.x,monster.y)) {
    if (monster.limbs[0].attached) {
      ctx.drawImage(monsterLeftArm,64*monster.headIndex,0,64,64,monster.x-16,monster.y-16,64,64)
    }
    if (monster.limbs[1].attached) {
      ctx.drawImage(monsterRightArm,64*monster.headIndex,0,64,64,monster.x-16,monster.y-16,64,64)
    }
    if (monster.limbs[2].attached) {
      ctx.drawImage(monsterLeftLeg,64*monster.headIndex,0,64,64,monster.x-16,monster.y-16,64,64)
    }
    if (monster.limbs[3].attached) {
      ctx.drawImage(monsterRightLeg,64*monster.headIndex,0,64,64,monster.x-16,monster.y-16,64,64)
    }
    ctx.drawImage(monsterHead,32*monster.headIndex,0,monster.width,monster.height,monster.x,monster.y,monster.width,monster.height);
    if (monster.retractLimbs) {
      ctx.drawImage(magnetPic,64*monster.headIndex,0,64,64,monster.x-16,monster.y-16,64,64)
    }
  }
}

function checkLimbs() {
  monster.speed = monster.defaultSpd;
  monster.limbs.forEach((limb,i) => {
    if (keyCodes[limb.code] && limb.attached) {
      if (i < 4) {
        limbOff_audio.play();
        setTimeout(function(){
          limbOff_audio.pause();
          limbOff_audio.currentTime = 0;
        }, 200);
      } else {
        eyeOff_audio.play();
        setTimeout(function(){
          limbOff_audio.pause();
          limbOff_audio.currentTime = 0;
        }, 200);
      }
      limb.attached = false;
      limb.x = monster.x + 6;
      limb.y = monster.y + 6;
    }
    if (limb.name == "leftLeg" && !limb.attached) {
      monster.speed-= 1
    }
    if (limb.name == "rightLeg" && !limb.attached) {
      monster.speed-= 1
    }
  })
  if (keyCodes[81]) {
      monster.retractLimbs = true;
  }
}

function drawLimbs() {
  monster.limbs.forEach(limb => {
    if (!limb.attached && inVision(limb.x, limb.y)) {
      ctx.drawImage(limb.sprite,limb.x,limb.y);
    }
  })
}

function missingLimbs() {
  monster.limbs.forEach(limb => {
    if (limb.name == "leftLeg" && !limb.attached) {
      health.value -= 10;
    } else if (limb.name == "leftArm" && !limb.attached) {
      health.value -= 10;
    } else if (limb.name == "rightArm" && !limb.attached) {
      health.value -= 10;
    } else if (limb.name == "rightLeg" && !limb.attached) {
      health.value -= 10;
    } else {

      console.log("***test**");
    }
  })
}


function missingLimbs() {
  monster.limbs.forEach(limb => {
    if (limb.name == "leftLeg" && !limb.attached) {
      health.value -= 1;
    } else if (limb.name == "leftArm" && !limb.attached) {
      health.value -= 1;
    } else if (limb.name == "rightArm" && !limb.attached) {
      health.value -= 1;
    } else if (limb.name == "rightLeg" && !limb.attached) {
      health.value -= 1;
    } else {
    }
  })
  if (health.value < 0) {
    health.value = 0;
  }
}

function hasLimbs() {
   let allAttached = true;
   monster.limbs.forEach(limb => {
     if (!limb.attached) {
       allAttached = false;
     }
  });
  if (allAttached) {
    health.value += 10;
  }
  if (health.value > health.max) {
    health.value = health.max;
  }
}
