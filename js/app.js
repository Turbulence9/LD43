let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
let aspectRatio = 16 / 10;
let windowedWidth = 1024;
let windowedHeight = 640;
canvas.width = windowedWidth;
canvas.height = windowedHeight;

// Generic tile properties
let tileSize = 16;

// Update current level when we make it to the next level (set initially to first level)
//let currentLevel = exampleLevel;

var clicked = 0;

canvas.addEventListener("mousemove", click, false);
function click(event) {
    var x = Math.floor((event.pageX - canvas.offsetLeft) / 16);
    var y = Math.floor((event.pageY - canvas.offsetTop) / 16);
    if (clicked == 1) {
        if (currentLevel[y][x] == 1) {
            currentLevel[y][x] = 0;
        } else {
            currentLevel[y][x] = 1;
        }
    }
};

canvas.addEventListener("mousedown", down, false);
function down() {
    clicked = 1;
}

canvas.addEventListener("mouseup", up, false);
function up() {
    clicked = 0;
}

function drawFog() {
    
}

function update() {
  // Loop through current level tiles and render objects to grid
  // Dynamically changes size of grids depending on number of grids in level to fill the canvas
  canvas.width = canvas.width;
  for (let i = 0; i < currentLevel.length; i++) {
    for (let j = 0; j < currentLevel[i].length; j++) {
      // Get the sprite for the object
      let tile = currentLevel[i][j];
      if (tile && tile != 0) {
        if (tile.sprite) {
          // TODO: Draw the sprite on the canvas (use object properties to draw the sprite with correct width/height)
          ctx.drawImage(tile.sprite);
        } else {
          // Draw a red sqaure if no sprite for debug puposes
          ctx.fillStyle = "#000000";
          ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  requestAnimationFrame(update);
}

function setupMap() {
    currentLevel = new Array(16);
    for (i = 0; i < 64; i++) {
        currentLevel[i] = new Array(16);
    }
    update();
}

window.addEventListener("load", function () {
  setupMap();
});

document.addEventListener("keydown", function (e) {
}, false);

document.addEventListener("keyup", function (e) {
}, false);
