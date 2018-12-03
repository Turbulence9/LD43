class PressurePlate {
  constructor() {
    this.state = {
      x: null,
      y: null,
      width: 32,
      height: 32,
      name: "plate",
      active: false,
      sprite: spr_pressure_plate
    };
  }

  setCoordinates(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }

  activate() {
    this.state.active = true;
  }

  deactivate() {
    this.state.active = false;
  }

  nextSprite() {
    this.spriteCount = (this.spriteCount + 1) % 4;
  }

  isActive() {
    return this.state.active;
  }
}
