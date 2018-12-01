// Initialize generic objects (feel free to use any name here that's convient)
let floor = {
  // TODO: Add sprite here later (will render red rect if not specified)
  sprite: null
};

// Levels
// Example Level (3x3 grid for simplicity of example)
const exampleLevel = [
  [floor, floor, floor],
  [floor, null, floor],
  [null, floor, floor],
  [floor, floor]
];

// Generic tile properties
let tileSize = 16;


// Update current level when we make it to the next level (set initially to first level)
//let currentLevel = exampleLevel;
function drawLevel() {
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
          ctx.fillStyle = "#000000";
          ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  }
}

function setupMap() {
    currentLevel = new Array(16);
    for (i = 0; i < 64; i++) {
        currentLevel[i] = new Array(16);
    }
    update();
}


let clicked = 0;
let curPos;

canvas.addEventListener("mousemove", click, false);
function click(event) {
    let x = Math.floor((event.pageX - canvas.offsetLeft) / tileSize);
    let y = Math.floor((event.pageY - canvas.offsetTop) / tileSize);
    if (clicked == 1 && curPos != x + " " + y) {
      currentLevel[x][y] = (currentLevel[x][y] == 1 ? 0 : 1);
    }
    curPos = x + " " + y;
};

canvas.addEventListener("mousedown", down, false);
function down() {
    clicked = 1;
    let x = Math.floor((event.pageX - canvas.offsetLeft) / tileSize);
    let y = Math.floor((event.pageY - canvas.offsetTop) / tileSize);
    currentLevel[x][y] = (currentLevel[x][y] == 1 ? 0 : 1);
}

canvas.addEventListener("mouseup", up, false);
function up() {
    clicked = 0;
}
