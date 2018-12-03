let keyCodes = {};

document.body.addEventListener("keydown", function(e) {
  music.volume = musicVolume;
	 music.play();
  if(e.keyCode == 80) {
	  printLevel();
  }
  if(e.keyCode == 82) {
	  restartLevel();
  }
  keyCodes[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keyCodes[e.keyCode] = false;
});
