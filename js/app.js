let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
let aspectRatio = 16 / 10;
let windowedWidth = 1024;
let windowedHeight = 640;
canvas.width = windowedWidth;
canvas.height = windowedHeight;

//set this to true to create levels more easily
let developer_mode = false;
let gameover = false;
let gamestart = false;
let win = false;
let count = 0;
let bloodCount = 0;
let health = {
  value: 2000,
  max: 2000
}
let maxVision = 80;
let visionItems = [monster];
let tileSize = 16;
let setup = true;
function update() {
  canvas.width = canvas.width;
  count++;
  if (count % 2 == 0) {
    bloodCount++;
  }
  if (developer_mode) {
    maxVision = 8000;
  }
  if (gameover == false && gamestart == true) {
      drawFog();
      drawLevel();
      playerController();
      drawHud();
      setup = false;
  } else if (gameover == true) {
      if (win == false) {
          ctx.drawImage(end, 0, 0, 1024, 640);
          if (keyCodes[82]) {
            gameover = false;
            gamestart = false;
          }
      } else {
          ctx.drawImage(magnetPic, 0, 0, 1024, 640);
      }

      if (keyCodes[32] == true) {
          gamestart = false;
          gameover = false;
          monster.limbs.forEach(limb => {
              limb.attached = true;
              limb.x = null;
              limb.y = null;
          })
          levelIndex = 0;
          setup = true;
          win = false;
          drawLevel();
      }
  } else {
        //start screen
      ctx.drawImage(start, 0, 0, 1024, 640);
      if (keyCodes[32] == true) {
          gamestart = true;
      }
  }
  requestAnimationFrame(update);
}


window.addEventListener("load", function () {
  update();
});

function boxCollision(x1, y1, width1, height1, x2, y2, width2, height2) {
  if (x1+width1 > x2 && x1 < x2+width2 && y1+height1 > y2 && y1 < y2+height2) {
    return true;
  }
  return false;
}
