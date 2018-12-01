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
let currentLevel = exampleLevel;

function update() {
  // Loop through current level tiles and render objects to grid
  // Dynamically changes size of grids depending on number of grids in level to fill the canvas
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
          ctx.fillStyle = "#FF0000";
          ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  requestAnimationFrame(update);
}

window.addEventListener("load", function () {
  update();
});

document.addEventListener("keydown", function (e) {
}, false);

document.addEventListener("keyup", function (e) {
}, false);
