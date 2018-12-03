class PressurePlate {
  constructor() {
    this.state = {
      x: null,
      y: null,
      width: 32,
      height: 32,
      name: "plate",
      active: false,
      soundOn: plate_activate,
      soundOff: plate_deactivate,
      sprite: spr_pressure_plate,
      offCount: 0,
      canPlayOff: false,

    };
  }

  setCoordinates(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }

  activate() {
    if (this.state.offCount > 2) {
      this.state.canPlayOff = true;
      this.state.offCount = 0;
      plate_activate.play();
      setTimeout(function(){
        plate_activate.pause();
        plate_activate.currentTime = 0;
      }, 200);
    }
    this.state.offCount--;
    this.state.active = true;
  }

  deactivate() {
    if (this.state.canPlayOff && this.state.offCount > 10) {
      this.state.canPlayOff = false;
      plate_deactivate.play();
      setTimeout(function(){
        plate_deactivate.pause();
        plate_deactivate.currentTime = 0;
      }, 200);
    }
    this.state.offCount++;
    this.state.active = false;
  }

  nextSprite() {
    this.spriteCount = (this.spriteCount + 1) % 4;
  }

  isActive() {
    return this.state.active;
  }
}
