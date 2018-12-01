let keyCodes = {};

document.body.addEventListener("keydown", function(e) {
  keyCodes[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keyCodes[e.keyCode] = false;
});
