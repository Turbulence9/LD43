let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
let aspectRatio = 16 / 10;
let windowedWidth = 1024;
let windowedHeight = 640;
canvas.width = windowedWidth;
canvas.height = windowedHeight;

function drawFog() {

}

function update() {
  canvas.width = canvas.width;
  drawLevel();
  playerController();
  requestAnimationFrame(update);
}

window.addEventListener("load", function () {
  setupMap();
});

document.addEventListener("keydown", function (e) {
}, false);

document.addEventListener("keyup", function (e) {
}, false);
