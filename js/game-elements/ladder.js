class Ladder {
  constructor() {
    this.state = {
      name: "ladder",
      x: null,
      y: null,
      width: 32,
      height: 32,
      sprite: spr_ladder
    };
  }

  setCoordinates(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }
}
