class PressurePlate {
  constructor() {
    this.state = {
      x: null,
      y: null,
      width: 16,
      height: 16,
      active: false
    };
  }

  create(xValue, yValue) {
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
