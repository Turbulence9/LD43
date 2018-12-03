let keyCodes = {};

document.body.addEventListener("keydown", function(e) {
  if(e.keyCode == 80) {
	  printLevel();
  }
  keyCodes[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keyCodes[e.keyCode] = false;
});
