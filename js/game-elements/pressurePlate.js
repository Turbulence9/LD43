class PressurePlate {
  constructor() {
    this.state = {
      name: "plate",
      active: false
    };
  }

  setCoordinates(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }

  setDimensions(width, height) {
    this.state.width = width;
    this.state.height = height;
  }

  activate() {
    this.state.active = true;
  }

  deactivate() {
    this.state.active = false;
  }

  isActive() {
    return this.state.active;
  }
}
